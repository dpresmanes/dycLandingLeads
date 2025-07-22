import { useState, useEffect } from 'react';

// Constants for live stats
const STATS_CONFIG = {
  UPDATE_INTERVAL: 15000, // 15 seconds
  ONLINE_USERS_MIN: 35,
  ONLINE_USERS_MAX: 65,
  INITIAL_ONLINE_USERS: 47,
  INITIAL_CONSULTATIONS: 23,
  USER_CHANGE_MIN: -2,
  USER_CHANGE_MAX: 3,
  CONSULTATION_INCREMENT_PROBABILITY: 0.3, // 30% chance
} as const;

interface LiveStats {
  onlineUsers: number;
  consultationsToday: number;
}

/**
 * Hook personalizado para manejar estadísticas en tiempo real
 * @returns {LiveStats} Objeto con usuarios en línea y consultas del día
 */
export const useLiveStats = (): LiveStats => {
  const [onlineUsers, setOnlineUsers] = useState<number>(STATS_CONFIG.INITIAL_ONLINE_USERS);
  const [consultationsToday, setConsultationsToday] = useState<number>(STATS_CONFIG.INITIAL_CONSULTATIONS);

  useEffect(() => {
    // Simular actualizaciones en tiempo real
    const interval = setInterval(() => {
      // Actualizar usuarios en línea con cambios aleatorios
      setOnlineUsers(prev => {
        const change = Math.floor(
          Math.random() * (STATS_CONFIG.USER_CHANGE_MAX - STATS_CONFIG.USER_CHANGE_MIN + 1)
        ) + STATS_CONFIG.USER_CHANGE_MIN;
        
        return Math.max(
          STATS_CONFIG.ONLINE_USERS_MIN,
          Math.min(STATS_CONFIG.ONLINE_USERS_MAX, prev + change)
        );
      });
      
      // Incrementar consultas ocasionalmente
      if (Math.random() < STATS_CONFIG.CONSULTATION_INCREMENT_PROBABILITY) {
        setConsultationsToday(prev => prev + 1);
      }
    }, STATS_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return {
    onlineUsers,
    consultationsToday
  };
};

export type { LiveStats };