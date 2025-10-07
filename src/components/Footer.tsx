import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { openModal } = useLeadCaptureContext();
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
      'Webinars'
    ],
    'Empresa': [
      'Sobre nosotros',
      'Nuestro proceso',
      'Contacto',
      'Trabaja con nosotros'
    ]
  };

  // Estados obsoletos eliminados: NewsletterForm maneja su propio estado

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  const navigateOrScroll = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  // Eliminado submit manual del newsletter: se usa NewsletterForm

  return (
    <footer role="contentinfo" className="bg-black border-t border-[#00FF88]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
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
              <p className="text-[#CCCCCC] mb-3 md:mb-4 leading-relaxed font-inter text-sm">
                Transformamos negocios con estrategias de marketing digital, 
                automatización inteligente y growth marketing sostenible.
               </p>
              
              {/* Newsletter */}
              <section aria-labelledby="newsletter-footer-heading" className="mb-6">
                <h4 id="newsletter-footer-heading" className="text-white font-semibold mb-1 font-inter text-sm">Newsletter</h4>
                <p className="text-[#CCCCCC] text-xs mb-2">Recibí novedades y recursos en tu correo.</p>
                <NewsletterForm
                  source="footer"
                  variant="compact"
                  showName={false}
                  className=""
                  buttonLabel="Suscribirme"
                />
                <div id="newsletter-footer-result" aria-live="polite" className="mt-1 text-xs text-gray-300"></div>
              </section>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-4 md:mb-6" aria-labelledby="footer-contact-heading">
                <h4 id="footer-contact-heading" className="sr-only">Información de contacto</h4>
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
              <div className="flex items-center space-x-3" aria-labelledby="footer-social-heading">
                <h4 id="footer-social-heading" className="sr-only">Redes sociales</h4>
                {[{ icon: Instagram, href: 'https://www.instagram.com/crececonads/', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/dpresmanes/', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:damianpresmanes@gmail.com', label: 'Email' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full flex items-center justify-center text-[#00FF88] hover:bg-[#00FF88]/20 hover:border-[#00FF88]/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60"
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    title={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries({
          'Servicio': footerLinks['Servicios'].slice(0, 3),
          'Recursos': ['Blog', 'Webinars'],
          'Empresa': ['Sobre nosotros', 'Contacto']
          }).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 id={`footer-${category}-heading`} className="text-white font-semibold mb-2 md:mb-3 font-inter text-sm">{category}</h4>
              <nav aria-labelledby={`footer-${category}-heading`}>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          if (link === 'Blog') {
                            navigate('/blog')
                          } else if (link === 'Sobre nosotros') navigateOrScroll('about')
                          else if (link === 'Nuestro proceso') navigateOrScroll('process')
                          else if (link === 'Contacto') navigateOrScroll('contact')
                        }}
                        role="link"
                        aria-label={`Ir a ${link}`}
                        className="text-[#CCCCCC] hover:text-white transition-colors font-inter text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 rounded"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-[#00FF88]/20 pt-5 md:pt-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-[#CCCCCC] text-xs font-inter text-center md:text-left">
              © 2024 Damián & Carolina. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-4 text-[#CCCCCC] text-xs font-inter">
              <button className="hover:text-[#00FF88] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 rounded" aria-label="Ver política de privacidad">
                Política de privacidad
              </button>
              <button className="hover:text-[#00FF88] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 rounded" aria-label="Ver términos de servicio">
                Términos de servicio
              </button>
              <button className="hover:text-[#00FF88] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60 rounded" aria-label="Ver política de cookies">
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