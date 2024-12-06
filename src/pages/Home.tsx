// src/components/Home.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Waves, Heart, Globe2 } from 'lucide-react';
import VisualizationCore from '../components/visualization/VisualizationCore';
import OceanQuiz from '../components/quiz/OceanQuiz';

const Home: React.FC = () => {
  const [stage, setStage] = useState<'welcome' | 'quiz' | 'completion' | 'exploration'>('welcome');
  const [quizScore, setQuizScore] = useState<number>(0);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setStage('completion');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="container mx-auto py-8">
        <AnimatePresence mode="wait">
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-2xl mx-auto py-16"
            >
              <Compass className="w-24 h-24 mx-auto mb-8 text-blue-400" />
              <h1 className="text-5xl font-bold mb-6">
                Ocean & Human Body Systems
              </h1>
              <p className="text-xl text-blue-200 mb-8">
                Discover the fascinating connections between ocean systems and human biology.
                Begin with a short quiz to explore the unique relationship between the Pacific Ocean and Mauritania.
              </p>
              <motion.button
                onClick={() => setStage('quiz')}
                className="px-8 py-4 bg-blue-500 text-white rounded-xl text-xl font-bold
                         hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          )}

          {stage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <OceanQuiz onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {stage === 'completion' && (
            <motion.div
              key="completion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl mx-auto py-16"
            >
              <div className="flex justify-center gap-8 mb-8">
                {[Heart, Waves, Globe2].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Icon className="w-16 h-16 text-blue-400" />
                  </motion.div>
                ))}
              </div>

              <h2 className="text-4xl font-bold mb-6">
                Welcome to Our Interactive Exploration
              </h2>

              <div className="space-y-6 text-lg text-blue-200">
                <p>
                  Great job on completing the quiz! You've already begun to understand how
                  interconnected our world's systems are - from the Pacific Ocean's influence
                  on Mauritania to the broader parallels between ocean and human body systems.
                </p>
                <p>
                  Now, let's dive deeper into these fascinating connections. You'll discover
                  how the human body's intricate systems mirror the ocean's complex networks,
                  and how understanding these parallels can help us better protect both.
                </p>
              </div>

              <motion.button
                onClick={() => setStage('exploration')}
                className="mt-8 px-8 py-4 bg-blue-500 text-white rounded-xl text-xl font-bold
                         hover:bg-blue-600 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Exploration
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          )}

          {stage === 'exploration' && (
            <motion.div
              key="exploration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <VisualizationCore />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;