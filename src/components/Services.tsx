import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Facebook,
  CheckCircle
} from 'lucide-react';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const services = [
  {
    icon: Target,
    title: 'Marketing Digital Estratégico',
    description: 'Estrategias data-driven que maximizan tu ROI y aceleran el crecimiento.',
    features: ['Análisis de mercado', 'Segmentación avanzada', 'Optimización continua', 'Reportes detallados'],
    popular: true
  },
  {
    icon: Facebook,
    title: 'Meta Ads',
    description: 'Campañas publicitarias en Facebook e Instagram que maximizan tu inversión.',
    features: ['Targeting preciso', 'Creatividades ganadoras', 'Optimización de presupuesto', 'Scaling estratégico'],
    popular: true
  },
  {
    icon: Zap,
    title: 'Automatización Inteligente',
    description: 'Sistemas que trabajan 24/7 para captar, nutrir y convertir leads automáticamente.',
    features: ['CRM automatizado', 'Email marketing', 'Chatbots inteligentes', 'Workflows personalizados'],
    popular: false
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce y Funnels de Conversión',
    description: 'Tiendas online optimizadas y funnels que convierten visitantes en clientes.',
    features: ['Diseño UX/UI', 'Optimización de conversión', 'Integración de pagos', 'Analytics avanzado'],
    popular: false
  },
  {
    icon: TrendingUp,
    title: 'Growth Marketing',
    description: 'Estrategias de crecimiento acelerado basadas en experimentación y datos.',
    features: ['A/B Testing', 'Growth hacking', 'Retención de clientes', 'Escalabilidad'],
    popular: false
  },
  {
    icon: Users,
    title: 'Inbound Marketing',
    description: 'Atrae clientes ideales con contenido valioso y estrategias de posicionamiento.',
    features: ['Content marketing', 'SEO avanzado', 'Lead magnets', 'Nurturing campaigns'],
    popular: false
  },
  {
    icon: MessageSquare,
    title: 'Community Management',
    description: 'Gestión profesional de redes sociales que construye comunidades leales.',
    features: ['Estrategia de contenido', 'Engagement auténtico', 'Influencer marketing', 'Social listening'],
    popular: false
  },
  {
    icon: CheckCircle,
    title: 'Gestión de Proyectos',
    description: 'Coordinación experta que asegura entregas a tiempo y resultados excepcionales.',
    features: ['Metodologías ágiles', 'Comunicación fluida', 'Control de calidad', 'Seguimiento continuo'],
    popular: false
  },
  {
    icon: CheckCircle,
    title: 'Creación de Contenido con IA',
    description: 'Contenido de alta calidad potenciado por inteligencia artificial.',
    features: ['Copywriting persuasivo', 'Diseño gráfico', 'Video marketing', 'Automatización de contenido'],
    popular: false
  }
];

const Services = () => {
  const { openModal } = useLeadCaptureContext();

  return (
    <section id="services" className="pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 bg-gradient-to-b from-black to-gray-900/50 relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight">
        Soluciones Integrales que{' '}
        <span className="text-[#00FF88]">Impulsan tu Crecimiento</span>
      </h2>
      <p className="text-sm xs:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed">
         Integramos tecnología, estrategia y creatividad {' '}
         para que tu negocio funcione como un sistema eficiente.<br className="hidden sm:block" />
         <span className="text-[#00FF88] font-semibold">Cada solución está diseñada para generar resultados sostenibles.</span>
       </p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
      {services.map((service, index) => {
        const IconComponent = service.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className={`bg-gray-900/30 backdrop-blur-sm border rounded-xl p-6 sm:p-8 hover:border-[#00FF88]/20 transition-all duration-300 group relative ${
              service.popular ? 'border-[#00FF88]/30' : 'border-gray-600/20'
            }`}
          >
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#00FF88] text-black px-4 py-1 rounded-full text-xs font-bold">
                  MÁS POPULAR
                </div>
              </div>
            )}

            <div className="bg-[#00FF88]/10 w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00FF88]/20 transition-colors duration-300">
              <IconComponent className="text-[#00FF88]" size={24} />
            </div>

            <h3 className="text-white font-bold text-xl sm:text-2xl mb-4 font-inter">
              {service.title}
            </h3>

            <p className="text-[#CCCCCC] mb-4 leading-relaxed font-inter">
              {service.description}
            </p>

            <ul className="space-y-3 mb-6">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3">
                  <CheckCircle className="text-[#00FF88] flex-shrink-0" size={16} />
                  <span className="text-[#CCCCCC] text-sm sm:text-base font-inter">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openModal}
              className="w-full bg-[#00FF88]/10 hover:bg-[#00FF88]/80 text-[#00FF88] hover:text-black border border-[#00FF88]/20 hover:border-[#00FF88]/60 font-semibold py-3 px-6 rounded-lg transition-all duration-300 font-inter"
            >
              Explorar Solución
            </button>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>
  );
};

export default Services;