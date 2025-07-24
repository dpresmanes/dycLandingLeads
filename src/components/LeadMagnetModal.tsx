import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, Mail, Phone, CheckCircle, Download } from 'lucide-react';
import { useState } from 'react';
import { useLeadMagnetCapture } from '../hooks/useLeadMagnetCapture';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose }) => {
  const {
    leadData,
    setLeadData,
    isSubmitting,
    submitLeadMagnet,
    errors
  } = useLeadMagnetCapture();
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitLeadMagnet();
    
    if (success) {
      setShowSuccess(true);
      // Auto close after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Trigger download here - you can add actual download logic
        window.open('/path-to-your-guide.pdf', '_blank');
      }, 2000);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 border border-green-500/20 shadow-2xl shadow-green-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-1"
            >
              <X size={20} />
            </button>

            {!showSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="text-green-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Descarga tu <span className="text-green-400">Guía Gratuita</span>
                  </h2>
                  <p className="text-gray-300 text-sm">
                    10 Automatizaciones que te ahorran 20 horas semanales
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Tu nombre completo"
                        value={leadData.nombre}
                        onChange={(e) => setLeadData({ nombre: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.nombre 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-gray-600 focus:border-green-500 focus:ring-green-500/50'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="text-red-400 text-xs mt-1 ml-1">{errors.nombre}</p>
                    )}
                  </div>

                  {/* Empresa */}
                  <div>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Nombre de tu empresa"
                        value={leadData.empresa}
                        onChange={(e) => setLeadData({ empresa: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.empresa 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-gray-600 focus:border-green-500 focus:ring-green-500/50'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.empresa && (
                      <p className="text-red-400 text-xs mt-1 ml-1">{errors.empresa}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={leadData.email}
                        onChange={(e) => setLeadData({ email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-gray-600 focus:border-green-500 focus:ring-green-500/50'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Celular */}
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        placeholder="+54 9 11 1234-5678"
                        value={leadData.celular}
                        onChange={(e) => setLeadData({ celular: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.celular 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-gray-600 focus:border-green-500 focus:ring-green-500/50'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.celular && (
                      <p className="text-red-400 text-xs mt-1 ml-1">{errors.celular}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:from-green-400 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download size={18} />
                        <span>Descargar Guía GRATIS</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-xs">
                    🔒 Descarga inmediata • Sin spam • Valor: $297
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Perfecto!</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Tu guía se está descargando automáticamente.
                </p>
                <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetModal;