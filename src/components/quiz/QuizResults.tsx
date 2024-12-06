import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onContinue: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  onContinue,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="w-24 h-24 mx-auto mb-4 rounded-full bg-yellow-400 flex items-center justify-center"
          >
            <Trophy size={48} className="text-blue-900" />
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-lg text-blue-200">
            You scored {score} out of {totalQuestions} questions correctly
          </p>
        </div>

        <div className="mb-8">
          <div className="relative h-4 bg-blue-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute h-full bg-yellow-400"
            />
          </div>
          <p className="mt-2 text-2xl font-bold">{percentage}%</p>
        </div>

        <div className="space-y-4">
          {percentage >= 80 && (
            <p className="text-green-400">Excellent work! You've mastered this chapter!</p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-blue-400">Good job! You're getting there!</p>
          )}
          {percentage < 60 && (
            <p className="text-yellow-400">Keep practicing! You'll improve!</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-8 px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold 
                   flex items-center gap-2 mx-auto"
        >
          Continue <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
};