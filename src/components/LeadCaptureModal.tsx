import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Building2, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const LeadCaptureModal = () => {
  const {
    isModalOpen,
    closeModal,
    leadData,
    setLeadData,
    isSubmitting,
    submitLead,
    errors
  } = useLeadCaptureContext();
  

  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitLead();
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        closeModal();
      }, 2000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setLeadData({ [field]: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };


  
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md mx-auto bg-gray-900/95 backdrop-blur-xl border border-[#00FF88]/30 rounded-2xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00FF88]/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#00FF88]/5 rounded-full blur-xl" />
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
            >
              <X size={20} />
            </motion.button>

            {/* Success State */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900/95 backdrop-blur-xl rounded-2xl z-20"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF88]/20 border border-[#00FF88]/50 rounded-full mb-4"
                    >
                      <CheckCircle className="text-[#00FF88]" size={32} />
                    </motion.div>
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                      ¡Gracias!
                    </h3>
                    <p className="text-gray-300 font-inter">
                      Te contactaremos pronto
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="text-center mb-6 relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-2"
              >
                ¿Listo para <span className="text-[#00FF88]">crecer</span>?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 font-inter text-sm md:text-base"
              >
                Solo necesitamos 4 datos para contactarte en menos de 2 horas
              </motion.p>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4 relative z-10"
            >
              {/* Nombre */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00FF88] z-10" size={18} />
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={leadData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border ${
                      errors.nombre ? 'border-red-500' : 'border-[#00FF88]/30'
                    } rounded-xl text-white placeholder-gray-400 font-inter focus:outline-none focus:border-[#00FF88] transition-colors duration-200`}
                  />
                </div>
                {errors.nombre && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-inter"
                  >
                    {errors.nombre}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00FF88] z-10" size={18} />
                  <input
                    type="email"
                    placeholder="Tu email"
                    value={leadData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border ${
                      errors.email ? 'border-red-500' : 'border-[#00FF88]/30'
                    } rounded-xl text-white placeholder-gray-400 font-inter focus:outline-none focus:border-[#00FF88] transition-colors duration-200`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-inter"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Celular */}
              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00FF88] z-10" size={18} />
                  <input
                    type="tel"
                    placeholder="Tu celular (+54 9 11 1234-5678)"
                    value={leadData.celular}
                    onChange={(e) => handleInputChange('celular', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border ${
                      errors.celular ? 'border-red-500' : 'border-[#00FF88]/30'
                    } rounded-xl text-white placeholder-gray-400 font-inter focus:outline-none focus:border-[#00FF88] transition-colors duration-200`}
                  />
                </div>
                {errors.celular && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-inter"
                  >
                    {errors.celular}
                  </motion.p>
                )}
              </div>

              {/* Mensaje/Objetivo */}
              <div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 text-[#00FF88] z-10" size={18} />
                  <textarea
                    placeholder="¿Cuál es tu principal objetivo? (ej: aumentar ventas, automatizar procesos, mejorar ROI...)"
                    value={leadData.empresa}
                    onChange={(e) => handleInputChange('empresa', e.target.value)}
                    rows={3}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-800/50 border ${
                      errors.empresa ? 'border-red-500' : 'border-[#00FF88]/30'
                    } rounded-xl text-white placeholder-gray-400 font-inter focus:outline-none focus:border-[#00FF88] transition-colors duration-200 resize-none`}
                  />
                </div>
                {errors.empresa && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-inter"
                  >
                    {errors.empresa}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black py-3 px-6 rounded-xl font-bold font-inter text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-h-[48px]"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Enviar información</span>
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-400 text-xs font-inter mt-4 relative z-10"
            >
              🔒 Tus datos están seguros. No enviamos spam.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;