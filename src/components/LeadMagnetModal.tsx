import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, Mail, Phone, CheckCircle, Download } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useLeadMagnetCapture } from '../hooks/useLeadMagnetCapture';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose }) => {
  const { leadData, setLeadData, isSubmitting, submitLeadMagnet, errors } = useLeadMagnetCapture();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = useCallback(() => {
    setShowSuccess(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitLeadMagnet();
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        window.open('/path-to-your-guide.pdf', '_blank');
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="relative w-full max-w-lg rounded-md bg-white p-6 shadow-xl" initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}>
            <button aria-label="Cerrar" className="absolute right-3 top-3 text-gray-500 hover:text-gray-700" onClick={handleClose}>
              <X size={20} />
            </button>

            <div className="mb-4 flex items-center gap-2">
              <Download className="text-blue-600" />
              <h2 className="text-xl font-semibold">Descarga tu guía</h2>
            </div>

            {showSuccess ? (
              <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-green-700">
                <CheckCircle />
                <span>¡Listo! Preparando la descarga…</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <input
                    className="w-full rounded border p-2"
                    type="text"
                    placeholder="Nombre"
                    value={leadData.nombre}
                    onChange={(e) => setLeadData({ nombre: e.target.value })}
                  />
                </div>
                {errors.nombre && <p className="text-sm text-red-600">{errors.nombre}</p>}

                <div className="flex items-center gap-2">
                  <Building2 size={18} />
                  <input
                    className="w-full rounded border p-2"
                    type="text"
                    placeholder="Empresa"
                    value={leadData.empresa}
                    onChange={(e) => setLeadData({ empresa: e.target.value })}
                  />
                </div>
                {errors.empresa && <p className="text-sm text-red-600">{errors.empresa}</p>}

                <div className="flex items-center gap-2">
                  <Phone size={18} />
                  <input
                    className="w-full rounded border p-2"
                    type="tel"
                    placeholder="Celular"
                    value={leadData.celular}
                    onChange={(e) => setLeadData({ celular: e.target.value })}
                  />
                </div>
                {errors.celular && <p className="text-sm text-red-600">{errors.celular}</p>}

                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <input
                    className="w-full rounded border p-2"
                    type="email"
                    placeholder="Email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ email: e.target.value })}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

                <button type="submit" disabled={isSubmitting} className="mt-2 w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50">
                  {isSubmitting ? 'Enviando…' : 'Descargar Guía'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetModal;