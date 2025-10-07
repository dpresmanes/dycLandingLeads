import { useEffect } from 'react'
import { trackEvent } from '@/utils/analytics'

export default function PayPending() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const external_reference = params.get('external_reference') || undefined
    trackEvent('checkout_pending', { event_id: external_reference })
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Pago pendiente</h1>
      <p className="text-gray-300">Tu pago está en revisión o pendiente. Te avisaremos por email cuando se confirme.</p>
      <a href="/" className="mt-8 inline-block bg-[#00FF88] text-black px-4 py-2 rounded font-semibold">Volver al inicio</a>
    </div>
  )
}