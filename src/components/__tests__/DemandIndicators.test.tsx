import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import DemandIndicators from '../DemandIndicators';

// Mock framer-motion
interface MockMotionProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: MockMotionProps) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: MockMotionProps) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock custom hooks
vi.mock('../../hooks/useDemandNotifications', () => ({
  useDemandNotifications: vi.fn(),
}));

vi.mock('../../hooks/useLiveStats', () => ({
  useLiveStats: vi.fn(),
}));

// Mock LeadCaptureContext para evitar error de Provider
vi.mock('../../contexts/LeadCaptureContext', () => ({
  useLeadCaptureContext: vi.fn().mockReturnValue({ isModalOpen: false }),
}));

import { useDemandNotifications } from '../../hooks/useDemandNotifications';
import { useLiveStats } from '../../hooks/useLiveStats';

const mockUseDemandNotifications = vi.mocked(useDemandNotifications);
const mockUseLiveStats = vi.mocked(useLiveStats);

describe('DemandIndicators', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Default mock implementations
    mockUseLiveStats.mockReturnValue({
      onlineUsers: 127,
      consultationsToday: 23,
    });
    
    mockUseDemandNotifications.mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza las estadísticas en vivo correctamente', () => {
    render(<DemandIndicators />);
    
    // Verificar que se muestran los usuarios en línea (pueden aparecer múltiples veces por responsive design)
    expect(screen.getAllByText('127')).toHaveLength(2); // Desktop y mobile
    expect(screen.getByText('En línea')).toBeInTheDocument(); // Solo en desktop
    
    // Verificar que se muestran las consultas de hoy
    expect(screen.getAllByText('23')).toHaveLength(2); // Desktop y mobile
    expect(screen.getByText('Hoy')).toBeInTheDocument(); // Solo en desktop
  });

  it('aplica las clases CSS responsivas correctamente', () => {
    const { container } = render(<DemandIndicators />);
    
    // Verificar que hay elementos con clases de desktop (stats desktop)
    const desktopStats = container.querySelector('.fixed.right-6.lg\\:block');
    expect(desktopStats).toBeInTheDocument();
    
    // Verificar que hay elementos con clases responsive (mobile stats)
    const mobileStats = container.querySelector('.lg\\:hidden');
    expect(mobileStats).toBeInTheDocument();
  });

  it('renderiza correctamente cuando hay una notificación', () => {
    // Mock con notificación
    mockUseDemandNotifications.mockReturnValue({
      id: 1,
      type: 'consultation',
      message: 'Test notification',
      location: 'Test location',
      timeAgo: 'hace 1 min'
    });
    
    const { container } = render(<DemandIndicators />);
    
    // La notificación solo se muestra cuando no hay modal abierto
    // y en desktop: el wrapper usa `hidden md:block`, así que verifiquemos contenido
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    expect(screen.getByText('Test location')).toBeInTheDocument();
    expect(screen.getByText('hace 1 min')).toBeInTheDocument();

    // El contenedor de notificación existe
    const notif = container.querySelector('[aria-label="Actividad reciente"]');
    expect(notif).toBeInTheDocument();
  });

  it('maneja correctamente cuando no hay notificación', () => {
    // Mock sin notificación
    mockUseDemandNotifications.mockReturnValue(null);
    
    render(<DemandIndicators />);
    
    // Verificar que las estadísticas siguen mostrándose
    expect(screen.getAllByText('127')).toHaveLength(2); // Desktop y mobile
    expect(screen.getByText('En línea')).toBeInTheDocument(); // Solo en desktop
  });

  it('usa los hooks personalizados correctamente', () => {
    render(<DemandIndicators />);
    
    // Verificar que los hooks se llaman
    expect(mockUseDemandNotifications).toHaveBeenCalled();
    expect(mockUseLiveStats).toHaveBeenCalled();
  });
});