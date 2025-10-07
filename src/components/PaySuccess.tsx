import { useEffect, useState } from 'react'
import { trackEvent } from '@/utils/analytics'

interface VerifyResponse {
  status: string
  status_detail?: string
  amount?: number
  currency?: string
  preference_id?: string
  payer_email?: string
}

export default function PaySuccess() {
  const [status, setStatus] = useState<string>('unknown')
  const [detail, setDetail] = useState<string>('')
  const [amount, setAmount] = useState<number | undefined>(undefined)
  const [currency, setCurrency] = useState<string>('ARS')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const external_reference = params.get('external_reference') || undefined
    const payment_id = params.get('payment_id') || undefined

    const verify = async () => {
      try {
        const qs = external_reference ? `external_reference=${encodeURIComponent(external_reference)}` : payment_id ? `payment_id=${encodeURIComponent(payment_id)}` : ''
        const r = await fetch(`/api/payments/verify?${qs}`)
        const data: VerifyResponse = await r.json()
        setStatus(data.status || 'unknown')
        setDetail(data.status_detail || '')
        setAmount(data.amount)
        setCurrency(data.currency || 'ARS')

        if ((data.status || '').toLowerCase() === 'approved') {
          trackEvent('purchase', {
            value: data.amount,
            currency: data.currency || 'ARS',
            event_id: external_reference || payment_id,
            preference_id: data.preference_id,
          })
        } else {
          trackEvent('checkout_return', {
            status: data.status,
            status_detail: data.status_detail,
            event_id: external_reference || payment_id,
          })
        }
      } catch {
        setDetail('No se pudo verificar el estado del pago')
      }
    }
    verify()
  }, [])

  const isApproved = status.toLowerCase() === 'approved'

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">{isApproved ? '¡Pago aprobado!' : 'Verificando pago…'}</h1>
      {isApproved ? (
        <p className="text-gray-300">Gracias por tu compra. Hemos confirmado tu pago.</p>
      ) : (
        <p className="text-gray-400">Estado: {status} {detail ? `— ${detail}` : ''}</p>
      )}
      {typeof amount === 'number' && (
        <p className="mt-4">Monto: {amount} {currency}</p>
      )}
      <a href="/" className="mt-8 inline-block bg-[#00FF88] text-black px-4 py-2 rounded font-semibold">Volver al inicio</a>
    </div>
  )
}