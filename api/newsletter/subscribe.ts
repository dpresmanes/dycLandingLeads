import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const N8N_WEBHOOK_NEWSLETTER = process.env.N8N_WEBHOOK_NEWSLETTER;

const payloadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100).optional(),
  source: z.string().max(200).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!N8N_WEBHOOK_NEWSLETTER) {
    return res.status(200).json({ ok: true, message: 'Webhook no configurado aún (modo fallback).'});
  }

  try {
    const parse = payloadSchema.safeParse(req.body || {});
    if (!parse.success) return res.status(400).json({ error: 'Datos inválidos' });

    const resp = await fetch(N8N_WEBHOOK_NEWSLETTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'newsletter_subscribe',
        payload: parse.data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'Error reenviando al webhook', detail: text.slice(0, 500) });
    }

    return res.status(200).json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('newsletter subscribe error', message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}