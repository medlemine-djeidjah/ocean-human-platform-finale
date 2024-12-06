import { motion } from "framer-motion";
import { Achievement } from "../../features/progress/types";

// src/components/progress/AchievementNotification.tsx
export const AchievementNotification: React.FC<{
    achievement: Achievement;
    onClose: () => void;
  }> = ({ achievement, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed bottom-8 right-8 bg-white bg-opacity-90 backdrop-blur-lg
                   rounded-lg shadow-lg p-4 w-80"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
            {/* Replace with actual icon component */}
            <span className="text-2xl">{achievement.icon}</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-blue-900">Achievement Unlocked!</h4>
            <p className="text-sm text-blue-800">{achievement.title}</p>
            <p className="text-xs text-blue-600 mt-1">{achievement.description}</p>
          </div>
        </div>
      </motion.div>
    );
  };
  