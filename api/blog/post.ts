import type { VercelRequest, VercelResponse } from '@vercel/node';
import sanitizeHtml from 'sanitize-html';

// Tipos mínimos para Notion usados en este archivo
type NotionRichText = { plain_text?: string };
type NotionTitleProperty = { title?: NotionRichText[] };
type NotionRichTextProperty = { rich_text?: NotionRichText[] };
type NotionDateProperty = { date?: { start?: string | null } | null };
type NotionMultiSelectProperty = { multi_select?: { name: string }[] };
type NotionNumberProperty = { number?: number | null };

type NotionProperty =
  | NotionTitleProperty
  | NotionRichTextProperty
  | NotionDateProperty
  | NotionMultiSelectProperty
  | NotionNumberProperty
  | Record<string, unknown>;

type NotionPage = {
  id?: string;
  properties?: Record<string, NotionProperty>;
};

type NotionBlock = {
  type: string;
  paragraph?: { rich_text?: NotionRichText[] };
  heading_1?: { rich_text?: NotionRichText[] };
  heading_2?: { rich_text?: NotionRichText[] };
  heading_3?: { rich_text?: NotionRichText[] };
  bulleted_list_item?: { rich_text?: NotionRichText[] };
  numbered_list_item?: { rich_text?: NotionRichText[] };
  quote?: { rich_text?: NotionRichText[] };
  code?: { rich_text?: NotionRichText[] };
  image?: {
    type?: 'file' | 'external';
    file?: { url?: string };
    external?: { url?: string };
    caption?: NotionRichText[];
  };
};

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_BLOG_ID = process.env.NOTION_DB_BLOG_ID;

const PROP_TITLE = process.env.NOTION_PROP_TITLE || 'Name';
const PROP_SLUG = process.env.NOTION_PROP_SLUG || 'Slug';
const PROP_DATE = process.env.NOTION_PROP_DATE || 'Date';
const PROP_EXCERPT = process.env.NOTION_PROP_EXCERPT || 'Excerpt';
const PROP_TAGS = process.env.NOTION_PROP_TAGS || 'Tags';
const PROP_READING_TIME = process.env.NOTION_PROP_READING_TIME || 'ReadingTime';

function extractRichTextText(richText: NotionRichText[] | undefined): string {
  return (richText ?? []).map((r) => r?.plain_text ?? '').join('');
}

// Escapa caracteres especiales para preservar contenido literal y prevenir inyección
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getProperty(page: NotionPage, name: string): NotionProperty | undefined {
  return page.properties?.[name];
}

function mapPageToPostSummary(page: NotionPage) {
  const titleProp = getProperty(page, PROP_TITLE) as NotionTitleProperty | undefined;
  const title = extractRichTextText(titleProp?.title);

  const slugProp = getProperty(page, PROP_SLUG) as NotionRichTextProperty | undefined;
  const slug = extractRichTextText(slugProp?.rich_text);

  const dateProp = getProperty(page, PROP_DATE) as NotionDateProperty | undefined;
  const date = dateProp?.date?.start || null;

  const excerptProp = getProperty(page, PROP_EXCERPT) as NotionRichTextProperty | undefined;
  const excerpt = extractRichTextText(excerptProp?.rich_text);

  const tagsProp = getProperty(page, PROP_TAGS) as NotionMultiSelectProperty | undefined;
  const tags = (tagsProp?.multi_select ?? []).map((t) => t.name);

  const readingTimeProp = getProperty(page, PROP_READING_TIME) as NotionNumberProperty | undefined;
  const readingTime = readingTimeProp?.number ?? null;

  return { slug, title, date, excerpt, tags, readingTime };
}

function richTextToPlain(rich: NotionRichText[] | undefined): string {
  return (rich ?? []).map((r) => r?.plain_text ?? '').join('');
}

function blocksToSimpleHtml(blocks: NotionBlock[] | undefined): string {
  const out: string[] = [];
  let currentList: 'ul' | 'ol' | null = null;

  const closeListIfOpen = () => {
    if (currentList) {
      out.push(currentList === 'ul' ? '</ul>' : '</ol>');
      currentList = null;
    }
  };

  for (const b of blocks ?? []) {
    switch (b.type) {
      case 'bulleted_list_item': {
        const text = escapeHtml(richTextToPlain(b.bulleted_list_item?.rich_text));
        if (currentList !== 'ul') {
          closeListIfOpen();
          out.push('<ul>');
          currentList = 'ul';
        }
        out.push(`<li>${text}</li>`);
        break;
      }
      case 'numbered_list_item': {
        const text = escapeHtml(richTextToPlain(b.numbered_list_item?.rich_text));
        if (currentList !== 'ol') {
          closeListIfOpen();
          out.push('<ol>');
          currentList = 'ol';
        }
        out.push(`<li>${text}</li>`);
        break;
      }
      case 'paragraph': {
        closeListIfOpen();
        out.push(`<p>${escapeHtml(richTextToPlain(b.paragraph?.rich_text))}</p>`);
        break;
      }
      case 'heading_1': {
        closeListIfOpen();
        out.push(`<h2>${escapeHtml(richTextToPlain(b.heading_1?.rich_text))}</h2>`);
        break;
      }
      case 'heading_2': {
        closeListIfOpen();
        out.push(`<h3>${escapeHtml(richTextToPlain(b.heading_2?.rich_text))}</h3>`);
        break;
      }
      case 'heading_3': {
        closeListIfOpen();
        out.push(`<h4>${escapeHtml(richTextToPlain(b.heading_3?.rich_text))}</h4>`);
        break;
      }
      case 'quote': {
        closeListIfOpen();
        out.push(`<blockquote>${escapeHtml(richTextToPlain(b.quote?.rich_text))}</blockquote>`);
        break;
      }
      case 'code': {
        closeListIfOpen();
        out.push(`<pre><code>${escapeHtml(richTextToPlain(b.code?.rich_text))}</code></pre>`);
        break;
      }
      case 'image': {
        closeListIfOpen();
        const src = b.image?.type === 'external' ? b.image?.external?.url : b.image?.file?.url;
        const alt = richTextToPlain(b.image?.caption);
        const srcSafe = escapeHtml(src || '');
        const altSafe = escapeHtml(alt || '');
        if (srcSafe) {
          out.push(`<figure class="my-6"><img src="${srcSafe}" alt="${altSafe}" class="rounded-lg mx-auto" />${altSafe ? `<figcaption class="text-sm text-gray-400 mt-2 text-center">${altSafe}</figcaption>` : ''}</figure>`);
        }
        break;
      }
      default: {
        closeListIfOpen();
        break;
      }
    }
  }

  closeListIfOpen();

  return out.join('\n');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');

  const { slug } = req.query as { slug?: string };
  if (!slug || Array.isArray(slug)) return res.status(400).json({ error: 'Missing slug' });

  // Fallback sample post
  const sample = slug === 'primer-post' ? {
    slug: 'primer-post',
    title: 'Cómo conseguimos más leads con un landing bien optimizada',
    date: '2024-09-15',
    excerpt: 'Aprendé las claves que usamos para optimizar conversiones y reducir CAC.',
    tags: ['CRO', 'Landing Pages'],
    readingTime: 5,
    html: '<p>Contenido de ejemplo del primer post.</p>'
  } : slug === 'segundo-post' ? {
    slug: 'segundo-post',
    title: 'Checklist de SEO técnico para landing pages',
    date: '2024-09-20',
    excerpt: 'Los 10 puntos que no se te pueden pasar si querés rankear.',
    tags: ['SEO'],
    readingTime: 6,
    html: '<p>Contenido de ejemplo del segundo post.</p>'
  } : null;

  if (!NOTION_TOKEN || !NOTION_DB_BLOG_ID) {
    if (!sample) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ source: 'fallback', post: sample });
  }

  try {
    const notionApiVersion = process.env.NOTION_VERSION || '2022-06-28';

    // Buscar página por slug
    const queryResp = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_BLOG_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': notionApiVersion,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: PROP_SLUG,
          rich_text: { equals: slug }
        },
        page_size: 1,
      }),
    });

    if (!queryResp.ok) {
      const txt = await queryResp.text();
      console.error('Notion post query error', queryResp.status, txt);
      if (!sample) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ source: 'fallback', post: sample });
    }

    const queryData = (await queryResp.json()) as { results?: NotionPage[] };
    const page = queryData.results?.[0];
    if (!page) {
      if (!sample) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ source: 'fallback', post: sample });
    }

    const summary = mapPageToPostSummary(page);

    // Obtener hijos (bloques) de la página y transformarlos a HTML simple
    const blocksResp = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children?page_size=100`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': notionApiVersion,
      },
    });

    let html = '';
    if (blocksResp.ok) {
      const blocksData = (await blocksResp.json()) as { results?: NotionBlock[] };
      html = blocksToSimpleHtml(blocksData.results);
    }

    const safeHtml = sanitizeHtml(html, {
      allowedTags: ['h2','h3','h4','h5','h6','p','blockquote','ul','ol','li','strong','em','code','pre','a','img','figure','figcaption','table','thead','tbody','tr','th','td','hr','br','span'],
      allowedAttributes: {
        a: ['href', 'name', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height', 'class'],
        figure: ['class'],
        figcaption: ['class'],
        code: ['class'],
        span: ['class'],
        '*': ['class']
      },
      allowedSchemes: ['http', 'https', 'mailto'],
    });

    return res.status(200).json({ source: 'notion', post: { ...summary, html: safeHtml } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Notion post error', message);
    if (!sample) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ source: 'fallback', post: sample });
  }
}
