import type { VercelRequest, VercelResponse } from '@vercel/node';

// Tipos mínimos para las estructuras que usamos de Notion
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
  properties?: Record<string, NotionProperty>;
};

interface PostSummary {
  slug: string;
  title: string;
  date: string | null;
  excerpt: string;
  tags: string[];
  readingTime: number | null;
}

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_BLOG_ID = process.env.NOTION_DB_BLOG_ID;

// Optional property names (customizable via env)
const PROP_TITLE = process.env.NOTION_PROP_TITLE || 'Name';
const PROP_SLUG = process.env.NOTION_PROP_SLUG || 'Slug';
const PROP_DATE = process.env.NOTION_PROP_DATE || 'Date';
const PROP_EXCERPT = process.env.NOTION_PROP_EXCERPT || 'Excerpt';
const PROP_TAGS = process.env.NOTION_PROP_TAGS || 'Tags';
const PROP_READING_TIME = process.env.NOTION_PROP_READING_TIME || 'ReadingTime';
// Eliminado: const PROP_PUBLISHED = process.env.NOTION_PROP_PUBLISHED || 'Published';

function extractRichTextText(richText: NotionRichText[] | undefined): string {
  return (richText ?? []).map((r) => r?.plain_text ?? '').join('');
}

function getProperty(page: NotionPage, name: string): NotionProperty | undefined {
  return page.properties?.[name];
}

function mapPageToPostSummary(page: NotionPage): PostSummary {
  const titleProp = getProperty(page, PROP_TITLE) as NotionTitleProperty | undefined;
  const title = extractRichTextText(titleProp?.title);

  const slugProp = getProperty(page, PROP_SLUG) as NotionRichTextProperty | undefined;
  const slug = extractRichTextText(slugProp?.rich_text);

  const dateProp = getProperty(page, PROP_DATE) as NotionDateProperty | undefined;
  const date = dateProp?.date?.start ?? null;

  const excerptProp = getProperty(page, PROP_EXCERPT) as NotionRichTextProperty | undefined;
  const excerpt = extractRichTextText(excerptProp?.rich_text);

  const tagsProp = getProperty(page, PROP_TAGS) as NotionMultiSelectProperty | undefined;
  const tags = (tagsProp?.multi_select ?? []).map((t) => t.name);

  const readingTimeProp = getProperty(page, PROP_READING_TIME) as NotionNumberProperty | undefined;
  const readingTime = readingTimeProp?.number ?? null;

  return { slug, title, date, excerpt, tags, readingTime };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');

  if (!NOTION_TOKEN || !NOTION_DB_BLOG_ID) {
    // Fallback: sample data if Notion is not configured yet
    return res.status(200).json({
      source: 'fallback',
      posts: [
        {
          slug: 'primer-post',
          title: 'Cómo conseguimos más leads con un landing bien optimizada',
          date: '2024-09-15',
          excerpt: 'Aprendé las claves que usamos para optimizar conversiones y reducir CAC.',
          tags: ['CRO', 'Landing Pages'],
          readingTime: 5,
        },
        {
          slug: 'segundo-post',
          title: 'Checklist de SEO técnico para landing pages',
          date: '2024-09-20',
          excerpt: 'Los 10 puntos que no se te pueden pasar si querés rankear.',
          tags: ['SEO'],
          readingTime: 6,
        },
      ],
    });
  }

  try {
    // Usar la API HTTP de Notion directamente para evitar incompatibilidades de SDK
    const notionApiVersion = process.env.NOTION_VERSION || '2022-06-28';

    const resp = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DB_BLOG_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': notionApiVersion,
          'Content-Type': 'application/json',
        },
        // Evitamos filtros/ordenamientos que podrían fallar si la propiedad no existe
        body: JSON.stringify({ page_size: 50 }),
      }
    );

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Notion list error (HTTP)', resp.status, errorText);
      return res.status(200).json({
        source: 'fallback',
        posts: [
          {
            slug: 'primer-post',
            title: 'Cómo conseguimos más leads con un landing bien optimizada',
            date: '2024-09-15',
            excerpt:
              'Aprendé las claves que usamos para optimizar conversiones y reducir CAC.',
            tags: ['CRO', 'Landing Pages'],
            readingTime: 5,
          },
          {
            slug: 'segundo-post',
            title: 'Checklist de SEO técnico para landing pages',
            date: '2024-09-20',
            excerpt:
              'Los 10 puntos que no se te pueden pasar si querés rankear.',
            tags: ['SEO'],
            readingTime: 6,
          },
        ],
      });
    }

    const data = (await resp.json()) as { results?: NotionPage[] };
    const pages: NotionPage[] = data.results ?? [];

    const posts: PostSummary[] = pages
      .map(mapPageToPostSummary)
      .filter((p) => p.slug && p.title)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    return res.status(200).json({ source: 'notion', posts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Notion list error', message);
    return res.status(200).json({
      source: 'fallback',
      posts: [
        {
          slug: 'primer-post',
          title: 'Cómo conseguimos más leads con un landing bien optimizada',
          date: '2024-09-15',
          excerpt: 'Aprendé las claves que usamos para optimizar conversiones y reducir CAC.',
          tags: ['CRO', 'Landing Pages'],
          readingTime: 5,
        },
        {
          slug: 'segundo-post',
          title: 'Checklist de SEO técnico para landing pages',
          date: '2024-09-20',
          excerpt: 'Los 10 puntos que no se te pueden pasar si querés rankear.',
          tags: ['SEO'],
          readingTime: 6,
        },
      ],
    });
  }
}