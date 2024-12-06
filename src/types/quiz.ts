// src/types/quiz.ts
export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
  export interface QuizState {
    currentQuestionIndex: number;
    answers: Record<string, number>;
    score: number;
    completed: boolean;
  }
  
  export interface QuizProgress {
    totalQuestions: number;
    answeredQuestions: number;
    correctAnswers: number;
  }