import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Minimal HS256 verification without external deps
function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function verifyHS256(token: string, secret: string): { valid: boolean; payload?: any; reason?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, reason: 'Formato inválido' };
    const [headerB64, payloadB64, signature] = parts;
    const data = `${headerB64}.${payloadB64}`;
    const expected = base64url(crypto.createHmac('sha256', secret).update(data).digest());
    if (expected !== signature) return { valid: false, reason: 'Firma inválida' };
    const header = JSON.parse(Buffer.from(headerB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    if (header.alg !== 'HS256') return { valid: false, reason: 'Algoritmo no soportado' };
    const payload = JSON.parse(Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === 'number' && now > payload.exp) return { valid: false, reason: 'Token expirado' };
    return { valid: true, payload };
  } catch (e) {
    return { valid: false, reason: 'Error de parseo' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only GET to validate token from magic link
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const token = (req.query?.token as string | undefined) || (typeof req.body === 'object' ? (req.body as any)?.token : undefined);
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || 'demo-secret-change';
  const site = process.env.VITE_SITE_URL || process.env.SITE_URL || undefined;

  if (!token) return res.status(400).json({ error: 'Falta token' });

  const v = verifyHS256(token, secret);
  if (!v.valid) {
    return res.status(401).json({ error: 'Token inválido', reason: v.reason });
  }

  // Issue a secure cookie for unlocked access (7 days)
  const cookieValue = 'true';
  const maxAge = 7 * 24 * 60 * 60; // 7 days
  const domain = site ? new URL(site).hostname : undefined;
  const cookieParts = [`purchaseUnlocked=${cookieValue}`, `Max-Age=${maxAge}`, 'Path=/', 'SameSite=Lax'];
  if (domain) cookieParts.push(`Domain=${domain}`);
  // Secure/HttpOnly only in production
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) cookieParts.push('Secure');
  // We avoid HttpOnly because frontend reads localStorage; cookie is auxiliary
  res.setHeader('Set-Cookie', cookieParts.join('; '));

  return res.status(200).json({ unlocked: true });
}