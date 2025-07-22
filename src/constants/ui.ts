/**
 * Constantes de UI para el componente DemandIndicators
 * Centraliza colores, duraciones y configuraciones de interfaz
 */

// Colores de la interfaz
export const UI_COLORS = {
  PRIMARY_GREEN: '#00FF88',
  BACKGROUND_OVERLAY: 'rgba(17, 24, 39, 0.8)', // gray-900/80
  BORDER_COLOR: 'rgba(75, 85, 99, 0.2)', // gray-600/20
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#CCCCCC',
  TEXT_MUTED: '#888888',
  SEPARATOR: 'rgba(51, 51, 51, 0.5)', // #333333/50
} as const;

// Índices Z para capas
export const Z_INDEX = {
  NOTIFICATION: 50,
  STATS_DESKTOP: 40,
  STATS_MOBILE: 40,
} as const;

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  NOTIFICATION_ENTRANCE: {
    initial: { opacity: 0, x: -100, scale: 0.8 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.8 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  STATS_DESKTOP: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 1 }
  },
  STATS_MOBILE: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 1.2 }
  }
} as const;

// Tamaños de iconos
export const ICON_SIZES = {
  NOTIFICATION: 16,
  STATS_DESKTOP: 14,
  STATS_MOBILE: 12,
  PULSE_INDICATOR: {
    DESKTOP: { width: 8, height: 8 }, // w-2 h-2
    MOBILE: { width: 6, height: 6 }   // w-1.5 h-1.5
  }
} as const;

// Clases CSS reutilizables
export const CSS_CLASSES = {
  CARD_BASE: 'bg-gray-900/80 backdrop-blur-sm border border-gray-600/20 rounded-lg',
  TEXT_PRIMARY: 'text-white font-medium font-inter',
  TEXT_SECONDARY: 'text-[#CCCCCC] font-inter',
  TEXT_MUTED: 'text-[#888888] font-inter',
  PULSE_INDICATOR: 'bg-[#00FF88] rounded-full animate-pulse',
  SEPARATOR: 'bg-[#333333]/50'
} as const;