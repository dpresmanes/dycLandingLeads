import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import ROICalculator from './components/ROICalculator'
import IndustrySpecific from './components/IndustrySpecific'
import LeadMagnet from './components/LeadMagnet'
import SEOHead from './components/SEOHead'
import LeadCaptureModal from './components/LeadCaptureModal'
import DemandIndicators from './components/DemandIndicators'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import MobileBottomNavigation from './components/MobileBottomNavigation'
import { LeadCaptureProvider } from './contexts/LeadCaptureContext'
import { Suspense, lazy } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import { useEffect } from 'react'
import { trackEvent } from '@/utils/analytics'
import RecoverAccess from './components/RecoverAccess'
import PaySuccess from './components/PaySuccess'
import PayFailure from './components/PayFailure'
import PayPending from './components/PayPending'
import PayTest from './components/PayTest'

const BlogList = lazy(() => import('./blog/BlogList'))
const BlogPost = lazy(() => import('./blog/BlogPost'))

function App() {
  const location = useLocation()
  const isBlogRoute = location.pathname.startsWith('/blog')
  const state = location.state as Record<string, unknown> | null
  const scrollTo = typeof state?.scrollTo === 'string' ? state.scrollTo : undefined
  
  // Scroll depth instrumentation per route
  useEffect(() => {
    const thresholds = new Set([25, 50, 75, 100])

    const handler = () => {
      const doc = document.documentElement
      const body = document.body
      const scrollTop = Math.max(doc.scrollTop, body.scrollTop)
      const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight)
      const viewport = window.innerHeight
      const maxScrollable = Math.max(1, scrollHeight - viewport)
      const percent = Math.min(100, Math.round((scrollTop / maxScrollable) * 100))

      for (const t of Array.from(thresholds).sort((a, b) => a - b)) {
        if (percent >= t) {
          trackEvent('scroll_depth', { percent: t, path: location.pathname })
          thresholds.delete(t)
        }
      }

      if (thresholds.size === 0) {
        window.removeEventListener('scroll', handler)
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [location.pathname])

  // SPA page_view on route changes for GTM/GA4
  useEffect(() => {
    try {
      const w = window as (typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void })
      const page_path = `${location.pathname}${location.search}${location.hash}`
      const page_location = window.location.href
      const page_title = document.title

      if (Array.isArray(w?.dataLayer)) {
        w.dataLayer.push({ event: 'page_view', page_path, page_location, page_title })
      } else if (typeof w?.gtag === 'function') {
        w.gtag('event', 'page_view', { page_path, page_location, page_title })
      } else {
        const isProd = import.meta.env.MODE === 'production'
        if (!isProd) {
          console.log('[page_view]', { page_path })
        }
      }
    } catch {
      // ignore
    }
  }, [location.pathname, location.search, location.hash])
  
  return (
    <LeadCaptureProvider>
      <SEOHead />
      <div className="min-h-screen bg-black text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00FF88] focus:text-black focus:rounded">Saltar al contenido principal</a>
        <header>
          <Navbar />
        </header>
        <main id="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Suspense fallback={<div className="py-20 text-center text-gray-300">Cargando secciones…</div>}>
                  <Services />
                  <Process />
                  <About />
                  <Contact />
                   
                   <ROICalculator />
                   <IndustrySpecific />
                  <LeadMagnet />
                </Suspense>
                {/* Renderizamos indicadores solo en Home para evitar solaparse con títulos del blog */}
                <DemandIndicators />
                {scrollTo && (
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                        (function(){
                          const id = ${JSON.stringify(scrollTo)};
                          const el = document.getElementById(id);
                          if (el) {
                            const y = el.offsetTop - 80;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        })();
                      `
                    }}
                  />
                )}
              </>
            } />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<div className="py-20 text-center text-gray-300">Cargando blog…</div>}>
                  <BlogList />
                </Suspense>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Suspense fallback={<div className="py-20 text-center text-gray-300">Cargando artículo…</div>}>
                  <BlogPost />
                </Suspense>
              }
            />
            <Route
              path="/herramientas/calculadora-roi"
              element={
                <>
                  <SEOHead
                    title="Calculadora de ROI — Damián & Carolina"
                    description="Calcula el retorno de inversión de tus campañas y proyecta leads y ventas. Herramienta para tomar decisiones con datos."
                    url={import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/herramientas/calculadora-roi` : undefined}
                    type="article"
                  />
                  <ROICalculator />
                </>
              }
            />
            <Route
              path="/recursos/guias"
              element={
                <>
                  <SEOHead
                    title="Automatizaciones — Pack $17"
                    description="Accede al Pack de Automatizaciones por $17 con sistemas y workflows listos para implementar en tu negocio."
                    url={import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/recursos/guias` : undefined}
                    type="article"
                  />
                  <LeadMagnet />
                </>
              }
            />
            <Route
              path="/recuperar-acceso"
              element={
                <>
                  <SEOHead
                    title="Recuperar acceso"
                    description="Usa tu Magic Link o clave de licencia para recuperar acceso al catálogo."
                    url={import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/recuperar-acceso` : undefined}
                    type="article"
                  />
                  <RecoverAccess />
                </>
              }
            />
            <Route path="/pay/success" element={<PaySuccess />} />
            <Route path="/pay/failure" element={<PayFailure />} />
            <Route path="/pay/pending" element={<PayPending />} />
            <Route
              path="/pay/test"
              element={<PayTest />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
      {!isBlogRoute && <LeadCaptureModal />}
      {/* <DemandIndicators /> => ahora solo en Home */}
      <FloatingWhatsApp />
      {!isBlogRoute && <MobileBottomNavigation />}
    </LeadCaptureProvider>
  )
}

export default App