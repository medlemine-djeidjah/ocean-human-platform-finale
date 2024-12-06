import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, Check } from 'lucide-react';
import type { Reward } from '../../features/rewards/RewardsContext';

interface RewardNotificationProps {
  reward: Reward;
  onClose: () => void;
  onClaim?: () => void;
}

export const RewardNotification: React.FC<RewardNotificationProps> = ({
  reward,
  onClose,
  onClaim
}) => {
  const Icon = reward.icon;

  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * 320,
              y: Math.random() * 200,
              scale: 0
            }}
            animate={{
              y: [null, -20],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative p-4">
        <div className="flex items-start gap-4">
          {/* Icon container with glow effect */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-75 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 
                          flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <h4 className="text-lg font-bold text-gray-900">New Reward!</h4>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {reward.name}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {reward.description}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700"
          >
            Later
          </motion.button>
          
          {onClaim && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onClaim();
                onClose();
              }}
              className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r 
                        from-blue-500 to-cyan-500 rounded-full flex items-center gap-1"
            >
              <Check className="w-4 h-4" />
              Claim
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 8, ease: 'linear' }}
        className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500"
      />
    </motion.div>
  );
};

export default RewardNotification;