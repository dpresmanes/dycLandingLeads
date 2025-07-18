import React, { createContext, useContext, ReactNode } from 'react';
import { useLeadCapture } from '../hooks/useLeadCapture';

interface LeadCaptureContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  leadData: {
    nombre: string;
    empresa: string;
    celular: string;
    email: string;
  };
  setLeadData: (data: Partial<{
    nombre: string;
    empresa: string;
    celular: string;
    email: string;
  }>) => void;
  isSubmitting: boolean;
  submitLead: () => Promise<boolean>;
  errors: Partial<{
    nombre: string;
    empresa: string;
    celular: string;
    email: string;
  }>;
  hasShownModal: boolean;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined);

export const LeadCaptureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const leadCaptureData = useLeadCapture();

  return (
    <LeadCaptureContext.Provider value={leadCaptureData}>
      {children}
    </LeadCaptureContext.Provider>
  );
};

export const useLeadCaptureContext = () => {
  const context = useContext(LeadCaptureContext);
  if (context === undefined) {
    throw new Error('useLeadCaptureContext must be used within a LeadCaptureProvider');
  }
  return context;
};