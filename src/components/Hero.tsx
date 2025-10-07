import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Calculator, BookOpen } from 'lucide-react';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/utils/analytics';

const Hero = () => {
  const { openModal } = useLeadCaptureContext();
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Fire once when hero becomes visible on mount
    trackEvent('hero_view', { section: 'hero' });
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handlers
  const handleOpenModal = () => {
    trackEvent('consultation_cta_click', { location: 'hero' });
    openModal();
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      trackEvent('scroll_to_services_click', { location: 'hero' });
    }
  };

  const goToBlog = () => {
    trackEvent('blog_cta_click', { location: 'hero' });
    navigate('/blog');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background - Desktop Only */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-green-900/20" />
        
        {/* Subtle Animated Particles - Desktop Only */}
        {!prefersReducedMotion && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00FF88] rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}

        {/* Grid Pattern - Desktop Only */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-[#00FF88]/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-br from-black via-black to-green-900/10" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 pt-32 md:pt-24 lg:pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight"
        >
          Escalá tu <span className="text-[#00FF88]">e‑commerce</span>
          <span className="block text-[#39FF14]">con estrategias de marketing digital</span>
        </motion.h1>

        {/* Subtítulo */}
        {/* Subtítulo principal único para SEO (unificado color verde #00FF88) */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/85 mb-6 md:mb-8 max-w-4xl mx-auto font-inter leading-snug"
        >
          Somos Damián & Carolina. Ayudamos marcas de <span className="text-[#00FF88] font-semibold">e‑commerce</span> a crecer con <span className="text-[#00FF88] font-semibold">Meta Ads</span> y automatizaciones.
        </motion.p>

        {/* Urgency Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6 }}
          className="bg-gray-900/40 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 max-w-2xl mx-auto mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Clock className="text-green-400" size={20} />
            <span className="text-green-400 font-semibold text-sm md:text-base">Oferta Limitada</span>
          </div>
          <p className="text-white text-sm md:text-base mb-4 text-center font-medium">
            <span className="text-[#00FF88] font-bold">Oferta especial</span> - Solo quedan <span className="text-green-300 font-bold">3 cupos</span> este mes
          </p>
          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            <div className="bg-gray-800/60 rounded-lg p-2 md:p-3">
              <div className="text-lg md:text-2xl font-bold text-[#00FF88]">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-xs md:text-sm text-gray-400">Días</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg p-2 md:p-3">
              <div className="text-lg md:text-2xl font-bold text-[#00FF88]">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs md:text-sm text-gray-400">Horas</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg p-2 md:p-3">
              <div className="text-lg md:text-2xl font-bold text-[#00FF88]">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs md:text-sm text-gray-400">Min</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg p-2 md:p-3">
              <div className="text-lg md:text-2xl font-bold text-[#00FF88]">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs md:text-sm text-gray-400">Seg</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.8 }}
          className="space-y-3 sm:space-y-4 mb-16 sm:mb-20 md:mb-24"
        >
          {/* Fila principal: acciones primarias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <motion.button
              type="button"
              onClick={() => navigate('/recursos/guias')}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="group bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black px-6 sm:px-8 md:px-10 h-12 sm:h-14 md:h-[60px] rounded-full text-base sm:text-lg md:text-xl font-bold font-inter shadow-[0_0_30px_rgba(0,255,136,0.35)] hover:shadow-[0_0_45px_rgba(0,255,136,0.55)] transition-all duration-200 inline-flex items-center justify-center touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Comprar pack de automatizaciones"
            >
              <span className="whitespace-nowrap">Comprar pack de automatizaciones • $17</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={scrollToServices}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="border-2 border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-black px-6 sm:px-8 md:px-10 h-12 sm:h-14 md:h-[60px] rounded-full text-base sm:text-lg md:text-xl font-bold font-inter transition-all duration-200 inline-flex items-center justify-center touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Conocé nuestro trabajo"
            >
              <span className="whitespace-nowrap">Conocé nuestro trabajo</span>
            </motion.button>
          </div>

          {/* Fila secundaria: acciones complementarias como chips */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <motion.button
              type="button"
              onClick={() => { trackEvent('roi_calculator_cta_click', { location: 'hero' }); navigate('/herramientas/calculadora-roi'); }}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="bg-gray-900/60 border border-[#00FF88]/35 text-white hover:bg-[#00FF88] hover:text-black hover:border-[#00FF88] px-5 sm:px-6 h-11 sm:h-12 rounded-full text-sm sm:text-base font-semibold font-inter transition-all duration-200 inline-flex items-center justify-center gap-2 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Calcular ROI"
            >
              <Calculator size={18} aria-hidden="true" />
              <span className="whitespace-nowrap">Calcular ROI</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={goToBlog}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="bg-gray-900/60 border border-[#00FF88]/35 text-white hover:bg-[#00FF88] hover:text-black hover:border-[#00FF88] px-5 sm:px-6 h-11 sm:h-12 rounded-full text-sm sm:text-base font-semibold font-inter transition-all duration-200 inline-flex items-center justify-center gap-2 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Visitar el Blog"
            >
              <BookOpen size={18} aria-hidden="true" />
              <span className="whitespace-nowrap">Visitar el Blog</span>
            </motion.button>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;