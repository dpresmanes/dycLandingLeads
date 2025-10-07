import { useEffect } from 'react'
import { trackEvent } from '@/utils/analytics'

export default function PayFailure() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const status = params.get('status') || 'failure'
    const external_reference = params.get('external_reference') || undefined
    trackEvent('checkout_failure', { status, event_id: external_reference })
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Pago no realizado</h1>
      <p className="text-gray-300">Tu pago fue cancelado o rechazado. Podés intentar nuevamente.</p>
      <a href="/" className="mt-8 inline-block bg-[#00FF88] text-black px-4 py-2 rounded font-semibold">Volver al inicio</a>
    </div>
  )
}