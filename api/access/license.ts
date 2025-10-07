import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

function constantTimeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function verifyLicense(key: string, secret: string) {
  // Simple scheme: LICENSE-<hex(HMAC_SHA256(email|purchaseId))>-<YYYY>
  const parts = key.split('-');
  if (parts.length < 3) return false;
  const sig = parts[1];
  return /^[a-f0-9]{64}$/i.test(sig); // shape check
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { license } = (req.body || {}) as { license?: string };
  if (!license) return res.status(400).json({ error: 'Falta clave de licencia' });
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || 'demo-secret-change';

  // In demo mode accept a known value
  const demo = process.env.DEMO_LICENSE_KEY || 'LICENSE-DEMO-2025';
  let valid = false;
  if (license === demo) valid = true;
  // Or accept signatures of correct length/shape; real impl would check DB of purchases
  if (!valid) valid = verifyLicense(license, secret);

  if (!valid) return res.status(401).json({ error: 'Licencia inválida' });

  // Return unlocked and let frontend persist localStorage
  return res.status(200).json({ unlocked: true });
}