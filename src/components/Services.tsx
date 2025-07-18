import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  CheckSquare, 
  Brain,
  Facebook
} from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Automatizaciones inteligentes',
    description: 'Reducimos tareas manuales y mejoramos tus procesos internos.'
  },
  {
    icon: Target,
    title: 'Marketing digital estratégico',
    description: 'Creamos campañas centradas en resultados reales.'
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce & embudos de conversión',
    description: 'Diseñamos tiendas y funnels que convierten.'
  },
  {
    icon: TrendingUp,
    title: 'Growth Marketing',
    description: 'Escalamos con metodología, no con suposiciones.'
  },
  {
    icon: Users,
    title: 'Inbound Marketing',
    description: 'Atraemos clientes con contenido útil y bien distribuido.'
  },
  {
    icon: MessageSquare,
    title: 'Community Management',
    description: 'Manejamos tu comunidad con cercanía y estrategia.'
  },
  {
    icon: CheckSquare,
    title: 'Project Management',
    description: 'Organizamos y ejecutamos cada paso con claridad y eficiencia.'
  },
  {
    icon: Brain,
    title: 'Contenido con Inteligencia Artificial',
    description: 'Creamos piezas visuales y textuales con tecnología de punta.'
  },
  {
    icon: Facebook,
    title: 'Meta Ads',
    description: 'Publicidad precisa, medible y escalable.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mb-12 md:mb-16"
         >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight">
            Servicios de Marketing Digital que{' '}
            <span className="text-[#00FF88]">Escalan tu Negocio</span>
          </h2>
          <p className="text-sm xs:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
            Nos especializamos en integrar automatización, estrategia digital y herramientas de IA 
            para que cada parte de tu negocio trabaje en sintonía.<br className="hidden sm:block" />
            <span className="text-[#00FF88]">Nuestro enfoque combina análisis, creatividad y acción.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px rgba(57, 255, 20, 0.2)"
              }}
              className="bg-gray-900/50 backdrop-blur-xl border border-[#00FF88]/20 rounded-2xl p-4 sm:p-6 md:p-8 hover:border-[#39FF14]/50 transition-all duration-300 group h-full flex flex-col"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-xl mb-4 md:mb-6 group-hover:bg-[#39FF14]/20 transition-all duration-300 flex-shrink-0"
              >
                <service.icon className="text-[#00FF88] group-hover:text-[#39FF14]" size={20} />
              </motion.div>

              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-3 md:mb-4 font-inter group-hover:text-[#00FF88] transition-colors duration-300 leading-tight">
                {service.title}
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed font-inter flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;