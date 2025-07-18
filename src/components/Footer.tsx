import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Servicios': [
      'Meta Ads',
      'Automatización',
      'Growth Marketing',
      'Ecommerce',
      'Community Management'
    ],
    'Recursos': [
      'Blog',
      'Casos de éxito',
      'Guías gratuitas',
      'Webinars',
      'Consulta gratuita'
    ],
    'Empresa': [
      'Sobre nosotros',
      'Nuestro proceso',
      'Testimonios',
      'Contacto',
      'Trabaja con nosotros'
    ]
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5491137638307?text=Hola! Me interesa conocer más sobre sus servicios de marketing digital y automatización.', '_blank');
  };

  return (
    <footer className="bg-black border-t border-[#00FF88]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold text-[#00FF88] mb-2">
                  Damián & Carolina
                </h3>
                <p className="text-[#CCCCCC] font-inter text-sm sm:text-base">
                  Optimización • Automatización • Estrategia Digital
                </p>
              </div>
              <p className="text-[#CCCCCC] mb-4 md:mb-6 leading-relaxed font-inter text-sm sm:text-base">
                Transformamos negocios con estrategias de marketing digital, 
                automatización inteligente y growth marketing sostenible.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-4 md:mb-6">
                <div className="flex items-center space-x-2 text-[#CCCCCC] text-sm">
                  <Mail size={16} className="text-[#00FF88]" />
                  <span>damianpresmanes@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-[#CCCCCC] text-sm">
                  <Phone size={16} className="text-[#00FF88]" />
                  <span>+54 9 11 3763-8307</span>
                </div>
                <div className="flex items-center space-x-2 text-[#CCCCCC] text-sm">
                  <MapPin size={16} className="text-[#00FF88]" />
                  <span>Buenos Aires, Argentina</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/crececonads/', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/dpresmanes/', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:damianpresmanes@gmail.com', label: 'Email' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full flex items-center justify-center text-[#00FF88] hover:bg-[#00FF88]/20 hover:border-[#00FF88]/50 transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-3 md:mb-4 font-inter text-sm sm:text-base">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        if (link === 'Sobre nosotros') scrollToSection('about');
                        else if (link === 'Nuestro proceso') scrollToSection('process');
                        else if (link === 'Testimonios') scrollToSection('testimonials');
                        else if (link === 'Contacto') scrollToSection('contact');
                        else if (link === 'Consulta gratuita') handleWhatsAppClick();
                      }}
                      className="text-[#CCCCCC] hover:text-[#00FF88] transition-colors text-xs sm:text-sm font-inter text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-[#00FF88]/20 pt-6 md:pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-[#CCCCCC] text-xs sm:text-sm font-inter text-center md:text-left">
              © 2024 Damián & Carolina. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 text-[#CCCCCC] text-xs sm:text-sm font-inter">
              <button className="hover:text-[#00FF88] transition-colors">
                Política de privacidad
              </button>
              <button className="hover:text-[#00FF88] transition-colors">
                Términos de servicio
              </button>
              <button className="hover:text-[#00FF88] transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;