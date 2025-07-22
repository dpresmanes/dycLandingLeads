import { motion } from 'framer-motion';
import { Search, Lightbulb, Rocket, BarChart3 } from 'lucide-react';

const processSteps = [
  {
    icon: Search,
    title: 'Diagnóstico',
    description: 'Analizamos tu negocio, identificamos oportunidades y definimos objetivos claros.'
  },
  {
    icon: Lightbulb,
    title: 'Estrategia',
    description: 'Diseñamos un plan personalizado con metodologías probadas y herramientas específicas.'
  },
  {
    icon: Rocket,
    title: 'Ejecución',
    description: 'Implementamos cada acción con precisión, monitoreando cada paso del proceso.'
  },
  {
    icon: BarChart3,
    title: 'Optimización',
    description: 'Medimos resultados, ajustamos estrategias y escalamos lo que funciona.'
  }
];

const Process = () => {
  return (
    <section id="process" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Pattern - Desktop Only */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FF88' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight">
            <span className="text-[#00FF88]">Procesos claros.</span><br />
            Resultados concretos.
          </h2>
          <p className="text-sm xs:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
            Cada proyecto comienza con un diagnóstico, sigue con una estrategia sólida 
            y termina en resultados medibles.<br className="hidden sm:block" />
            <span className="text-[#00FF88]">Nuestro sistema se adapta a tu negocio y se mejora constantemente.</span>
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FF88] via-[#39FF14] to-[#00FF88] transform -translate-y-1/2" />

          <div className="grid grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Node */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-6 bg-[#00FF88] rounded-full border-4 border-black z-10" />

                <motion.div
                  whileHover={{ 
                    y: -5
                  }}
                  className="bg-gray-900/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-8 text-center hover:border-[#00FF88]/20 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-full mb-6 group-hover:bg-[#00FF88]/10 transition-all duration-300"
                  >
                    <step.icon className="text-[#00FF88]" size={36} />
                  </motion.div>

                  <h3 className="text-2xl font-semibold text-white mb-4 font-orbitron group-hover:text-[#00FF88] transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed font-inter">
                    {step.description}
                  </p>

                  <div className="mt-6 text-[#00FF88] font-bold text-lg">
                    0{index + 1}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet: Vertical Timeline */}
        <div className="lg:hidden space-y-6 sm:space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-3 sm:space-x-4 md:space-x-6"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-full flex items-center justify-center"
              >
                <step.icon className="text-[#00FF88]" size={20} />
              </motion.div>

              {/* Content */}
              <div className="flex-1 bg-gray-900/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-4 sm:p-6 md:p-8">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-xl md:text-2xl font-semibold text-white font-orbitron">
                    {step.title}
                  </h3>
                  <span className="text-[#00FF88] font-bold text-xs sm:text-sm">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed font-inter">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;