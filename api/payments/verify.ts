import type { VercelRequest, VercelResponse } from '@vercel/node'

const MP_BASE = 'https://api.mercadopago.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) {
    return res.status(500).json({ error: 'Missing MP_ACCESS_TOKEN' })
  }

  try {
    const external_reference = (req.query?.external_reference as string | undefined) || undefined
    const payment_id = (req.query?.payment_id as string | undefined) || undefined

    if (!external_reference && !payment_id) {
      return res.status(400).json({ error: 'Faltan parámetros' })
    }

    let paymentData: any = null

    if (payment_id) {
      const resp = await fetch(`${MP_BASE}/v1/payments/${encodeURIComponent(payment_id)}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      paymentData = await resp.json().catch(() => ({}))
      if (!resp.ok) {
        return res.status(500).json({ error: 'No se pudo consultar el pago' })
      }
    } else if (external_reference) {
      const resp = await fetch(`${MP_BASE}/v1/payments/search?external_reference=${encodeURIComponent(external_reference)}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const data = await resp.json().catch(() => ({}))
      if (!resp.ok) {
        return res.status(500).json({ error: 'No se pudo buscar el pago' })
      }
      paymentData = Array.isArray(data?.results) ? data.results[0] : null
    }

    if (!paymentData) {
      return res.status(200).json({ status: 'unknown' })
    }

    const result = {
      status: paymentData.status,
      status_detail: paymentData.status_detail,
      amount: paymentData.transaction_amount,
      currency: paymentData.currency_id || 'ARS',
      preference_id: paymentData?.order?.id,
      payer_email: paymentData?.payer?.email,
    }

    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).json({ error: 'Error inesperado' })
  }
}