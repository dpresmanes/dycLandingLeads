import { motion } from 'framer-motion';
import { User, Briefcase, Target, TrendingUp, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight">
            <span className="text-[#00FF88]">Conocé al equipo</span><br />
            detrás de tu crecimiento
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
            Estrategia y ejecución para lograr resultados medibles y sostenibles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Damián */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5,
              boxShadow: "0 20px 40px rgba(0, 255, 136, 0.1)"
            }}
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6 sm:p-8 md:p-8 hover:border-[#00FF88]/20 transition-all duration-300 group"
          >
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-4 sm:mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#00FF88] to-[#39FF14] rounded-full flex items-center justify-center flex-shrink-0"
              >
                <User className="text-black" size={24} />
              </motion.div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300">
                  Damián
                </h3>
                <p className="text-gray-300 font-inter text-sm sm:text-base">Estrategia & Performance</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed font-inter text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              Me especializo en <span className="text-[#00FF88]">estrategia digital, automatización y Meta Ads</span>.
              <br /><br />
              Enfoque directo y eficiente para generar impacto medible.
            </p>

            {/* Más información tipo bullets */}
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-snug">
                <Target className="text-[#00FF88] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span>Diseño de embudos y arquitectura de campañas orientadas a conversión.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-snug">
                <TrendingUp className="text-[#00FF88] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span>Optimización continua basada en datos y experimentación (A/B testing).</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-snug">
                <CheckCircle className="text-[#00FF88] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span>Implementación de automatizaciones para escalar resultados de forma sostenible.</span>
              </li>
            </ul>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-3">
                <Briefcase className="text-[#00FF88]" size={18} />
                <span className="text-[#00FF88] font-semibold text-sm sm:text-base">Especialidades:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Meta Ads', 'Automatización', 'Inteligencia Artificial', 'Growth Marketing', 'Analytics'].map((skill) => (
                  <span key={skill} className="bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Carolina */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5,
              boxShadow: "0 20px 40px rgba(0, 255, 136, 0.1)"
            }}
            className="bg-gray-900/50 backdrop-blur-xl border border-[#00FF88]/20 rounded-3xl p-6 sm:p-8 md:p-8 hover:border-[#00FF88]/50 transition-all duration-300 group"
          >
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-4 sm:mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#39FF14] to-[#00FF88] rounded-full flex items-center justify-center flex-shrink-0"
              >
                <User className="text-black" size={24} />
              </motion.div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300">
                  Carolina
                </h3>
                <p className="text-gray-300 font-inter text-sm sm:text-base">Planificación & E‑commerce</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed font-inter text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              Me enfoco en <span className="text-[#00FF88]">planificación, optimización y desarrollo comercial</span>.
              <br /><br />
              Estructuro procesos y coordino lanzamientos para crecer de forma ordenada.
            </p>

            {/* Más información tipo bullets */}
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-snug">
                <Target className="text-[#00FF88] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span>Metodologías para aumentar tasa de conversión y ticket promedio en e‑commerce.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-snug">
                <TrendingUp className="text-[#00FF88] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span>Optimización operativa y coordinación integral de lanzamientos.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-snug">
                <CheckCircle className="text-[#00FF88] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span>Implementación de procesos y sistemas para escalar con control de calidad.</span>
              </li>
            </ul>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-3">
                <Briefcase className="text-[#00FF88]" size={18} />
                <span className="text-[#00FF88] font-semibold text-sm sm:text-base">Especialidades:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['E‑commerce', 'Project Management', 'Pricing', 'Operations'].map((skill) => (
                  <span key={skill} className="bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-[#00FF88]/10 to-[#39FF14]/10 border border-[#00FF88]/30 rounded-2xl p-6 sm:p-8 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-orbitron font-bold text-white mb-3 sm:mb-4">
              Juntos creamos el equilibrio perfecto
            </h3>
            <p className="text-gray-300 font-inter text-sm sm:text-base md:text-lg leading-relaxed">
              Combinamos estrategia técnica y visión integral para resultados sostenibles.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;