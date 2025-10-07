import { useState } from 'react'
import { trackEvent } from '@/utils/analytics'

interface PaymentButtonProps {
  amount: number
  currency?: string
  email?: string
  description?: string
  className?: string
  label?: string
}

export default function PaymentButton({ amount, currency = 'ARS', email, description = 'Compra en HandToBrand', className = '', label = 'Pagar ahora' }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch('/api/payments/createPreference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, email, description }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        setError(data?.error || 'No se pudo iniciar el pago')
        trackEvent('checkout_start_failure', { amount, currency, error: data?.error })
        return
      }

      const { init_point, preference_id, external_reference } = data || {}
      if (!init_point) {
        setError('Respuesta inválida del servidor')
        trackEvent('checkout_start_failure', { amount, currency, error: 'missing init_point' })
        return
      }

      trackEvent('checkout_start', { amount, currency, preference_id, external_reference })
      // Redirigir a Checkout Pro
      window.location.href = init_point
    } catch (err) {
      setError('Error de red al iniciar el pago')
      trackEvent('checkout_start_failure', { amount, currency, error: 'network' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={startCheckout}
      disabled={loading}
      className={`inline-flex items-center justify-center rounded bg-[#00FF88] text-black px-4 py-2 font-semibold hover:bg-[#00e67a] disabled:opacity-60 ${className}`}
    >
      {loading ? 'Procesando…' : label}
      {error && (
        <span className="ml-2 text-red-400 text-sm">{error}</span>
      )}
    </button>
  )
}