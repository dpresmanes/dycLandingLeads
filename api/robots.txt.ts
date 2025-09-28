import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');

  const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
  const host = req.headers.host || process.env.VERCEL_URL || 'handtobrand.vercel.app';
  const envSiteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
  const siteUrl = envSiteUrl || `${proto}://${host}`;

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n\n# Disallow admin or private areas (if any)\n# Disallow: /admin/\n# Disallow: /private/\n\n# Allow all search engines to crawl\n# Crawl-delay: 1\n`;

  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(robots);
}