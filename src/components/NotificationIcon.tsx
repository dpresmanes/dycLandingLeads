import React from 'react';
import { Users, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { UI_COLORS, ICON_SIZES } from '../constants/ui';
import type { Notification } from '../hooks/useDemandNotifications';

interface NotificationIconProps {
  type: Notification['type'];
  size?: number;
}

/**
 * Componente para renderizar iconos de notificaciones según el tipo
 * @param type - Tipo de notificación
 * @param size - Tamaño del icono (por defecto 16)
 */
export const NotificationIcon: React.FC<NotificationIconProps> = ({ 
  type, 
  size = ICON_SIZES.NOTIFICATION 
}) => {
  const iconProps = {
    size,
    style: { color: UI_COLORS.PRIMARY_GREEN }
  };

  switch (type) {
    case 'consultation':
      return <MessageCircle {...iconProps} />;
    case 'viewing':
      return <Eye {...iconProps} className="text-green-400" />;
    case 'download':
      return <TrendingUp {...iconProps} className="text-purple-400" />;
    case 'success':
      return <TrendingUp {...iconProps} className="text-yellow-400" />;
    default:
      return <Users {...iconProps} />;
  }
};

export default NotificationIcon;