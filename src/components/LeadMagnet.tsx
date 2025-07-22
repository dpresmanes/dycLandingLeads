import { motion } from 'framer-motion';
import { Download, CheckCircle, Clock, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import LeadMagnetModal from './LeadMagnetModal';

const LeadMagnet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const benefits = [
    {
      icon: Clock,
      text: 'Ahorra 20+ horas semanales'
    },
    {
      icon: Target,
      text: 'Aumenta conversiones 40%'
    },
    {
      icon: Zap,
      text: 'Implementación inmediata'
    }
  ];

  const automations = [
    'Email marketing automatizado',
    'Seguimiento de leads perdidos',
    'Respuestas automáticas en redes',
    'Reportes de ventas automáticos',
    'Gestión de inventario inteligente',
    'Facturación y cobranza automática',
    'Segmentación de clientes',
    'Remarketing personalizado',
    'Chatbots de atención al cliente',
    'Análisis predictivo de ventas'
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300FF88' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-full px-4 py-2 inline-flex items-center space-x-2 mb-6">
              <Download className="text-[#00FF88]" size={16} />
              <span className="text-[#00FF88] font-semibold text-sm">DESCARGA GRATUITA</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-6 leading-tight">
              <span className="text-[#00FF88]">10 Automatizaciones</span><br />
              que te ahorran 20 horas semanales
            </h2>

            <p className="text-gray-300 text-base md:text-lg font-inter leading-relaxed mb-6">
              Descarga nuestra guía exclusiva con las automatizaciones más efectivas 
              que implementamos en nuestros clientes. <span className="text-[#00FF88]">Resultados garantizados.</span>
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="text-[#00FF88]" size={16} />
                  </div>
                  <span className="text-white font-inter">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ 
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              onClick={openModal}
              className="bg-[#00FF88] text-black px-8 py-4 rounded-lg text-lg font-bold font-inter transition-all duration-300 inline-flex items-center space-x-3"
            >
              <Download size={20} />
              <span>Descargar Guía GRATIS</span>
            </motion.button>
          </motion.div>

          {/* Right Content - Preview con Estilo Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Fondo con efecto glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5 rounded-3xl backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/10 to-green-700/20 rounded-3xl"></div>
            
            {/* Contenido principal */}
            <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
              {/* Efectos decorativos */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-green-400/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-green-600/5 rounded-full blur-lg"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <Zap className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-orbitron font-bold text-lg">Guía de Automatizaciones</h3>
                    <p className="text-gray-300 text-sm">20 páginas • PDF descargable</p>
                  </div>
                </div>

                <h4 className="text-green-400 font-semibold mb-4">Incluye:</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {automations.map((automation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                      <span className="text-gray-300 text-sm font-inter">{automation}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-600/30">
                  <p className="text-center text-gray-300 text-xs font-inter">
                    🔒 Descarga inmediata • Sin spam • Valor: $297
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full flex items-center justify-center"
            >
              <Download className="text-[#00FF88]" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Lead Magnet Modal */}
      <LeadMagnetModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default LeadMagnet;