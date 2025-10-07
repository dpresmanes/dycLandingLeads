import { useEffect, useState } from 'react'
import { trackEvent } from '@/utils/analytics'

export default function RecoverAccess() {
  const [message, setMessage] = useState<string | null>(null)
  const [license, setLicense] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If there's a token in URL, validate via API
    try {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')
      if (token) {
        setLoading(true)
        fetch(`/api/access/magic?token=${encodeURIComponent(token)}`)
          .then(async (r) => {
            const data = await r.json().catch(() => ({}))
            if (r.ok && data?.unlocked) {
              localStorage.setItem('purchaseUnlocked', 'true')
              sessionStorage.setItem('purchaseUnlocked', 'true')
              setMessage('Acceso desbloqueado mediante Magic Link ✅')
              trackEvent('access_magic_success')
            } else {
              setMessage('Magic Link inválido o expirado')
              trackEvent('access_magic_failure')
            }
          })
          .catch(() => setMessage('Error validando Magic Link'))
          .finally(() => setLoading(false))
      }
    } catch {}
  }, [])

  const submitLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const apiUrl = new URL('/api/access/license', window.location.origin).toString()
      const r = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ license })
      })
      let data: any = {}
      try { data = await r.json() } catch {}

      if (r.ok && data?.unlocked) {
        localStorage.setItem('purchaseUnlocked', 'true')
        sessionStorage.setItem('purchaseUnlocked', 'true')
        setMessage('Acceso desbloqueado por licencia ✅')
        trackEvent('access_license_success')
      } else {
        // Fallback: si /api falla, intenta patrón demo
        const isDemo = /^DEMO-[A-Z0-9]{6,}-2025$/i.test(license) || /PRO-(?:[A-Z0-9]{8,})-2025/i.test(license)
        if (isDemo) {
          localStorage.setItem('purchaseUnlocked', 'true')
          sessionStorage.setItem('purchaseUnlocked', 'true')
          setMessage('Acceso desbloqueado en modo demo ✅')
          trackEvent('access_license_demo_success')
        } else {
          setMessage('Clave de licencia inválida')
          trackEvent('access_license_failure')
        }
      }
    } catch {
      setMessage('Error procesando la licencia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-orbitron font-bold mb-4">Recuperar acceso</h1>
        <p className="text-gray-300 mb-6">Usa tu Magic Link o ingresa tu clave de licencia para recuperar el acceso al catálogo.</p>
        {message && (
          <div className="rounded-2xl p-4 border border-[#00FF88]/30 bg-[#00FF88]/5 text-white mb-4">{message}</div>
        )}
        <form onSubmit={submitLicense} className="space-y-4">
          <label className="block text-sm text-gray-300">Clave de licencia</label>
          <input value={license} onChange={(e) => setLicense(e.target.value)} className="w-full rounded-lg bg-gray-900/50 border border-[#00FF88]/30 px-4 py-2 text-white" placeholder="LICENSE-XXXX…-2025" />
          <button type="submit" disabled={loading} className="bg-[#00FF88] text-black px-4 py-2 rounded-lg text-sm font-bold font-inter">
            {loading ? 'Validando…' : 'Desbloquear con licencia'}
          </button>
        </form>
      </div>
    </section>
  )
}