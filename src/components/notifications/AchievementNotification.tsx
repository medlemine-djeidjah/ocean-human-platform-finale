import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Achievement } from '../../features/gamification/GamificationContext';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-1" />
      
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-1">
              Achievement Unlocked!
            </h4>
            <p className="text-sm font-medium text-gray-900">
              {achievement.title}
            </p>
            <p className="text-sm text-gray-500">
              {achievement.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            Dismiss
          </motion.button>
        </div>
      </div>
      
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
        className="h-1 bg-blue-500"
      />
    </motion.div>
  );
};

export default AchievementNotification;