import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useLeadCaptureContext();
  
  const handleConsultaClick = () => {
    openModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for navbar height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Servicios', id: 'services' },
    { label: 'Proceso', id: 'process' },
    { label: 'Nosotros', id: 'about' },
    { label: 'Contacto', id: 'contact' }
  ];

  return (
    <>
      <motion.nav
         initial={{ y: -100 }}
         animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/98 backdrop-blur-xl' 
            : 'bg-black/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
               whileHover={{ scale: 1.05 }}
               className="text-lg sm:text-xl md:text-2xl font-bold font-orbitron text-[#00FF88] cursor-pointer z-[60] relative"
               onClick={() => scrollToSection('hero')}
             >
               D&C
             </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <motion.button
                   key={item.id}
                   whileHover={{ scale: 1.05 }}
                   onClick={() => scrollToSection(item.id)}
                   className="text-white hover:text-[#00FF88] transition-colors duration-300 font-inter text-sm lg:text-base whitespace-nowrap"
                 >
                   {item.label}
                 </motion.button>
              ))}
              
              {/* CTA Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(0, 255, 136, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsultaClick}
                className="bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black px-4 lg:px-5 py-2 lg:py-2.5 rounded-full font-bold font-inter text-sm lg:text-base hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all duration-300 flex items-center justify-center gap-2 min-h-[40px] lg:min-h-[44px] whitespace-nowrap"
              >
                <Zap size={16} className="lg:w-[18px] lg:h-[18px]" />
                <span>Empezar</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white z-[60] relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
         {isMobileMenuOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-40 md:hidden"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" />
             <div className="relative flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8 px-6">
               {navItems.map((item, index) => (
                 <motion.button
                   key={item.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   onClick={() => scrollToSection(item.id)}
                   className="text-white hover:text-[#00FF88] transition-colors duration-300 text-xl sm:text-2xl font-inter touch-manipulation min-h-[48px] flex items-center"
                 >
                   {item.label}
                 </motion.button>
               ))}
               
               {/* Mobile CTA Button */}
               <motion.button
                 whileHover={{ 
                   scale: 1.02,
                   boxShadow: "0 0 30px rgba(0, 255, 136, 0.6)"
                 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => {
                   handleConsultaClick();
                   setIsMobileMenuOpen(false);
                 }}
                 className="w-full max-w-xs bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black px-6 py-3 sm:py-4 rounded-full font-bold font-inter text-base sm:text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] transition-all duration-300 flex items-center justify-center gap-3 mt-6 min-h-[52px] sm:min-h-[56px]"
               >
                 <Zap size={18} className="sm:w-5 sm:h-5" />
                 <span className="whitespace-nowrap">Empezar Ahora</span>
               </motion.button>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
    </>
  );
};

export default Navbar;