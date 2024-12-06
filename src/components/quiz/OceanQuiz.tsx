// src/components/quiz/OceanQuiz.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Award, Heart, Waves, Wind } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'How does ocean health directly impact human respiratory health?',
    options: [
      'Through production of atmospheric oxygen by marine phytoplankton',
      'By regulating air temperature only',
      'Through wave motion',
      'Only through seaside recreation'
    ],
    correctAnswer: 0,
    explanation: 'Marine phytoplankton produce about 50-80% of Earth\'s oxygen, directly affecting the air we breathe. This makes ocean health crucial for human respiratory function.'
  },
  {
    id: 'q2',
    question: 'Which ocean-based nutrient is essential for human cardiovascular health?',
    options: [
      'Sand particles',
      'Omega-3 fatty acids from marine life',
      'Salt water',
      'Seaweed cellulose'
    ],
    correctAnswer: 1,
    explanation: 'Omega-3 fatty acids, found abundantly in marine life, are essential for heart health and reducing inflammation in the human body.'
  },
  {
    id: 'q3',
    question: 'How do ocean temperatures affect human health in coastal communities?',
    options: [
      'Only through recreational activities',
      'By influencing local weather patterns and disease vectors',
      'Through visual effects only',
      'No significant impact'
    ],
    correctAnswer: 1,
    explanation: 'Ocean temperatures influence local climate, humidity, and the spread of various diseases, directly impacting human health in coastal regions.'
  },
  {
    id: 'q4',
    question: 'What role do healthy coral reefs play in human medicine?',
    options: [
      'No medical applications',
      'Only as tourist attractions',
      'Source of compounds for new medications',
      'Only for water filtration'
    ],
    correctAnswer: 2,
    explanation: 'Coral reefs are rich sources of bioactive compounds used in developing new medications, including treatments for cancer, arthritis, and bacterial infections.'
  },
  {
    id: 'q5',
    question: 'How does ocean pollution affect human endocrine health?',
    options: [
      'It has no effect on hormones',
      'Through microplastics and chemical disruption of hormone systems',
      'Only through visual stress',
      'Through temperature changes only'
    ],
    correctAnswer: 1,
    explanation: 'Ocean pollutants, especially microplastics and industrial chemicals, can act as endocrine disruptors, affecting human hormone systems through the food chain.'
  }
];

export const OceanQuiz: React.FC<{
  onComplete: (score: number) => void;
}> = ({ onComplete }) => {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    answers: {} as Record<string, number>,
    score: 0,
    completed: false
  });

  const currentQuestion = QUIZ_QUESTIONS[quizState.currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answerIndex
      },
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setQuizState(prev => ({ ...prev, completed: true }));
      onComplete(quizState.score);
    }
  };

  if (quizState.completed) {
    return null;
  }

  const getQuestionIcon = (index: number) => {
    switch (index) {
      case 0: return <Heart className="w-6 h-6 text-white" />;
      case 1: return <Waves className="w-6 h-6 text-white" />;
      case 2: return <Wind className="w-6 h-6 text-white" />;
      default: return <Heart className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <QuizProgress 
        currentQuestion={quizState.currentQuestionIndex + 1}
        totalQuestions={QUIZ_QUESTIONS.length}
        score={quizState.score}
      />
      
      <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          {getQuestionIcon(quizState.currentQuestionIndex)}
          <h2 className="text-xl font-bold text-white">{currentQuestion.question}</h2>
        </div>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              isSelected={quizState.answers[currentQuestion.id] === index}
              isCorrect={index === currentQuestion.correctAnswer}
              isRevealed={currentQuestion.id in quizState.answers}
              onClick={() => {
                if (!(currentQuestion.id in quizState.answers)) {
                  handleAnswer(index);
                }
              }}
            />
          ))}
        </div>

        <AnimatePresence>
          {currentQuestion.id in quizState.answers && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6"
            >
              <p className="text-sm text-white mb-4">{currentQuestion.explanation}</p>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 
                         text-white rounded-lg transition-colors"
              >
                {quizState.currentQuestionIndex + 1 < QUIZ_QUESTIONS.length ? (
                  <>Next Question <ArrowRight size={16} /></>
                ) : (
                  <>Complete Quiz <Check size={16} /></>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const QuizOption: React.FC<{
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onClick: () => void;
}> = ({ option, isSelected, isCorrect, isRevealed, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        w-full p-4 rounded-lg text-left transition-colors text-white
        ${!isRevealed 
          ? 'hover:bg-white/20 bg-white/10' 
          : isCorrect
            ? 'bg-green-500/20 border-2 border-green-500'
            : isSelected
              ? 'bg-red-500/20 border-2 border-red-500'
              : 'bg-white/10'
        }
      `}
      whileHover={!isRevealed ? { scale: 1.02 } : {}}
      whileTap={!isRevealed ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center justify-between">
        <span>{option}</span>
        {isRevealed && (
          <span className="ml-2">
            {isCorrect ? (
              <Check className="text-green-500" />
            ) : isSelected ? (
              <X className="text-red-500" />
            ) : null}
          </span>
        )}
      </div>
    </motion.button>
  );
};

const QuizProgress: React.FC<{
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}> = ({ currentQuestion, totalQuestions, score }) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-white">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>Score: {score}/{totalQuestions}</span>
      </div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white/50"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default OceanQuiz;