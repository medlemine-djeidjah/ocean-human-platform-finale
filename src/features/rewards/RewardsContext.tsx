import React, { createContext, useContext, useReducer } from 'react';
import { Trophy, Star, Crown, Lightbulb, Award, Medal, Gift, Gem } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'badge' | 'achievement' | 'powerup';
  icon: React.ElementType;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    level?: number;
    experience?: number;
    achievements?: string[];
    challenges?: string[];
  };
}

interface RewardsState {
  availableRewards: Reward[];
  unlockedRewards: string[];
  claimedRewards: string[];
  activeRewards: string[];
}

type RewardsAction =
  | { type: 'UNLOCK_REWARD'; rewardId: string }
  | { type: 'CLAIM_REWARD'; rewardId: string }
  | { type: 'ACTIVATE_REWARD'; rewardId: string }
  | { type: 'DEACTIVATE_REWARD'; rewardId: string };

export const REWARDS: Reward[] = [
  {
    id: 'ocean_explorer',
    title: 'Ocean Explorer',
    description: 'Complete all ocean system explorations',
    type: 'badge',
    icon: Trophy,
    rarity: 'epic',
    requirements: {
      achievements: ['explore_all_systems'],
    },
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Score 90% or higher on all quizzes',
    type: 'achievement',
    icon: Star,
    rarity: 'legendary',
    requirements: {
      level: 5,
    },
  },
  {
    id: 'master_explorer',
    title: 'Master Explorer',
    description: 'Discover all hidden connections',
    type: 'badge',
    icon: Crown,
    rarity: 'legendary',
    requirements: {
      level: 10,
    },
  },
  {
    id: 'insight_finder',
    title: 'Insight Finder',
    description: 'Find 5 unique parallels',
    type: 'achievement',
    icon: Lightbulb,
    rarity: 'rare',
    requirements: {
      achievements: ['find_parallels'],
    },
  },
  {
    id: 'ocean_guardian',
    title: 'Ocean Guardian',
    description: 'Complete the conservation challenge',
    type: 'badge',
    icon: Award,
    rarity: 'epic',
    requirements: {
      challenges: ['conservation'],
    },
  },
];

const initialState: RewardsState = {
  availableRewards: REWARDS,
  unlockedRewards: [],
  claimedRewards: [],
  activeRewards: [],
};

const rewardsReducer = (state: RewardsState, action: RewardsAction): RewardsState => {
  switch (action.type) {
    case 'UNLOCK_REWARD':
      if (state.unlockedRewards.includes(action.rewardId)) {
        return state;
      }
      return {
        ...state,
        unlockedRewards: [...state.unlockedRewards, action.rewardId],
      };

    case 'CLAIM_REWARD':
      if (state.claimedRewards.includes(action.rewardId)) {
        return state;
      }
      return {
        ...state,
        claimedRewards: [...state.claimedRewards, action.rewardId],
      };

    case 'ACTIVATE_REWARD':
      if (state.activeRewards.includes(action.rewardId)) {
        return state;
      }
      return {
        ...state,
        activeRewards: [...state.activeRewards, action.rewardId],
      };

    case 'DEACTIVATE_REWARD':
      return {
        ...state,
        activeRewards: state.activeRewards.filter(id => id !== action.rewardId),
      };

    default:
      return state;
  }
};

const RewardsContext = createContext<{
  state: RewardsState;
  dispatch: React.Dispatch<RewardsAction>;
  checkRewardEligibility: (reward: Reward, userState: any) => boolean;
} | null>(null);

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rewardsReducer, initialState);

  const checkRewardEligibility = (reward: Reward, userState: any): boolean => {
    const { requirements } = reward;

    if (requirements.level && userState.level < requirements.level) {
      return false;
    }

    if (requirements.experience && userState.experience < requirements.experience) {
      return false;
    }

    if (requirements.achievements) {
      const hasAllAchievements = requirements.achievements.every(
        achievement => userState.achievements.includes(achievement)
      );
      if (!hasAllAchievements) {
        return false;
      }
    }

    if (requirements.challenges) {
      const hasAllChallenges = requirements.challenges.every(
        challenge => userState.completedChallenges.includes(challenge)
      );
      if (!hasAllChallenges) {
        return false;
      }
    }

    return true;
  };

  return (
    <RewardsContext.Provider value={{ state, dispatch, checkRewardEligibility }}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};