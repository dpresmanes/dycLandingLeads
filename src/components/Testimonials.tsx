import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María González',
    role: 'CEO',
    company: 'Boutique Luna',
    rating: 5,
    text: 'Damián y Carolina transformaron completamente nuestras ventas online. En 6 meses aumentamos un 300% nuestros ingresos con Meta Ads.',
    avatar: '👩‍💼'
  },
  {
    name: 'Carlos Mendoza',
    role: 'Fundador',
    company: 'TechStart Solutions',
    rating: 5,
    text: 'La automatización que implementaron nos ahorra 20 horas semanales. Ahora podemos enfocarnos en lo que realmente importa: crecer.',
    avatar: '👨‍💻'
  },
  {
    name: 'Ana Rodríguez',
    role: 'Directora de Marketing',
    company: 'Fitness Pro',
    rating: 5,
    text: 'Su estrategia de growth marketing nos ayudó a escalar de 100 a 5000 clientes en un año. Resultados medibles y sostenibles.',
    avatar: '👩‍🏋️'
  },
  {
    name: 'Roberto Silva',
    role: 'Propietario',
    company: 'Restaurante Sabores',
    rating: 5,
    text: 'El manejo de redes sociales y la estrategia de contenido aumentaron nuestras reservas un 250%. Profesionales excepcionales.',
    avatar: '👨‍🍳'
  },
  {
    name: 'Laura Martínez',
    role: 'Gerente',
    company: 'Moda Urbana',
    rating: 5,
    text: 'La planificación y gestión de nuestro ecommerce fue impecable. Triplicamos las ventas online en temporada alta.',
    avatar: '👩‍💼'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900/50 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6 md:mb-8 leading-tight">
            Casos de éxito que{' '}
            <span className="text-[#00FF88]">hablan por sí solos</span>
          </h2>
          <p className="text-sm xs:text-base md:text-lg lg:text-xl text-[#CCCCCC] max-w-4xl mx-auto font-inter leading-relaxed">
            Nuestros clientes han logrado resultados extraordinarios.<br className="hidden sm:block" />
            <span className="text-[#00FF88]">Estos son algunos de sus testimonios reales.</span>
          </p>
        </motion.div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-gray-900/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-gray-900/50 to-transparent z-10" />
          
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex space-x-4 sm:space-x-6"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-shrink-0 w-72 sm:w-80 bg-gray-900/50 backdrop-blur-xl border border-[#00FF88]/20 rounded-2xl p-4 sm:p-6 hover:border-[#00FF88]/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#00FF88] fill-current" />
                  ))}
                </div>

                <Quote className="text-[#00FF88]/60 mb-4" size={24} />

                <p className="text-[#CCCCCC] mb-6 leading-relaxed text-sm sm:text-base font-inter">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center space-x-3">
                  <div className="text-2xl sm:text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base font-inter">
                      {testimonial.name}
                    </div>
                    <div className="text-[#CCCCCC] text-xs sm:text-sm font-inter">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex items-center space-x-4 sm:space-x-6 bg-gray-900/50 backdrop-blur-xl border border-[#00FF88]/20 rounded-full px-6 sm:px-8 py-3 sm:py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#00FF88] fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold text-sm sm:text-base font-inter">5.0/5</span>
            </div>
            <div className="w-px h-4 sm:h-6 bg-[#00FF88]/30" />
            <div className="text-[#CCCCCC] text-xs sm:text-sm font-inter">
              Basado en 50+ proyectos exitosos
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;