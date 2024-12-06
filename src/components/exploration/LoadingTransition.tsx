// src/components/exploration/LoadingTransition.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingTransitionProps {
  isLoading: boolean;
  progress: number;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  isLoading,
  progress
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`
        absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-950
        flex flex-col items-center justify-center
        transition-opacity duration-500
        ${isLoading ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      <div className="relative w-32 h-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <Loader2 className="w-full h-full text-blue-400" />
        </motion.div>
      </div>

      <div className="mt-8 w-64">
        <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-2 text-center text-blue-400 text-sm">
          Loading Models... {Math.round(progress)}%
        </div>
      </div>
    </motion.div>
  );
};

// src/components/exploration/TransitionEffect.tsx
interface TransitionEffectProps {
  isTransitioning: boolean;
  onTransitionComplete: () => void;
}

export const TransitionEffect: React.FC<TransitionEffectProps> = ({
  isTransitioning,
  onTransitionComplete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isTransitioning ? 1 : 0,
        transition: { duration: 0.5 }
      }}
      onAnimationComplete={() => {
        if (!isTransitioning) {
          onTransitionComplete();
        }
      }}
      className="absolute inset-0 pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ 
          scale: isTransitioning ? [0, 1.5, 0] : 0,
          transition: { 
            duration: 1.5,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          }
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400 to-cyan-400
                   opacity-30 blur-2xl"
      />
      
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: 0, 
            y: 0,
            scale: 0
          }}
          animate={{ 
            x: Math.random() * 1000 - 500,
            y: Math.random() * 1000 - 500,
            scale: isTransitioning ? [0, 1, 0] : 0,
            transition: { 
              duration: 1 + Math.random(),
              delay: Math.random() * 0.5,
              ease: "easeOut"
            }
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-400"
        />
      ))}
    </motion.div>
  );
};

// src/components/exploration/ModelTransition.tsx
interface ModelTransitionProps {
  currentModel: string;
  previousModel: string | null;
  onTransitionComplete: () => void;
}

export const ModelTransition: React.FC<ModelTransitionProps> = ({
  currentModel,
  previousModel,
  onTransitionComplete
}) => {
  return (
    <AnimatePresence mode="wait">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
          exit={{ 
            scale: 1.2, 
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: "easeIn"
            }
          }}
          onAnimationComplete={() => {
            if (currentModel !== previousModel) {
              onTransitionComplete();
            }
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {/* Transition Effects */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              transition: {
                duration: 1.5,
                times: [0, 0.5, 1],
                ease: "easeInOut"
              }
            }}
          />

          {/* Ripple Effect */}
          <motion.div
            className="absolute w-full h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2],
              opacity: [0, 1, 0],
              transition: {
                duration: 1.2,
                times: [0, 0.5, 1],
                ease: "easeInOut"
              }
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-blue-400 opacity-50" />
          </motion.div>

          {/* Model Label */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       bg-white bg-opacity-10 backdrop-blur-md rounded-lg px-6 py-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.2
              }
            }}
          >
            <h3 className="text-xl font-bold text-white">
              {currentModel.charAt(0).toUpperCase() + currentModel.slice(1)}
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export { LoadingTransition, TransitionEffect, ModelTransition };