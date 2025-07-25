import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useDemandNotifications } from '../hooks/useDemandNotifications';
import { useLiveStats } from '../hooks/useLiveStats';
import { NotificationIcon } from './NotificationIcon';
import { UI_COLORS, Z_INDEX, ANIMATION_CONFIG, CSS_CLASSES, ICON_SIZES } from '../constants/ui';

const DemandIndicators: React.FC = () => {
  // Usar hooks personalizados para separar la lógica
  const currentNotification = useDemandNotifications();
  const { onlineUsers, consultationsToday } = useLiveStats();

  return (
    <>
      {/* Social Proof Notification */}
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            {...ANIMATION_CONFIG.NOTIFICATION_ENTRANCE}
            className={`fixed bottom-6 left-6 z-${Z_INDEX.NOTIFICATION} max-w-sm`}
          >
            <div className={`${CSS_CLASSES.CARD_BASE} p-4`}>
              <div className="flex items-start space-x-3">
                <div className="mt-1">
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
                    <span className={`${CSS_CLASSES.TEXT_MUTED} text-xs`}>
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
        className={`fixed top-20 right-6 z-${Z_INDEX.STATS_DESKTOP} hidden lg:block`}
      >
        <div className={`${CSS_CLASSES.CARD_BASE} p-4 min-w-[200px]`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className={CSS_CLASSES.PULSE_INDICATOR}
                  style={{
                    width: ICON_SIZES.PULSE_INDICATOR.DESKTOP.width,
                    height: ICON_SIZES.PULSE_INDICATOR.DESKTOP.height
                  }}
                />
                <span className={`${CSS_CLASSES.TEXT_PRIMARY} text-sm`}>En línea</span>
              </div>
              <span className="font-bold text-sm font-inter" style={{ color: UI_COLORS.PRIMARY_GREEN }}>
                {onlineUsers}
              </span>
            </div>
            
            <div className={`h-px ${CSS_CLASSES.SEPARATOR}`} />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle 
                  size={ICON_SIZES.STATS_DESKTOP} 
                  style={{ color: UI_COLORS.PRIMARY_GREEN }} 
                />
                <span className={`${CSS_CLASSES.TEXT_PRIMARY} text-sm`}>Hoy</span>
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
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-${Z_INDEX.STATS_MOBILE} lg:hidden`}
      >
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-600/20 rounded-full px-4 py-2">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div 
                className={CSS_CLASSES.PULSE_INDICATOR}
                style={{
                  width: ICON_SIZES.PULSE_INDICATOR.MOBILE.width,
                  height: ICON_SIZES.PULSE_INDICATOR.MOBILE.height
                }}
              />
              <span className={`${CSS_CLASSES.TEXT_PRIMARY}`}>{onlineUsers}</span>
            </div>
            <div className={`w-px h-4 ${CSS_CLASSES.SEPARATOR}`} />
            <div className="flex items-center space-x-1">
              <MessageCircle 
                size={ICON_SIZES.STATS_MOBILE} 
                style={{ color: UI_COLORS.PRIMARY_GREEN }} 
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