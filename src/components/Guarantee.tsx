import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const Guarantee: React.FC = () => {
  const { openModal } = useLeadCaptureContext();

  const guarantees = [
    {
      icon: Shield,
      title: 'Metodología Probada',
      description: 'Aplicamos estrategias validadas con más de 100 clientes exitosos en diferentes industrias.',
      highlight: 'Experiencia'
    },
    {
      icon: Clock,
      title: 'Atención Personalizada',
      description: 'Comunicación directa con nuestro equipo, sin intermediarios ni centros de llamadas.',
      highlight: 'Directo'
    },
    {
      icon: TrendingUp,
      title: 'Enfoque en Resultados',
      description: 'Nos enfocamos en métricas que realmente importan para el crecimiento de tu negocio.',
      highlight: 'Medible'
    },
    {
      icon: CheckCircle,
      title: 'Transparencia Total',
      description: 'Acceso completo a reportes, métricas y análisis de rendimiento en tiempo real.',
      highlight: 'Transparente'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#0A0A0A] to-[#111111] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FF88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00FF88]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full px-4 py-2 mb-6">
            <Shield className="text-[#00FF88]" size={16} />
            <span className="text-[#00FF88] font-semibold text-sm font-inter">Nuestro Compromiso</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-inter">
            Trabajamos con
            <span className="text-[#00FF88] block sm:inline sm:ml-3">
              Estándares de Excelencia
            </span>
          </h2>
          
          <p className="text-[#CCCCCC] text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-inter">
            Nuestro compromiso es brindar estrategias efectivas, comunicación transparente y resultados medibles para el crecimiento sostenible de tu negocio.
          </p>
        </motion.div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6 sm:p-8 hover:border-[#00FF88]/20 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-[#00FF88]/5 p-3 rounded-lg group-hover:bg-[#00FF88]/10 transition-colors duration-300">
                    <IconComponent className="text-[#00FF88]" size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-bold text-lg sm:text-xl font-inter">
                        {guarantee.title}
                      </h3>
                      <div className="bg-[#00FF88]/10 text-[#00FF88] px-3 py-1 rounded-full text-xs font-semibold">
                        {guarantee.highlight}
                      </div>
                    </div>
                    
                    <p className="text-[#CCCCCC] leading-relaxed font-inter">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section con Estilo Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center relative"
        >
          {/* Fondo con efecto glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5 rounded-3xl backdrop-blur-sm max-w-4xl mx-auto"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/10 to-green-700/20 rounded-3xl max-w-4xl mx-auto"></div>
          
          {/* Contenido principal */}
          <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 max-w-4xl mx-auto">
            {/* Efectos decorativos */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-green-400/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-600/5 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-inter">
                <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                  ¿Listo para Impulsar tu Negocio?
                </span>
              </h3>
              
              <p className="text-gray-300 text-lg mb-8 font-inter max-w-2xl mx-auto">
                Agenda tu consulta estratégica gratuita y descubre cómo podemos potenciar tu negocio con metodologías probadas.
              </p>
              
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-full hover:from-green-400 hover:to-green-500 transition-all duration-300 font-inter text-lg shadow-lg hover:shadow-green-500/25"
              >
                Agendar Consulta Gratuita
              </motion.button>
              
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span>Sin compromiso</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span>100% gratuita</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span>Estrategia personalizada</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;