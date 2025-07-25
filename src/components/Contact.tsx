import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, Clock, Target } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Contact = () => {
  const { isContactVisible } = useScrollPosition();
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5491234567890?text=Hola! Me interesa conocer más sobre sus servicios de marketing digital y automatización.', '_blank');
  };

  return (
    <>
      <section id="contact" className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        {/* Animated Background - Desktop Only */}
        <div className="absolute inset-0 hidden md:block">
          {/* Network Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF88" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Floating Elements */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#00FF88] rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                opacity: 0
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight">
              ¿Preparados para{' '}
              <span className="text-[#00FF88]">el siguiente nivel</span>?
            </h2>
            <p className="text-sm xs:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
              Conversemos sobre cómo podemos potenciar tu negocio con soluciones personalizadas.<br className="hidden sm:block" />
              <span className="text-[#00FF88]">Colaboramos con empresas que buscan crecimiento inteligente y medible.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 50px rgba(0, 255, 136, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="group bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-inter hover:shadow-[0_0_50px_rgba(0,255,136,0.5)] transition-all duration-300 inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 min-h-[48px] touch-manipulation"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle size={20} />
              </motion.div>
              <span>Iniciar Conversación</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {[
              {
                icon: Clock,
                title: 'Respuesta inmediata',
                description: 'Te respondemos en menos de 2 horas'
              },
              {
                icon: MessageCircle,
                title: 'Diagnóstico Gratuito',
                description: 'Análisis inicial personalizado sin compromiso'
              },
              {
                icon: Target,
                title: 'Propuesta personalizada',
                description: 'Plan específico para tu negocio'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                {/* Fondo con efecto glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5 rounded-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/10 to-green-700/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Contenido principal */}
                <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 text-center">
                  {/* Efectos decorativos */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-green-400/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-green-600/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500/20 border border-green-500/30 rounded-xl mb-4 md:mb-6 group-hover:bg-green-500/30 transition-colors duration-300"
                    >
                      <feature.icon className="text-green-400 group-hover:text-green-300 transition-colors duration-300" size={20} />
                    </motion.div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 font-inter">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 font-inter leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>

      {/* Floating WhatsApp Button - Appears only when contact section is not visible */}
      <AnimatePresence>
        {!isContactVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 group"
              title="Contactar por WhatsApp"
            >
              <MessageCircle size={24} className="group-hover:animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;