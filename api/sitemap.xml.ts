import type { VercelRequest, VercelResponse } from '@vercel/node';

// Minimal Notion types reused from existing API
type NotionRichText = { plain_text?: string };
type NotionTitleProperty = { title?: NotionRichText[] };
type NotionRichTextProperty = { rich_text?: NotionRichText[] };
type NotionDateProperty = { date?: { start?: string | null } | null };
type NotionMultiSelectProperty = { multi_select?: { name: string }[] };

type NotionProperty =
  | NotionTitleProperty
  | NotionRichTextProperty
  | NotionDateProperty
  | NotionMultiSelectProperty
  | Record<string, unknown>;

type NotionPage = {
  properties?: Record<string, NotionProperty>;
};

type PostSummary = {
  slug: string;
  title: string;
  date: string | null;
};

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_BLOG_ID = process.env.NOTION_DB_BLOG_ID;

// Optional property names (customizable via env)
const PROP_TITLE = process.env.NOTION_PROP_TITLE || 'Name';
const PROP_SLUG = process.env.NOTION_PROP_SLUG || 'Slug';
const PROP_DATE = process.env.NOTION_PROP_DATE || 'Date';

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

  return { slug, title, date };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=1800');

  const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
  const host = req.headers.host || process.env.VERCEL_URL || 'handtobrand.vercel.app';
  const envSiteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
  const siteUrl = envSiteUrl || `${proto}://${host}`;

  // Base URLs to include always
  const baseUrls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString().slice(0, 10), changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/blog`, lastmod: new Date().toISOString().slice(0, 10), changefreq: 'daily', priority: '0.8' },
  ];

  let postUrls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  if (!NOTION_TOKEN || !NOTION_DB_BLOG_ID) {
    // Fallback sample posts if Notion isn't configured yet
    const samplePosts: PostSummary[] = [
      { slug: 'primer-post', title: 'Cómo conseguimos más leads con un landing bien optimizada', date: '2024-09-15' },
      { slug: 'segundo-post', title: 'Checklist de SEO técnico para landing pages', date: '2024-09-20' },
    ];
    postUrls = samplePosts.map((p) => ({
      loc: `${siteUrl}/blog/${p.slug}`,
      lastmod: (p.date || new Date().toISOString()).slice(0, 10),
      changefreq: 'monthly',
      priority: '0.7',
    }));
  } else {
    try {
      const notionApiVersion = process.env.NOTION_VERSION || '2022-06-28';
      const resp = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_BLOG_ID}/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': notionApiVersion,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_size: 100 }),
      });

      if (resp.ok) {
        const data = (await resp.json()) as { results?: NotionPage[] };
        const pages: NotionPage[] = data.results ?? [];
        const posts = pages
          .map(mapPageToPostSummary)
          .filter((p) => p.slug && p.title);
        postUrls = posts.map((p) => ({
          loc: `${siteUrl}/blog/${p.slug}`,
          lastmod: (p.date || new Date().toISOString()).slice(0, 10),
          changefreq: 'monthly',
          priority: '0.7',
        }));
      }
    } catch (err) {
      // In case of error, keep only base URLs
      console.error('Sitemap generation error:', err);
    }
  }

  const urls = [...baseUrls, ...postUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  return res.status(200).send(xml);
}