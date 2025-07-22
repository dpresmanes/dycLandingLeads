import { useState } from 'react';
import { submitToGoogleSheets } from '../utils/googleSheets';
import { isValidEmail } from '../utils/googleSheets';

interface ROICalculatorData {
  nombre: string;
  empresa: string;
  email: string;
  celular: string;
  empleados: string;
  horasSemanales: string;
  costoHora: string;
  roiCalculado: string;
}

interface ValidationErrors {
  nombre?: string;
  empresa?: string;
  email?: string;
  celular?: string;
  empleados?: string;
  horasSemanales?: string;
  costoHora?: string;
}

export const useROICalculatorCapture = () => {
  const [calculatorData, setCalculatorData] = useState<ROICalculatorData>({
    nombre: '',
    empresa: '',
    email: '',
    celular: '',
    empleados: '',
    horasSemanales: '',
    costoHora: '',
    roiCalculado: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateCalculatorData = (updates: Partial<ROICalculatorData>) => {
    setCalculatorData(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => {
        delete newErrors[field as keyof ValidationErrors];
      });
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate nombre
    if (!calculatorData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (calculatorData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validate empresa
    if (!calculatorData.empresa.trim()) {
      newErrors.empresa = 'El nombre de la empresa es requerido';
    }

    // Validate email
    if (!calculatorData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(calculatorData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    // Validate celular
    if (!calculatorData.celular.trim()) {
      newErrors.celular = 'El número de celular es requerido';
    } else if (calculatorData.celular.length < 8) {
      newErrors.celular = 'El número debe tener al menos 8 dígitos';
    }

    // Validate empleados
    if (!calculatorData.empleados.trim()) {
      newErrors.empleados = 'El número de empleados es requerido';
    }

    // Validate horas semanales
    if (!calculatorData.horasSemanales.trim()) {
      newErrors.horasSemanales = 'Las horas semanales son requeridas';
    }

    // Validate costo por hora
    if (!calculatorData.costoHora.trim()) {
      newErrors.costoHora = 'El costo por hora es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>"'&]/g, '');
  };

  const submitROICalculator = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // Sanitize input data with ROI Calculator segmentation
      const sanitizedData = {
        nombre: sanitizeInput(calculatorData.nombre),
        empresa: sanitizeInput(calculatorData.empresa),
        celular: sanitizeInput(calculatorData.celular),
        email: sanitizeInput(calculatorData.email),
        // Additional ROI Calculator specific data
        empleados: sanitizeInput(calculatorData.empleados),
        horasSemanales: sanitizeInput(calculatorData.horasSemanales),
        costoHora: sanitizeInput(calculatorData.costoHora),
        roiCalculado: calculatorData.roiCalculado,
        // ROI Calculator segmentation
        source: 'Calculadora ROI',
        leadType: 'ROI_CALCULATOR',
        campaign: 'ROI_Calculator_Lead',
        ctaLocation: 'ROI_Calculator_Form',
        pageUrl: window.location.href,
        leadQuality: 'HIGH', // ROI calculator leads are typically high quality
        expectedAction: 'DEMO_REQUEST'
      };

      // Submit to Google Sheets
      const success = await submitToGoogleSheets(sanitizedData);
      
      if (success) {
        // Reset form on success
        setCalculatorData({
          nombre: '',
          empresa: '',
          email: '',
          celular: '',
          empleados: '',
          horasSemanales: '',
          costoHora: '',
          roiCalculado: ''
        });
        setErrors({});
      }
      
      return success;
    } catch (error) {
      console.error('Error submitting ROI calculator data:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    calculatorData,
    updateCalculatorData,
    isSubmitting,
    submitROICalculator,
    errors
  };
};