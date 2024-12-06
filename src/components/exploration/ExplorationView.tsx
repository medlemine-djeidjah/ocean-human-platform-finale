import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FixedHumanModel from '../visualization/HumanBodyModel';
import { motion, AnimatePresence } from 'framer-motion';

export const ExplorationView: React.FC<{
  currentChapter: string;
  viewMode?: 'human' | 'ocean' | 'explore';
}> = () => {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSystemSelect = (systemId: string) => {
    setActiveSystem(systemId === activeSystem ? null : systemId);
  };

  const handleLearnMore = (systemId: string) => {
    navigate(`/comparison/${systemId}`);
  };

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] relative">
      <FixedHumanModel
        activeSystem={activeSystem}
        onSystemSelect={handleSystemSelect}
        onLearnMore={handleLearnMore}
      />
      
      <AnimatePresence>
        {!activeSystem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <p className="text-sm text-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              Click on any system to explore
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExplorationView;