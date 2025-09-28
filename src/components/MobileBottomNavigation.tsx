import { motion } from 'framer-motion'
import { Home, Briefcase, Workflow, Info, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMobileDetection } from '../hooks/useMobileDetection'
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext'
import { useLocation, useNavigate } from 'react-router-dom'

const items = [
  { id: 'hero', label: 'Inicio', icon: Home },
  { id: 'services', label: 'Servicios', icon: Briefcase },
  { id: 'process', label: 'Proceso', icon: Workflow },
  { id: 'about', label: 'Nosotros', icon: Info },
  { id: 'contact', label: 'Contacto', icon: Phone },
]

// Helper local para scroll suave a secciones
const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.pageYOffset - 80 // compensa navbar (unificado)
  window.scrollTo({ top: y, behavior: 'smooth' })
}

const MobileBottomNavigation = () => {
  const { isMobile } = useMobileDetection()
  const { isModalOpen: isLeadCaptureOpen } = useLeadCaptureContext()
  const [active, setActive] = useState('hero')
  const navigate = useNavigate()
  const location = useLocation()

  const navigateOrScroll = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
    } else {
      scrollToSection(sectionId)
    }
  }

  useEffect(() => {
    if (!isMobile) return
    const handler = () => {
      const offset = 100
      let current = 'hero'
      for (const it of items) {
        const el = document.getElementById(it.id)
        if (!el) continue
        if (window.scrollY + offset >= el.offsetTop) current = it.id
      }
      setActive(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [isMobile])

  if (!isMobile) return null
  const hidden = isLeadCaptureOpen
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-[65] bg-black/90 backdrop-blur-xl border-t border-white/10 transition-all duration-200 ${hidden ? 'pointer-events-none opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} safe-bottom`}
      aria-label="Navegación inferior móvil"
      aria-hidden={hidden}
      role="navigation"
    >
      <ul className="grid grid-cols-5" role="list">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <li key={item.id} className="flex flex-col items-center justify-center py-2">
              <button
                onClick={() => navigateOrScroll(item.id)}
                type="button"
                aria-label={`Ir a la sección ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
                  isActive ? 'text-[#00FF88]' : 'text-white/70'
                } focus:outline-none focus:ring-2 focus:ring-[#00FF88]/60 focus:ring-offset-2 focus:ring-offset-black rounded-md px-2 py-1`}
              >
                <motion.div animate={{ scale: isActive ? 1.1 : 1 }} aria-hidden="true">
                  <Icon size={20} />
                </motion.div>
                <span className="font-inter">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MobileBottomNavigation