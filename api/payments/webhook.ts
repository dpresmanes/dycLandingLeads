import type { VercelRequest, VercelResponse } from '@vercel/node'

const MP_BASE = 'https://api.mercadopago.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) {
    return res.status(500).json({ error: 'Missing MP_ACCESS_TOKEN' })
  }

  // Accept both GET (health) and POST (webhook)
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: 'Webhook ready' })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const payload = (req.body || {}) as any

    // Try to extract payment id from different payload formats
    const type = payload?.type || payload?.topic || 'payment'
    const paymentId = payload?.data?.id || payload?.id || payload?.data_id || (req.query?.id as string | undefined)

    if (!paymentId || String(type).toLowerCase() !== 'payment') {
      return res.status(200).json({ ok: true, ignored: true })
    }

    // Verify payment status
    const resp = await fetch(`${MP_BASE}/v1/payments/${encodeURIComponent(String(paymentId))}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const data = await resp.json().catch(() => ({}))

    if (!resp.ok) {
      return res.status(200).json({ ok: false })
    }

    const status = String(data?.status || '').toLowerCase()
    const status_detail = data?.status_detail
    const external_reference = data?.external_reference
    const amount = data?.transaction_amount
    const currency = data?.currency_id || 'ARS'
    const preference_id = data?.order?.id || data?.additional_info?.items?.[0]?.id
    const email = data?.payer?.email

    // Persist in Google Sheets if configured
    try {
      const scriptUrl = process.env.GOOGLE_ORDERS_SCRIPT_URL || process.env.VITE_GOOGLE_ORDERS_SCRIPT_URL
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'order_update',
            external_reference,
            payment_id: String(paymentId),
            preference_id,
            status,
            status_detail,
            amount,
            currency,
            email,
            updated_at: new Date().toISOString(),
          }),
        })
      }
    } catch (e) {
      console.warn('Orders script error', e)
    }

    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(200).json({ ok: false })
  }
}