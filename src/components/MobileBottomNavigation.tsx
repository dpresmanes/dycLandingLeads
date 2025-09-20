import { motion } from 'framer-motion';
import { Home, Briefcase, Workflow, Info, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const items = [
  { id: 'hero', label: 'Inicio', icon: Home },
  { id: 'services', label: 'Servicios', icon: Briefcase },
  { id: 'process', label: 'Proceso', icon: Workflow },
  { id: 'about', label: 'Nosotros', icon: Info },
  { id: 'contact', label: 'Contacto', icon: Phone },
];

const MobileBottomNavigation = () => {
  const { isMobile } = useMobileDetection();
  const [active, setActive] = useState('hero');
  const { openModal } = useLeadCaptureContext();

  useEffect(() => {
    if (!isMobile) return;
    const handler = () => {
      const offset = 100;
      let current = 'hero';
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        if (window.scrollY + offset >= el.offsetTop) current = it.id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [isMobile]);

  if (!isMobile) return null;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // altura navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[65] bg-black/90 backdrop-blur-xl border-t border-white/10"
      aria-label="Navegación inferior móvil"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li key={item.id} className="flex flex-col items-center justify-center py-2">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
                  isActive ? 'text-[#00FF88]' : 'text-white/70'
                }`}
              >
                <motion.div animate={{ scale: isActive ? 1.1 : 1 }}>
                  <Icon size={20} />
                </motion.div>
                <span className="font-inter">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNavigation;