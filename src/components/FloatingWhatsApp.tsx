import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const onScroll = () => {
      setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isMobile || !visible) return null

  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(prefilled)}`
    window.open(url, '_blank')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed z-[70] right-4"
        style={{ pointerEvents: 'auto', bottom: 'calc(84px + var(--sab))' }}
      >
        {/* Collapsed FAB */}
        <motion.button
          aria-label="Contactar por WhatsApp"
          onClick={expanded ? () => setExpanded(false) : handleClick}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.04 }}
          className="bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl grid place-items-center"
        >
          {expanded ? <X size={22} /> : <MessageCircle size={24} />}
        </motion.button>

        {/* Expandable card */}
        <div className="relative">
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 bottom-3 w-[280px] p-3 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl"
              >
                <p className="text-white text-sm leading-snug mb-2">
                  ¿Necesitas ayuda rápida? Escríbenos por WhatsApp y te respondemos en menos de 2 horas.
                </p>
                <button
                  onClick={handleClick}
                  className="w-full bg-[#25D366] text-black font-bold rounded-xl py-2 text-sm"
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