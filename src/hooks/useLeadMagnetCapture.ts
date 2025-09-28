import { useState } from 'react';
import { submitToGoogleSheets, isValidEmail, sanitizeInput, LeadSubmission } from '../utils/googleSheets';
import { trackEvent } from '../utils/analytics';

interface LeadMagnetData {
  nombre: string;
  empresa: string;
  email: string;
  celular: string;
}

interface UseLeadMagnetCaptureReturn {
  leadData: LeadMagnetData;
  setLeadData: (data: Partial<LeadMagnetData>) => void;
  isSubmitting: boolean;
  submitLeadMagnet: () => Promise<boolean>;
  errors: Partial<LeadMagnetData>;
  resetForm: () => void;
}

export const useLeadMagnetCapture = (): UseLeadMagnetCaptureReturn => {
  const [leadData, setLeadDataState] = useState<LeadMagnetData>({
    nombre: '',
    empresa: '',
    email: '',
    celular: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<LeadMagnetData>>({});

  const setLeadData = (data: Partial<LeadMagnetData>) => {
    setLeadDataState(prev => ({ ...prev, ...data }));
    // Clear errors for updated fields
    const updatedErrors = { ...errors };
    Object.keys(data).forEach(key => {
      delete updatedErrors[key as keyof LeadMagnetData];
    });
    setErrors(updatedErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadMagnetData> = {};

    if (!leadData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!leadData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(leadData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!leadData.empresa.trim()) {
      newErrors.empresa = 'El nombre de la empresa es requerido';
    }

    if (!leadData.celular.trim()) {
      newErrors.celular = 'El número de celular es requerido';
    } else if (leadData.celular.length < 8) {
      newErrors.celular = 'El número debe tener al menos 8 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setLeadDataState({
      nombre: '',
      empresa: '',
      email: '',
      celular: ''
    });
    setErrors({});
  };

  const submitLeadMagnet = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // Sanitize input data
      const sanitizedData: LeadSubmission = {
        nombre: sanitizeInput(leadData.nombre),
        empresa: sanitizeInput(leadData.empresa),
        celular: sanitizeInput(leadData.celular),
        email: sanitizeInput(leadData.email),
        // Lead Magnet specific segmentation
        source: 'Lead Magnet - Guía Automatizaciones',
        leadType: 'LEAD_MAGNET',
        campaign: 'Descarga_Guia_Automatizaciones',
        ctaLocation: 'LeadMagnet_Section',
        pageUrl: window.location.href,
        leadQuality: 'HIGH', // Lead magnets typically indicate higher intent
        expectedAction: 'DOWNLOAD_GUIDE'
      };

      // Submit to Google Sheets with lead magnet segmentation
      const success = await submitToGoogleSheets(sanitizedData);

      if (success) {
        trackEvent('lead_magnet_submit', { status: 'success' });
        resetForm();
        return true;
      } else {
        trackEvent('lead_magnet_submit', { status: 'error' });
        throw new Error('Error al enviar el formulario');
      }
    } catch {
      trackEvent('lead_magnet_submit', { status: 'error' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    leadData,
    setLeadData,
    isSubmitting,
    submitLeadMagnet,
    errors,
    resetForm
  };
};