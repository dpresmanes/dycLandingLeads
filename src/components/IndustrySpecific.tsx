import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Home, 
  Utensils,
  TrendingUp,
  Target,
  CheckCircle
} from 'lucide-react';

interface IndustryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  challenges: string[];
  solutions: string[];
  results: {
    metric: string;
    improvement: string;
  }[];
  caseStudy: {
    client: string;
    challenge: string;
    result: string;
  };
  services: string[];
}

const industries: IndustryData[] = [
  {
    id: 'ecommerce',
    name: 'E‑commerce',
    icon: <ShoppingBag className="h-8 w-8" />,
    description: 'Automatización de stock, checkout optimizado y fidelización para tiendas online.',
    challenges: [
      'Alta competencia en precios',
      'Carritos abandonados (70% promedio)',
      'Bajo lifetime value del cliente',
      'Dificultad para diferenciarse'
    ],
    solutions: [
      'Optimización de embudos de conversión',
      'Remarketing estratégico multicanal',
      'Personalización de experiencia de compra',
      'Automatización de email marketing',
      'Optimización de páginas de producto'
    ],
    results: [
      { metric: 'Tasa de Conversión', improvement: '+280%' },
      { metric: 'Valor Promedio de Pedido', improvement: '+65%' },
      { metric: 'Retención de Clientes', improvement: '+150%' },
      { metric: 'ROAS', improvement: '+320%' }
    ],
    caseStudy: {
      client: 'Tienda de Moda Online',
      challenge: 'Conversión del 1.2% y alto costo de adquisición',
      result: 'Aumentó conversión a 4.8% y redujo CAC en 60% en 4 meses'
    },
    services: [
      'Auditoría de conversión completa',
      'Optimización de checkout',
      'Campañas de remarketing',
      'Email marketing automatizado',
      'Análisis de comportamiento de usuario'
    ]
  },
  {
    id: 'services',
    name: 'Servicios Profesionales',
    icon: <Briefcase className="h-8 w-8" />,
    description: 'Generación de leads calificados y seguimiento automatizado para cerrar más negocios.',
    challenges: [
      'Dependencia de referencias',
      'Dificultad para demostrar valor',
      'Ciclos de venta largos',
      'Competencia en precio'
    ],
    solutions: [
      'Estrategia de contenido de autoridad',
      'LinkedIn Ads optimizado',
      'Lead magnets especializados',
      'Webinars educativos',
      'Nurturing automatizado'
    ],
    results: [
      { metric: 'Leads Cualificados', improvement: '+450%' },
      { metric: 'Tasa de Cierre', improvement: '+130%' },
      { metric: 'Valor Promedio Cliente', improvement: '+85%' },
      { metric: 'Tiempo de Venta', improvement: '-40%' }
    ],
    caseStudy: {
      client: 'Consultoría Empresarial',
      challenge: 'Solo 8 leads cualificados por mes',
      result: 'Generó 45 leads mensuales con tasa de cierre del 35%'
    },
    services: [
      'Estrategia de contenido B2B',
      'Optimización de LinkedIn',
      'Automatización de seguimiento',
      'Webinars de generación de leads',
      'CRM y nurturing personalizado'
    ]
  },
  {
    id: 'education',
    name: 'Educación Online',
    icon: <GraduationCap className="h-8 w-8" />,
    description: 'Visibilidad y embudos educativos con automatización para aumentar inscripciones y retención.',
    challenges: [
      'Saturación del mercado',
      'Dificultad para justificar precios',
      'Baja retención de estudiantes',
      'Competencia con contenido gratuito'
    ],
    solutions: [
      'Posicionamiento de autoridad',
      'Embudos educativos progresivos',
      'Comunidades de aprendizaje',
      'Contenido viral estratégico',
      'Programas de afiliados'
    ],
    results: [
      { metric: 'Estudiantes Activos', improvement: '+800%' },
      { metric: 'Ingresos por Curso', improvement: '+650%' },
      { metric: 'Engagement Rate', improvement: '+300%' },
      { metric: 'Retención', improvement: '+200%' }
    ],
    caseStudy: {
      client: 'Coach de Desarrollo Personal',
      challenge: 'Audiencia de 2,500 con bajos ingresos',
      result: 'Creció a 28,000 seguidores y $35,000/mes en ingresos'
    },
    services: [
      'Estrategia de contenido viral',
      'Embudos de venta educativos',
      'Automatización de cursos',
      'Comunidad y engagement',
      'Programas de certificación'
    ]
  },
  {
    id: 'health',
    name: 'Salud y Bienestar',
    icon: <Heart className="h-8 w-8" />,
    description: 'Captación y fidelización con SEO local y contenido educativo confiable.',
    challenges: [
      'Regulaciones estrictas de publicidad',
      'Necesidad de generar confianza',
      'Competencia local intensa',
      'Pacientes informados y exigentes'
    ],
    solutions: [
      'Marketing de contenido médico',
      'SEO local especializado',
      'Educación del paciente',
      'Reputación online'
    ],
    results: [
      { metric: 'Nuevos Pacientes', improvement: '+180%' },
      { metric: 'Retención de Pacientes', improvement: '+120%' },
      { metric: 'Valor Lifetime', improvement: '+90%' },
      { metric: 'Reputación Online', improvement: '+250%' }
    ],
    caseStudy: {
      client: 'Clínica Dental',
      challenge: 'Dependencia de referencias y baja visibilidad',
      result: 'Triplicó nuevos pacientes y mejoró retención en 85%'
    },
    services: [
      'SEO médico especializado',
      'Gestión de reputación',
      'Contenido educativo',
      'Marketing local',
      'Automatización de citas'
    ]
  },
  {
    id: 'realestate',
    name: 'Bienes Raíces',
    icon: <Home className="h-8 w-8" />,
    description: 'Generación de leads y nurturing a largo plazo con video y tours virtuales.',
    challenges: [
      'Mercado altamente competitivo',
      'Ciclos de venta muy largos',
      'Necesidad de generar confianza',
      'Dependencia de referidos'
    ],
    solutions: [
      'Marketing de contenido inmobiliario',
      'Tours virtuales y video marketing',
      'Lead nurturing a largo plazo',
      'Redes sociales especializadas',
      'CRM inmobiliario avanzado'
    ],
    results: [
      { metric: 'Leads Cualificados', improvement: '+300%' },
      { metric: 'Tiempo de Venta', improvement: '-35%' },
      { metric: 'Comisiones Anuales', improvement: '+220%' },
      { metric: 'Referidos', improvement: '+180%' }
    ],
    caseStudy: {
      client: 'Agencia Inmobiliaria',
      challenge: 'Dependencia total de referidos y networking',
      result: 'Generó 150+ leads mensuales y aumentó ventas 220%'
    },
    services: [
      'Generación de leads inmobiliarios',
      'Video marketing y tours virtuales',
      'CRM especializado',
      'Marketing en redes sociales',
      'Automatización de seguimiento'
    ]
  },
  {
    id: 'restaurants',
    name: 'Restaurantes',
    icon: <Utensils className="h-8 w-8" />,
    description: 'Campañas de rendimiento, sistematización de reservas y estrategias de marketing temporal para gastronomía.',
    challenges: [
      'Competencia local intensa',
      'Márgenes de ganancia ajustados',
      'Dependencia del tráfico peatonal',
      'Estacionalidad del negocio'
    ],
    solutions: [
      'Marketing gastronómico visual',
      'Programas de fidelización',
      'Delivery y takeaway optimizado',
      'Eventos y experiencias',
      'Influencer marketing local'
    ],
    results: [
      { metric: 'Clientes Nuevos', improvement: '+160%' },
      { metric: 'Frecuencia de Visita', improvement: '+80%' },
      { metric: 'Ticket Promedio', improvement: '+45%' },
      { metric: 'Delivery Online', improvement: '+280%' }
    ],
    caseStudy: {
      client: 'Restaurante Familiar',
      challenge: 'Baja ocupación y dependencia del tráfico peatonal',
      result: 'Aumentó ocupación 160% y creó flujo constante de reservas'
    },
    services: [
      'Marketing gastronómico visual',
      'Gestión de redes sociales',
      'Programas de fidelización',
      'Optimización de delivery',
      'Marketing de eventos'
    ]
  }
];

const IndustrySpecific: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ecommerce');
  const currentIndustry = industries.find(ind => ind.id === selectedIndustry) || industries[0];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Estrategias personalizadas para <span className="text-green-400">cada sector</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Metodologías especializadas creadas para los retos particulares de tu mercado
          </p>
        </motion.div>

        {/* Selector de Industrias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  selectedIndustry === industry.id
                    ? 'border-green-500/60 bg-green-500/10 text-green-400'
                    : 'border-gray-600/40 bg-gray-800/30 text-gray-400 hover:border-green-400/60 hover:text-green-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {industry.icon}
                  <span className="text-sm font-medium text-center">{industry.name}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenido de la Industria Seleccionada */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Información Principal */}
            <div className="space-y-8">
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-600/20">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-500/20 rounded-full mr-4">
                    {currentIndustry.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{currentIndustry.name}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{currentIndustry.description}</p>
              </div>

              {/* Desafíos */}
              <div className="bg-red-900/10 backdrop-blur-sm rounded-xl p-8 border border-red-500/20">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Target className="h-5 w-5 text-red-400 mr-3" />
                  Desafíos Comunes
                </h4>
                <ul className="space-y-3">
                  {currentIndustry.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soluciones */}
              <div className="bg-green-900/10 backdrop-blur-sm rounded-xl p-8 border border-green-500/20">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Nuestras Soluciones
                </h4>
                <ul className="space-y-3">
                  {currentIndustry.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resultados */}
            <div className="space-y-8">
              {/* Resultados */}
              <div className="bg-blue-900/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-400 mr-3" />
                  Resultados Típicos
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {currentIndustry.results.map((result, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">{result.metric}</p>
                      <p className="text-2xl font-bold text-blue-400">{result.improvement}</p>
                    </div>
                  ))}
                </div>
              </div>


              {/* Servicios Específicos */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50">
                <h4 className="text-xl font-bold text-white mb-6">Servicios Especializados</h4>
                <ul className="space-y-3">
                  {currentIndustry.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Call to Action con Estilo Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center relative"
        >
          {/* Fondo con efecto glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5 rounded-3xl backdrop-blur-sm max-w-4xl mx-auto"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/10 to-green-700/20 rounded-3xl max-w-4xl mx-auto"></div>
          
          {/* Contenido principal */}
          <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 max-w-4xl mx-auto">
            {/* Efectos decorativos */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-green-400/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-600/5 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              <h4 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                  ¿Listo para transformar tu {currentIndustry.name.toLowerCase()}?
                </span>
              </h4>
              <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
                Obtén una estrategia personalizada para los desafíos específicos de tu industria
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-full hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              >
                Agendá tu consulta especializada
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySpecific;