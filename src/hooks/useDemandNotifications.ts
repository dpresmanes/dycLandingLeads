import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: 'consultation' | 'viewing' | 'download' | 'success';
  message: string;
  location: string;
  timeAgo: string;
}

// Constants for notifications
const ANIMATION_DURATIONS = {
  NOTIFICATION_DISPLAY: 4000,
  INITIAL_DELAY: 3000,
  NOTIFICATION_INTERVAL_MIN: 8000,
  NOTIFICATION_INTERVAL_RANDOM: 4000,
} as const;

const PROBABILITIES = {
  NOTIFICATION_SHOW: 0.7, // 70% chance
} as const;

// Static notifications data
const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'consultation',
    message: 'María de Buenos Aires agendó una consulta',
    location: 'Buenos Aires',
    timeAgo: 'hace 2 min'
  },
  {
    id: 2,
    type: 'viewing',
    message: 'Carlos está viendo los casos de éxito',
    location: 'Córdoba',
    timeAgo: 'hace 1 min'
  },
  {
    id: 3,
    type: 'download',
    message: 'Ana descargó la guía de automatizaciones',
    location: 'Rosario',
    timeAgo: 'hace 3 min'
  },
  {
    id: 4,
    type: 'success',
    message: 'Roberto aumentó sus ventas 280% con nosotros',
    location: 'Mendoza',
    timeAgo: 'hace 5 min'
  },
  {
    id: 5,
    type: 'consultation',
    message: 'Laura de Montevideo agendó una consulta',
    location: 'Montevideo',
    timeAgo: 'hace 4 min'
  },
  {
    id: 6,
    type: 'viewing',
    message: 'Diego está revisando nuestros servicios',
    location: 'Santiago',
    timeAgo: 'hace 2 min'
  }
];

/**
 * Hook personalizado para manejar las notificaciones de demanda social
 * @returns {Notification | null} currentNotification - La notificación actual a mostrar
 */
export const useDemandNotifications = (): Notification | null => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      setCurrentNotification(randomNotification);
      
      setTimeout(() => {
        setCurrentNotification(null);
      }, ANIMATION_DURATIONS.NOTIFICATION_DISPLAY);
    };

    // Mostrar primera notificación después del delay inicial
    const initialTimer = setTimeout(showNotification, ANIMATION_DURATIONS.INITIAL_DELAY);
    
    // Luego mostrar notificaciones en intervalos aleatorios
    const interval = setInterval(() => {
      if (Math.random() > (1 - PROBABILITIES.NOTIFICATION_SHOW)) {
        showNotification();
      }
    }, Math.random() * ANIMATION_DURATIONS.NOTIFICATION_INTERVAL_RANDOM + ANIMATION_DURATIONS.NOTIFICATION_INTERVAL_MIN);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return currentNotification;
};

export type { Notification };