import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMobileDetection } from '../hooks/useMobileDetection'

interface FloatingWhatsAppProps {
  phone?: string // in international format without +, e.g. 5491137638307
  prefilled?: string
}

const DEFAULT_PHONE = '5491137638307'
const DEFAULT_MSG = 'Hola! Me interesa conocer más sobre sus servicios de marketing digital y automatización.'

const FloatingWhatsApp = ({ phone = DEFAULT_PHONE, prefilled = DEFAULT_MSG }: FloatingWhatsAppProps) => {
  const { isMobile } = useMobileDetection()
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(true)
  const cardId = 'whatsapp-help-card'
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expanded) {
        e.preventDefault()
        setExpanded(false)
        // devolver foco al botón
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [expanded])

  // Mostrar también en desktop para asegurar disponibilidad del botón
  if (!visible) return null

  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(prefilled)}`
    window.open(url, '_blank')
  }

  const bottomValue = isMobile ? 'calc(84px + var(--sab))' : 'calc(24px + var(--sab))'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed z-[80] right-4"
        style={{ pointerEvents: 'auto', bottom: bottomValue }}
      >
        {/* Collapsed FAB */}
        <motion.button
          ref={triggerRef}
          aria-label={expanded ? 'Cerrar ayuda de WhatsApp' : 'Contactar por WhatsApp'}
          aria-expanded={expanded}
          aria-controls={cardId}
          onClick={expanded ? () => setExpanded(false) : handleClick}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.04 }}
          className="bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]"
        >
          {expanded ? <X size={22} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
        </motion.button>

        {/* Expandable card */}
        <div className="relative">
          <AnimatePresence>
            {expanded && (
              <motion.div
                id={cardId}
                role="dialog"
                aria-modal="true"
                aria-labelledby="whatsapp-help-title"
                aria-describedby="whatsapp-help-desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 bottom-3 w-[280px] p-3 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl"
              >
                <h2 id="whatsapp-help-title" className="sr-only">Ayuda por WhatsApp</h2>
                <p id="whatsapp-help-desc" className="text-white text-sm leading-snug mb-2">
                  ¿Necesitas ayuda rápida? Escríbenos por WhatsApp y te respondemos en menos de 2 horas.
                </p>
                <button
                  onClick={handleClick}
                  className="w-full bg-[#25D366] text-black font-bold rounded-xl py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Abrir WhatsApp
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
};

export default FloatingWhatsApp;