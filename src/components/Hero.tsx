import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';
import { useState, useEffect } from 'react';

const Hero = () => {
  const { openModal } = useLeadCaptureContext();
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 45,
    seconds: 30
  });

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
  
  const handleOpenModal = () => {
    openModal();
  };
  
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background - Desktop Only */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-green-900/20" />
        
        {/* Animated Particles - Desktop Only */}
        {[...Array(30)].map((_, i) => (
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
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
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
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight"
        >
          <span className="text-[#00FF88]">Marketing Digital</span><br />
          <span className="text-[#39FF14]">que Escala tu Negocio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto font-inter leading-relaxed"
        >
          <span className="text-[#00FF88] font-semibold">Damián y Carolina</span> - 
          Automatización, Meta Ads y Growth Marketing
        </motion.p>

        {/* Urgency Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="bg-gray-900/40 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 max-w-2xl mx-auto mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Clock className="text-green-400" size={20} />
            <span className="text-green-400 font-semibold text-sm md:text-base">Oferta Limitada</span>
          </div>
          <p className="text-white text-sm md:text-base mb-4 text-center font-medium">
            <span className="text-[#00FF88] font-bold">Consulta estratégica GRATUITA</span> - Solo quedan <span className="text-green-300 font-bold">3 cupos</span> este mes
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
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20 md:mb-24"
        >
          <motion.button
            onClick={handleOpenModal}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 60px rgba(0, 255, 136, 0.7)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-bold font-inter hover:shadow-[0_0_60px_rgba(0,255,136,0.7)] transition-all duration-300 inline-flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[60px] touch-manipulation w-full sm:w-auto"
          >
            <span className="whitespace-nowrap">Empezar Ahora</span>
          </motion.button>

          <motion.button
            onClick={scrollToServices}
            whileHover={{ 
              scale: 1.05,
              borderColor: "#39FF14",
              color: "#39FF14"
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#00FF88] text-[#00FF88] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-bold font-inter transition-all duration-300 min-h-[48px] sm:min-h-[56px] md:min-h-[60px] touch-manipulation flex items-center justify-center w-full sm:w-auto"
          >
            <span className="whitespace-nowrap">Conocé nuestro trabajo</span>
          </motion.button>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;