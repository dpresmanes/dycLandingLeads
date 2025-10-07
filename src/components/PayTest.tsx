import PaymentButton from './PaymentButton'

export default function PayTest() {
  return (
    <section className="py-16 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Prueba de pago</h1>
      <p className="text-gray-300 mb-6">
        Usa este botón para iniciar el Checkout Pro y validar los flujos de éxito, fallo y pendiente.
      </p>
      <div className="flex items-center gap-4">
        <PaymentButton amount={17} description="Pack Automatizaciones $17" label="Pagar $17" />
        <span className="text-sm text-gray-400">(Sandbox)</span>
      </div>
      <p className="mt-6 text-sm text-gray-400">
        Nota: si estás en desarrollo con Vite, los endpoints en <code>/api</code> se resuelven al desplegar en Vercel o usando <code>vercel dev</code>.
      </p>
    </section>
  )
}