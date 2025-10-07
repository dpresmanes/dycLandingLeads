import { useState, useEffect, useCallback } from 'react';
import { submitToGoogleSheets, isValidEmail, sanitizeInput } from '../utils/googleSheets';
import { trackEvent } from '@/utils/analytics';

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
  const [hasShownModal, setHasShownModal] = useState(() => {
    // Check if modal was already shown in this session
    return sessionStorage.getItem('leadModalShown') === 'true';
  });
  const [leadData, setLeadDataState] = useState<LeadData>({
    nombre: '',
    empresa: '',
    celular: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<LeadData>>({});

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    if (!hasShownModal) {
      setHasShownModal(true);
      sessionStorage.setItem('leadModalShown', 'true');
    }
    // Track modal view
    trackEvent('consultation_modal_view', { ctaLocation: 'Modal_Contact_Form' });
  }, [hasShownModal]);

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
  }, [hasShownModal, openModal]);

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    // Mark modal as shown to prevent auto-triggers after user dismissal
    if (!hasShownModal) {
      setHasShownModal(true);
      sessionStorage.setItem('leadModalShown', 'true');
    }
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

    if (!leadData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(leadData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!leadData.empresa.trim()) {
      newErrors.empresa = 'Por favor cuéntanos tu objetivo';
    }

    if (!leadData.celular.trim()) {
      newErrors.celular = 'El número de celular es requerido';
    } else if (leadData.celular.length < 8) {
      newErrors.celular = 'El número debe tener al menos 8 dígitos';
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
      // Sanitize input data with general contact segmentation
      const sanitizedData = {
        nombre: sanitizeInput(leadData.nombre),
        empresa: sanitizeInput(leadData.empresa), // Now contains the objective/message
        celular: sanitizeInput(leadData.celular),
        email: sanitizeInput(leadData.email),
        // General contact form segmentation
        source: 'Formulario Contacto General',
        leadType: 'CONTACT_FORM',
        campaign: 'Contacto_General',
        ctaLocation: 'Modal_Contact_Form',
        pageUrl: window.location.href,
        leadQuality: 'MEDIUM',
        expectedAction: 'CONTACT'
      };

      // Submit to Google Sheets
      const success = await submitToGoogleSheets(sanitizedData);

      if (success) {
        // Track success submit
        trackEvent('consultation_modal_submit', { status: 'success' });
        // Reset form
        setLeadDataState({
          nombre: '',
          empresa: '',
          celular: '',
          email: ''
        });
        return true;
      } else {
        // Track failed submit (non-throwing path)
        trackEvent('consultation_modal_submit', { status: 'error' });
        throw new Error('Error al enviar el formulario');
      }
    } catch { 
      // Track failed submit (exception path)
      trackEvent('consultation_modal_submit', { status: 'error' });
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