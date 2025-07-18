import { motion } from 'framer-motion';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const Hero = () => {
  const { openModal } = useLeadCaptureContext();
  
  const handleOpenModal = () => {
    console.log('Button clicked - opening modal');
    openModal();
  };
  
  const scrollToServices = () => {
    console.log('Scroll to services clicked');
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
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-16 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight"
        >
          <span className="text-[#00FF88]">Marketing Digital</span><br />
          <span className="text-[#39FF14]">que Escala tu Negocio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto font-inter leading-relaxed"
        >
          <span className="text-[#00FF88] font-semibold">Damián y Carolina</span> - 
          Automatización, Meta Ads y Growth Marketing
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20 md:mb-24"
        >
          <motion.button
            onClick={handleOpenModal}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 50px rgba(0, 255, 136, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-bold font-inter hover:shadow-[0_0_50px_rgba(0,255,136,0.5)] transition-all duration-300 inline-flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[60px] touch-manipulation w-full sm:w-auto"
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