import React from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '../../features/gamification/GamificationContext';

export const ProgressBar = () => {
  const { state } = useGamification();
  const { experience, level } = state;
  
  const xpForNextLevel = level * 1000;
  const xpInCurrentLevel = experience % 1000;
  const progress = (xpInCurrentLevel / xpForNextLevel) * 100;

  return (
    <div className="fixed top-4 right-4 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full p-2 pr-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm">
        {level}
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <div className="flex justify-between text-xs text-white mb-1">
          <span>Level {level}</span>
          <span>{xpInCurrentLevel} / {xpForNextLevel} XP</span>
        </div>
        
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;