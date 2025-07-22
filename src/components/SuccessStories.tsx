import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Target, Zap, ArrowLeft, ArrowRight, DollarSign } from 'lucide-react';

interface SuccessStory {
  id: number;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial: string;
  timeframe: string;
  avatar: string;
  companyLogo?: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    clientName: "María González",
    industry: "E-commerce de Moda",
    challenge: "Baja conversión en su tienda online y alto costo de adquisición de clientes",
    solution: "Optimización de embudos de conversión, remarketing estratégico y automatización de email marketing",
    results: [
      {
        metric: "Tasa de Conversión",
        before: "1.2%",
        after: "4.8%",
        improvement: "+300%"
      },
      {
        metric: "Ingresos Mensuales",
        before: "$15,000",
        after: "$65,000",
        improvement: "+333%"
      },
      {
        metric: "Costo por Adquisición",
        before: "$45",
        after: "$18",
        improvement: "-60%"
      }
    ],
    testimonial: "En solo 4 meses, mis ventas se multiplicaron por 4. El equipo no solo cumplió, sino que superó todas mis expectativas. Ahora tengo un negocio escalable y rentable.",
    timeframe: "4 meses",
    avatar: "👩‍💼"
  },
  {
    id: 2,
    clientName: "Carlos Mendoza",
    industry: "Servicios Profesionales",
    challenge: "Dificultad para generar leads cualificados y dependencia de referencias",
    solution: "Estrategia de contenido B2B, LinkedIn Ads optimizado y lead magnets especializados",
    results: [
      {
        metric: "Leads Cualificados",
        before: "8/mes",
        after: "45/mes",
        improvement: "+463%"
      },
      {
        metric: "Tasa de Cierre",
        before: "15%",
        after: "35%",
        improvement: "+133%"
      },
      {
        metric: "Valor Promedio Cliente",
        before: "$2,500",
        after: "$4,200",
        improvement: "+68%"
      }
    ],
    testimonial: "Pasé de depender de referencias a tener una máquina de generar clientes. Ahora tengo lista de espera y puedo elegir con quién trabajar.",
    timeframe: "6 meses",
    avatar: "👨‍💼"
  },
  {
    id: 3,
    clientName: "Ana Rodríguez",
    industry: "Educación Online",
    challenge: "Bajo engagement en redes sociales y dificultad para monetizar su audiencia",
    solution: "Estrategia de contenido viral, webinars automatizados y embudos de venta educativos",
    results: [
      {
        metric: "Seguidores Activos",
        before: "2,500",
        after: "28,000",
        improvement: "+1020%"
      },
      {
        metric: "Ingresos por Curso",
        before: "$3,000/mes",
        after: "$35,000/mes",
        improvement: "+1067%"
      },
      {
        metric: "Engagement Rate",
        before: "2.1%",
        after: "8.7%",
        improvement: "+314%"
      }
    ],
    testimonial: "Mi audiencia creció exponencialmente y logré crear múltiples fuentes de ingresos pasivos. Ahora mi negocio funciona mientras duermo.",
    timeframe: "8 meses",
    avatar: "👩‍🏫"
  }
];

const SuccessStories: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Users className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Casos de <span className="text-green-400">Éxito Reales</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Transformaciones medibles de nuestros clientes
          </p>
        </motion.div>

        {/* Carrusel de Casos de Éxito */}
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentStory}
                 initial={{ opacity: 0, x: 300 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -300 }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
                 className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 hover:border-green-500/50 transition-all duration-300"
               >
                 <div className="grid lg:grid-cols-4 gap-6">
                   {/* Cliente Info */}
                   <div className="lg:col-span-1">
                     <div className="flex items-center mb-4">
                       <div className="text-3xl mr-3">{successStories[currentStory].avatar}</div>
                       <div>
                         <h3 className="text-lg font-bold text-white">{successStories[currentStory].clientName}</h3>
                         <p className="text-green-400 text-sm font-medium">{successStories[currentStory].industry}</p>
                       </div>
                     </div>
                     
                     <div className="mb-4">
                       <h4 className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Desafío</h4>
                       <p className="text-gray-400 text-xs leading-relaxed">{successStories[currentStory].challenge}</p>
                     </div>
                     
                     <div className="flex items-center text-xs text-green-400">
                       <Zap className="h-3 w-3 mr-1" />
                       <span>Resultados en {successStories[currentStory].timeframe}</span>
                     </div>
                   </div>

                   {/* Métricas Compactas */}
                   <div className="lg:col-span-2">
                     <h4 className="text-sm font-bold text-white mb-4 flex items-center">
                       <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                       Resultados
                     </h4>
                     
                     <div className="grid grid-cols-3 gap-3">
                       {successStories[currentStory].results.map((result, resultIndex) => (
                         <motion.div 
                           key={resultIndex}
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.3, delay: resultIndex * 0.1 }}
                           className="bg-gray-800/50 rounded-lg p-3 text-center hover:bg-gray-700/50 transition-all duration-200"
                         >
                           <p className="text-xs text-gray-300 mb-1">{result.metric}</p>
                           <div className="text-lg font-bold text-white mb-1">{result.after}</div>
                           <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                             {result.improvement}
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </div>

                   {/* Testimonial Compacto */}
                   <div className="lg:col-span-1">
                     <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-lg p-4 border border-green-500/30 h-full">
                       <div className="text-green-400 text-2xl mb-2">"</div>
                       <p className="text-gray-300 text-xs leading-relaxed italic line-clamp-4">
                         {successStories[currentStory].testimonial}
                       </p>
                     </div>
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>

           {/* Controles de Navegación */}
           <button
             onClick={prevStory}
             className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-gray-600/50 hover:border-green-500/50 z-10"
           >
             <ArrowLeft className="h-5 w-5" />
           </button>
           <button
             onClick={nextStory}
             className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-gray-600/50 hover:border-green-500/50 z-10"
           >
             <ArrowRight className="h-5 w-5" />
           </button>

           {/* Indicadores */}
           <div className="flex justify-center mt-4 space-x-2">
             {successStories.map((_, index) => (
               <button
                 key={index}
                 onClick={() => setCurrentStory(index)}
                 className={`w-3 h-3 rounded-full transition-all duration-200 ${
                   index === currentStory ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-500'
                 }`}
               />
             ))}
           </div>
         </div>

        {/* Estadísticas Generales con Diseño Integrado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 relative"
        >
          {/* Fondo con efecto glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5 rounded-3xl backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/10 to-green-700/20 rounded-3xl"></div>
          
          {/* Contenido principal */}
          <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
            {/* Efectos decorativos */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-green-400/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-600/5 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                  Resultados Promedio
                </span>
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -5 }}
                   className="text-center group relative"
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 group-hover:border-green-500/50 transition-all duration-300">
                     <div className="flex justify-center mb-3">
                       <div className="p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors duration-300">
                         <TrendingUp className="h-6 w-6 text-green-400 group-hover:text-green-300" />
                       </div>
                     </div>
                     <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">+285%</div>
                     <p className="text-gray-300 text-sm font-medium">Aumento en Ingresos</p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -5 }}
                   className="text-center group relative"
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 group-hover:border-green-500/50 transition-all duration-300">
                     <div className="flex justify-center mb-3">
                       <div className="p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors duration-300">
                         <Users className="h-6 w-6 text-green-400 group-hover:text-green-300" />
                       </div>
                     </div>
                     <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">+420%</div>
                     <p className="text-gray-300 text-sm font-medium">Más Leads</p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -5 }}
                   className="text-center group relative"
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 group-hover:border-green-500/50 transition-all duration-300">
                     <div className="flex justify-center mb-3">
                       <div className="p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors duration-300">
                         <Target className="h-6 w-6 text-green-400 group-hover:text-green-300" />
                       </div>
                     </div>
                     <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">+180%</div>
                     <p className="text-gray-300 text-sm font-medium">Conversión</p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -5 }}
                   className="text-center group relative"
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 group-hover:border-green-500/50 transition-all duration-300">
                     <div className="flex justify-center mb-3">
                       <div className="p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors duration-300">
                         <DollarSign className="h-6 w-6 text-green-400 group-hover:text-green-300" />
                       </div>
                     </div>
                     <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">-45%</div>
                     <p className="text-gray-300 text-sm font-medium">Reducción CAC</p>
                   </div>
                 </motion.div>
               </div>
               
               {/* Call to Action Integrado */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 viewport={{ once: true }}
                 className="mt-8 text-center relative"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-green-500/5 to-green-700/10 rounded-2xl blur-xl"></div>
                 <div className="relative bg-gradient-to-r from-gray-800/50 via-gray-700/30 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                   <h3 className="text-xl md:text-2xl font-bold mb-3">
                     <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                       ¿Listo para Ser el Próximo Caso de Éxito?
                     </span>
                   </h3>
                   <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                     Únete a más de 500 empresas que ya han transformado sus resultados.
                   </p>
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                   >
                     Solicitar Consulta Gratuita
                   </motion.button>
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;