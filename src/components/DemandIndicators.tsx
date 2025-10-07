import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useDemandNotifications } from '../hooks/useDemandNotifications';
import { useLiveStats } from '../hooks/useLiveStats';
import { NotificationIcon } from './NotificationIcon';
import { UI_COLORS, ANIMATION_CONFIG, CSS_CLASSES, ICON_SIZES } from '../constants/ui';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

const DemandIndicators: React.FC = () => {
  // Usar hooks personalizados para separar la lógica
  const currentNotification = useDemandNotifications();
  const { onlineUsers, consultationsToday } = useLiveStats();
  const { isModalOpen } = useLeadCaptureContext();

  // Permitir al usuario cerrar notificación para que no moleste
  const [notifDismissed, setNotifDismissed] = useState<boolean>(() => {
    return sessionStorage.getItem('demandNotifDismissed') === 'true';
  });

  useEffect(() => {
    if (notifDismissed) sessionStorage.setItem('demandNotifDismissed', 'true');
  }, [notifDismissed]);

  const shouldShowNotif = !!currentNotification && !notifDismissed && !isModalOpen;

  return (
    <>
      {/* Social Proof Notification (solo desktop, esquina inferior izquierda, no tapa navegación) */}
      <AnimatePresence>
        {shouldShowNotif && (
          <motion.div
            {...ANIMATION_CONFIG.NOTIFICATION_ENTRANCE}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={`fixed left-6 max-w-sm z-50 bottom-[calc(84px+var(--sab)+1.5rem)] lg:bottom-6 hidden md:block`}
          >
            <div className={`${CSS_CLASSES.CARD_BASE} p-4 relative`}
                 aria-label="Actividad reciente">
              <button
                type="button"
                aria-label="Cerrar notificación"
                onClick={() => setNotifDismissed(true)}
                className="absolute -top-2 -right-2 bg-gray-800/80 text-gray-400 hover:text-white border border-gray-700/30 rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/60"
              >
                <X size={14} aria-hidden="true" />
              </button>
              <div className="flex items-start space-x-3">
                <div className="mt-1" aria-hidden="true">
                  <NotificationIcon type={currentNotification.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`${CSS_CLASSES.TEXT_PRIMARY} text-sm leading-tight`}>
                    {currentNotification.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`${CSS_CLASSES.TEXT_SECONDARY} text-xs`}>
                      {currentNotification.location}
                    </span>
                    <span className={`${CSS_CLASSES.TEXT_MUTED} text-xs`} aria-hidden="true">
                      •
                    </span>
                    <span className={`${CSS_CLASSES.TEXT_MUTED} text-xs`}>
                      {currentNotification.timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Stats Bar */}
      <motion.div
        {...ANIMATION_CONFIG.STATS_DESKTOP}
        role="region"
        aria-label="Estadísticas en tiempo real"
        className={`fixed lg:top-6 right-6 z-30 hidden lg:block`}
      >
        <div className={`${CSS_CLASSES.CARD_BASE} p-3 min-w-[160px]`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between" role="group" aria-label="Usuarios en línea">
              <div className="flex items-center space-x-2">
                <div 
                  className={CSS_CLASSES.PULSE_INDICATOR}
                  style={{
                    width: ICON_SIZES.PULSE_INDICATOR.DESKTOP.width,
                    height: ICON_SIZES.PULSE_INDICATOR.DESKTOP.height
                  }}
                  aria-hidden="true"
                />
                <span className={`${CSS_CLASSES.TEXT_PRIMARY} text-xs`}>En línea</span>
              </div>
              <span className="font-bold text-sm font-inter" style={{ color: UI_COLORS.PRIMARY_GREEN }}>
                {onlineUsers}
              </span>
            </div>
            
            <div className={`h-px ${CSS_CLASSES.SEPARATOR}`} aria-hidden="true" />
            
            <div className="flex items-center justify-between" role="group" aria-label="Consultas hoy">
              <div className="flex items-center space-x-2">
                <MessageCircle 
                  size={ICON_SIZES.STATS_DESKTOP} 
                  style={{ color: UI_COLORS.PRIMARY_GREEN }} 
                  aria-hidden="true"
                />
                <span className={`${CSS_CLASSES.TEXT_PRIMARY} text-xs`}>Hoy</span>
              </div>
              <span className="font-bold text-sm font-inter" style={{ color: UI_COLORS.PRIMARY_GREEN }}>
                {consultationsToday}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Stats */}
      <motion.div
        {...ANIMATION_CONFIG.STATS_MOBILE}
        role="region"
        aria-label="Estadísticas en tiempo real"
        className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-40 lg:hidden`}
      >
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-600/20 rounded-full px-4 py-2">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1" role="group" aria-label="Usuarios en línea">
              <div 
                className={CSS_CLASSES.PULSE_INDICATOR}
                style={{
                  width: ICON_SIZES.PULSE_INDICATOR.MOBILE.width,
                  height: ICON_SIZES.PULSE_INDICATOR.MOBILE.height
                }}
                aria-hidden="true"
              />
              <span className={`${CSS_CLASSES.TEXT_PRIMARY}`}>{onlineUsers}</span>
            </div>
            <div className={`w-px h-4 ${CSS_CLASSES.SEPARATOR}`} aria-hidden="true" />
            <div className="flex items-center space-x-1" role="group" aria-label="Consultas hoy">
              <MessageCircle 
                size={ICON_SIZES.STATS_MOBILE} 
                style={{ color: UI_COLORS.PRIMARY_GREEN }} 
                aria-hidden="true"
              />
              <span className={`${CSS_CLASSES.TEXT_PRIMARY}`}>{consultationsToday}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DemandIndicators;