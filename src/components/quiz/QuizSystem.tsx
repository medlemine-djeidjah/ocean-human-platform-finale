// src/components/quiz/QuizSystem.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Award, 
  ArrowRight,
  Brain,
  BookOpen,
  Flag
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useProgress } from '../../features/progress/ProgressContext';

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  image?: string;
}

interface QuizProps {
  chapterId: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const QuizSystem: React.FC<QuizProps> = ({ chapterId, questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const { dispatch } = useProgress();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answer: string | null) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points);
      dispatch({ type: 'ADD_POINTS', points: currentQuestion.points });
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        const finalScore = ((score + (answer === currentQuestion.correctAnswer ? currentQuestion.points : 0)) / 
                          (questions.reduce((acc, q) => acc + q.points, 0))) * 100;
        dispatch({ type: 'SET_QUIZ_SCORE', chapterId, score: finalScore });
        onComplete(finalScore);
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatsCard 
          icon={Brain} 
          label="Questions" 
          value={`${currentQuestionIndex + 1}/${questions.length}`}
          color="blue"
        />
        <StatsCard 
          icon={Award} 
          label="Score" 
          value={score.toString()}
          color="yellow"
        />
        <StatsCard 
          icon={Flag} 
          label="Progress" 
          value={`${Math.round(progress)}%`}
          color="green"
        />
      </div>

      <Card className="relative overflow-hidden backdrop-blur-lg border-white/10">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-8">
          {/* Timer */}
          <div className="flex justify-end mb-6">
            <motion.div 
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                ${timeLeft <= 10 ? 'bg-red-500/20 text-black' : 'bg-blue-500/20 text-black'}
              `}
              animate={{ 
                scale: timeLeft <= 5 ? [1, 1.1, 1] : 1,
                backgroundColor: timeLeft <= 10 ? '#ef444420' : '#3b82f620'
              }}
              transition={{ repeat: timeLeft <= 5 ? Infinity : 0, duration: 0.5 }}
            >
              <Timer size={20} />
              <span className="font-mono font-bold">{timeLeft}s</span>
            </motion.div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h3 
                  className="text-sm text-black font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Question {currentQuestionIndex + 1}
                </motion.h3>
                <h2 className="text-2xl md:text-3xl font-bold text-black leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={option}
                    onClick={() => !showResult && handleAnswer(option)}
                    disabled={showResult}
                    className={`
                      relative p-6 rounded-xl text-left transition-all
                      group hover:ring-2 hover:ring-white/20
                      ${showResult
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-500/20 ring-2 ring-green-500'
                          : option === selectedAnswer
                          ? 'bg-red-500/20 ring-2 ring-red-500'
                          : 'bg-white/5'
                        : 'bg-white/5 hover:bg-white/10'
                      }
                    `}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${showResult
                          ? option === currentQuestion.correctAnswer
                            ? 'bg-green-500'
                            : option === selectedAnswer
                            ? 'bg-red-500'
                            : 'bg-white/10'
                          : 'bg-white/10 group-hover:bg-white/20'
                        }
                      `}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg text-black">{option}</span>
                    </div>

                    <AnimatePresence>
                      {showResult && (option === currentQuestion.correctAnswer || option === selectedAnswer) && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {option === currentQuestion.correctAnswer ? (
                            <CheckCircle2 className="text-green-400" size={24} />
                          ) : (
                            <XCircle className="text-red-400" size={24} />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/10 pt-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <BookOpen size={24} className="text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-2">Explanation</h3>
                        <p className="text-black leading-relaxed">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-end"
            >
              {currentQuestionIndex + 1 < questions.length ? (
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setTimeLeft(30);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500
                           rounded-full font-semibold text-black hover:opacity-90 transition-opacity"
                >
                  Next Question
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={() => onComplete(score)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500
                           rounded-full font-semibold text-black hover:opacity-90 transition-opacity"
                >
                  Complete Quiz
                  <CheckCircle2 size={20} />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};

const StatsCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'blue' | 'yellow' | 'green';
}> = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 text-black',
    yellow: 'from-yellow-500/20 to-yellow-600/20 text-black',
    green: 'from-green-500/20 to-green-600/20 text-black'
  };

  return (
    <Card className={`p-4 bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm border-white/10`}>
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <div>
          <p className="text-sm font-medium text-black">{label}</p>
          <p className="text-xl font-bold text-black">{value}</p>
        </div>
      </div>
    </Card>
  );
};