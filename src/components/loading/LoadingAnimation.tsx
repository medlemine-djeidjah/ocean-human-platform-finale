// src/components/loading/LoadingAnimation.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Droplets } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center">
      <div className="relative w-48 h-48">
        {/* Pulsing Circle Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full bg-blue-400/20 backdrop-blur-sm" />
        </motion.div>

        {/* Central Icon Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Heart Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 0.8, 1],
                rotateY: [0, 180, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={40} className="text-white" />
            </motion.div>

            {/* Droplets Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [0.8, 1, 0.8],
                rotateY: [180, 0, 180]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Droplets size={40} className="text-blue-400" />
            </motion.div>
          </div>
        </div>

        {/* Orbiting Dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0'
            }}
            animate={{
              rotate: [i * 45, i * 45 + 360],
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }
            }}
          />
        ))}

        {/* Loading Text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Loading</span>
            <motion.div
              animate={{
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation;