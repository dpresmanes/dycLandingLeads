import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  const baseUrl = process.env.APP_BASE_URL || process.env.SITE_URL || process.env.VITE_SITE_URL
  const hasAccessToken = Boolean(process.env.MP_ACCESS_TOKEN)
  const mpEnv = process.env.MP_ENV || 'sandbox'
  return res.status(200).json({ ok: true, baseUrl, hasAccessToken, mpEnv })
}