import type { VercelRequest, VercelResponse } from '@vercel/node'
import { randomUUID } from 'crypto'

const MP_BASE = 'https://api.mercadopago.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { amount, currency = 'ARS', email, description = 'Compra en HandToBrand' } = (req.body || {}) as {
      amount?: number
      currency?: string
      email?: string
      description?: string
    }

    const numericAmount = Number(amount)
    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({ error: 'Monto inválido' })
    }

    const accessToken = process.env.MP_ACCESS_TOKEN
    const baseUrl = process.env.APP_BASE_URL || process.env.SITE_URL || process.env.VITE_SITE_URL
    if (!accessToken || !baseUrl) {
      return res.status(500).json({ error: 'Credenciales no configuradas' })
    }

    const external_reference = randomUUID()

    const payload = {
      items: [
        {
          title: description,
          unit_price: numericAmount,
          quantity: 1,
          currency_id: String(currency).toUpperCase(),
        },
      ],
      payer: email ? { email } : undefined,
      back_urls: {
        success: `${baseUrl}/pay/success`,
        failure: `${baseUrl}/pay/failure`,
        pending: `${baseUrl}/pay/pending`,
      },
      auto_return: 'approved',
      external_reference,
      notification_url: `${baseUrl}/api/payments/webhook`,
    }

    // Dev-only diagnostics (no secrets)
    if (process.env.NODE_ENV !== 'production') {
      console.log('[createPreference] env', { hasAccessToken: !!accessToken, baseUrl })
    }

    const resp = await fetch(`${MP_BASE}/checkout/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    })
    const data = await resp.json().catch(() => ({}))

    if (!resp.ok) {
      return res.status(500).json({ error: data?.message || 'Error al crear preferencia' })
    }

    const { id: preference_id, init_point } = data

    // Persistencia inicial de la orden en Google Sheets (opcional)
    try {
      const scriptUrl = process.env.GOOGLE_ORDERS_SCRIPT_URL || process.env.VITE_GOOGLE_ORDERS_SCRIPT_URL
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'order_init',
            external_reference,
            preference_id,
            amount: numericAmount,
            currency: String(currency).toUpperCase(),
            email,
            status: 'init',
            created_at: new Date().toISOString(),
          }),
        })
      }
    } catch (e) {
      // No bloquear el flujo por persistencia
      console.warn('Orders script error', e)
    }

    return res.status(200).json({ init_point, preference_id, external_reference })
  } catch (e) {
    const isProd = process.env.NODE_ENV === 'production'
    const detail = e instanceof Error ? e.message : String(e)
    if (!isProd) {
      console.error('[createPreference] unexpected error:', e)
      return res.status(500).json({ error: 'Error inesperado', detail })
    }
    return res.status(500).json({ error: 'Error inesperado' })
  }
}