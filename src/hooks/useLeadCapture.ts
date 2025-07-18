import { useState, useEffect } from 'react';
import { submitToGoogleSheets, isValidEmail, isValidPhone, sanitizeInput } from '../utils/googleSheets';

interface LeadData {
  nombre: string;
  empresa: string;
  celular: string;
  email: string;
}

interface UseLeadCaptureReturn {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  leadData: LeadData;
  setLeadData: (data: Partial<LeadData>) => void;
  isSubmitting: boolean;
  submitLead: () => Promise<boolean>;
  errors: Partial<LeadData>;
  hasShownModal: boolean;
}

export const useLeadCapture = (): UseLeadCaptureReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [leadData, setLeadDataState] = useState<LeadData>({
    nombre: '',
    empresa: '',
    celular: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<LeadData>>({});

  // Auto-trigger modal with improved UX - respects user dismissal
  useEffect(() => {
    if (hasShownModal) return;

    const triggers = {
      timeOnPage: () => {
        setTimeout(() => {
          if (!hasShownModal) {
            openModal();
          }
        }, 45000); // 45 seconds - longer delay for better UX
      },
      
      scrollIntent: () => {
        const handleScroll = () => {
          const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (scrollPercent > 80 && !hasShownModal) {
            openModal();
            window.removeEventListener('scroll', handleScroll);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      },

      exitIntent: () => {
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0 && !hasShownModal) {
            openModal();
          }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Activate triggers
    triggers.timeOnPage();
    const cleanupScroll = triggers.scrollIntent();
    const cleanupExit = triggers.exitIntent();

    return () => {
      cleanupScroll?.();
      cleanupExit?.();
    };
  }, [hasShownModal]);

  const openModal = () => {
    console.log('openModal called - setting modal open to true');
    setIsModalOpen(true);
    setHasShownModal(true);
    console.log('Modal state should now be:', true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    // Keep hasShownModal as true to prevent auto-triggers after user dismissal
    // Modal can still be opened manually via CTA buttons
  };

  const setLeadData = (data: Partial<LeadData>) => {
    setLeadDataState(prev => ({ ...prev, ...data }));
    // Clear errors for updated fields
    const updatedErrors = { ...errors };
    Object.keys(data).forEach(key => {
      delete updatedErrors[key as keyof LeadData];
    });
    setErrors(updatedErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadData> = {};

    if (!leadData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!leadData.empresa.trim()) {
      newErrors.empresa = 'La empresa es requerida';
    }

    if (!leadData.celular.trim()) {
      newErrors.celular = 'El celular es requerido';
    } else if (!isValidPhone(leadData.celular)) {
      newErrors.celular = 'Formato de celular inválido';
    }

    if (!leadData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(leadData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitLead = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // Sanitize input data
      const sanitizedData = {
        nombre: sanitizeInput(leadData.nombre),
        empresa: sanitizeInput(leadData.empresa),
        celular: sanitizeInput(leadData.celular),
        email: sanitizeInput(leadData.email)
      };

      // Submit to Google Sheets
      const success = await submitToGoogleSheets(sanitizedData);

      if (success) {
        // Reset form
        setLeadDataState({
          nombre: '',
          empresa: '',
          celular: '',
          email: ''
        });
        return true;
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    leadData,
    setLeadData,
    isSubmitting,
    submitLead,
    errors,
    hasShownModal
  };
};