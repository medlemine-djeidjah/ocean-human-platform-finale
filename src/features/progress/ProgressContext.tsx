import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Progress } from './types';

type ProgressAction =
  | { type: 'COMPLETE_CHAPTER'; chapterId: string }
  | { type: 'FIND_CONNECTION'; chapterId: string; connectionId: string }
  | { type: 'SET_QUIZ_SCORE'; chapterId: string; score: number }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'ADD_POINTS'; points: number }
  | { type: 'UPDATE_TIME'; time: number };

const progressReducer = (state: Progress, action: ProgressAction): Progress => {
  switch (action.type) {
    case 'COMPLETE_CHAPTER':
      return {
        ...state,
        completedChapters: [...new Set([...state.completedChapters, action.chapterId])]
      };
    case 'FIND_CONNECTION':
      return {
        ...state,
        foundConnections: {
          ...state.foundConnections,
          [action.chapterId]: [
            ...(state.foundConnections[action.chapterId] || []),
            action.connectionId
          ]
        }
      };
    case 'SET_QUIZ_SCORE':
      return {
        ...state,
        quizScores: {
          ...state.quizScores,
          [action.chapterId]: Math.max(
            state.quizScores[action.chapterId] || 0,
            action.score
          )
        }
      };
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...new Set([...state.achievements, action.achievementId])]
      };
    case 'ADD_POINTS':
      return {
        ...state,
        totalPoints: state.totalPoints + action.points
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        timeSpent: action.time
      };
    default:
      return state;
  }
};

const ProgressContext = createContext<{
  progress: Progress;
  dispatch: React.Dispatch<ProgressAction>;
} | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, dispatch] = useReducer(progressReducer, {
    completedChapters: [],
    foundConnections: {},
    quizScores: {},
    achievements: [],
    totalPoints: 0,
    timeSpent: 0
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('oceanExplorerProgress', JSON.stringify(progress));
  }, [progress]);

  return (
    <ProgressContext.Provider value={{ progress, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

