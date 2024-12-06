import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface GamificationState {
  level: number;
  experience: number;
  streakDays: number;
  lastActivity: string | null;
  achievements: string[];
  badges: string[];
  challenges: {
    id: string;
    title: string;
    description: string;
    progress: number;
    completed: boolean;
  }[];
}

type GamificationAction =
  | { type: 'ADD_EXPERIENCE'; amount: number }
  | { type: 'COMPLETE_CHALLENGE'; challengeId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievement: string }
  | { type: 'EARN_BADGE'; badge: string }
  | { type: 'UPDATE_STREAK' };

const initialState: GamificationState = {
  level: 1,
  experience: 0,
  streakDays: 0,
  lastActivity: null,
  achievements: [],
  badges: [],
  challenges: [
    {
      id: 'first_quiz',
      title: 'Quiz Master',
      description: 'Complete your first quiz with a score of 80% or higher',
      progress: 0,
      completed: false,
    },
    {
      id: 'system_explorer',
      title: 'System Explorer',
      description: 'Discover all parallel systems between ocean and human body',
      progress: 0,
      completed: false,
    },
    {
      id: 'connection_finder',
      title: 'Connection Finder',
      description: 'Find 10 unique connections between systems',
      progress: 0,
      completed: false,
    },
  ],
};

const calculateLevel = (experience: number): number => {
  return Math.floor(experience / 1000) + 1;
};

const gamificationReducer = (state: GamificationState, action: GamificationAction): GamificationState => {
  switch (action.type) {
    case 'ADD_EXPERIENCE': {
      const newExperience = state.experience + action.amount;
      const newLevel = calculateLevel(newExperience);
      
      return {
        ...state,
        experience: newExperience,
        level: newLevel,
        lastActivity: new Date().toISOString(),
      };
    }
    
    case 'COMPLETE_CHALLENGE': {
      const updatedChallenges = state.challenges.map(challenge =>
        challenge.id === action.challengeId
          ? { ...challenge, completed: true, progress: 100 }
          : challenge
      );
      
      return {
        ...state,
        challenges: updatedChallenges,
        experience: state.experience + 500, // Bonus XP for completing challenge
      };
    }
    
    case 'UNLOCK_ACHIEVEMENT':
      if (state.achievements.includes(action.achievement)) {
        return state;
      }
      return {
        ...state,
        achievements: [...state.achievements, action.achievement],
        experience: state.experience + 200, // Bonus XP for achievement
      };
    
    case 'EARN_BADGE':
      if (state.badges.includes(action.badge)) {
        return state;
      }
      return {
        ...state,
        badges: [...state.badges, action.badge],
        experience: state.experience + 300, // Bonus XP for badge
      };
    
    case 'UPDATE_STREAK': {
      const now = new Date();
      const lastActivity = state.lastActivity ? new Date(state.lastActivity) : null;
      
      // Check if last activity was yesterday
      const isConsecutiveDay = lastActivity
        ? now.getDate() - lastActivity.getDate() === 1
        : false;
      
      return {
        ...state,
        streakDays: isConsecutiveDay ? state.streakDays + 1 : 1,
        lastActivity: now.toISOString(),
      };
    }
    
    default:
      return state;
  }
};

const GamificationContext = createContext<{
  state: GamificationState;
  dispatch: React.Dispatch<GamificationAction>;
} | null>(null);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gamificationReducer, initialState);

  // Update streak when user returns
  useEffect(() => {
    if (state.lastActivity) {
      const now = new Date();
      const lastActivity = new Date(state.lastActivity);
      
      // If last activity was yesterday, update streak
      if (now.getDate() - lastActivity.getDate() === 1) {
        dispatch({ type: 'UPDATE_STREAK' });
      }
    }
  }, [state.lastActivity]);

  return (
    <GamificationContext.Provider value={{ state, dispatch }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};