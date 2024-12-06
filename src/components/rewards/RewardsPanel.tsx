import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewards, REWARDS } from '../../features/rewards/RewardsContext';
import { useGamification } from '../../features/gamification/GamificationContext';
import { Card } from '@/components/ui/card';

export const RewardsPanel = () => {
  const { state: rewardsState, dispatch: rewardsDispatch } = useRewards();
  const { state: gameState } = useGamification();

  const categories = {
    theme: { title: 'Themes', description: 'Customize your learning experience' },
    badge: { title: 'Badges', description: 'Show off your achievements' },
    title: { title: 'Titles', description: 'Special titles you\'ve earned' },
    content: { title: 'Special Content', description: 'Exclusive ocean insights' },
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Rewards</h2>
        <p className="text-blue-200">Unlock special content and customizations</p>
      </div>

      {Object.entries(categories).map(([category, info]) => (
        <div key={category} className="space-y-4">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-1">{info.title}</h3>
            <p className="text-sm text-blue-200">{info.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REWARDS.filter(reward => reward.type === category).map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                isUnlocked={rewardsState.unlockedRewards.includes(reward.id)}
                isActive={
                  (category === 'theme' && rewardsState.selectedTheme === reward.id) ||
                  (category === 'title' && rewardsState.activeTitle === reward.id) ||
                  (category === 'badge' && rewardsState.activeBadge === reward.id)
                }
                onSelect={() => {
                  if (rewardsState.unlockedRewards.includes(reward.id)) {
                    switch (category) {
                      case 'theme':
                        rewardsDispatch({ type: 'SET_THEME', theme: reward.id });
                        break;
                      case 'title':
                        rewardsDispatch({ type: 'SET_TITLE', title: reward.id });
                        break;
                      case 'badge':
                        rewardsDispatch({ type: 'SET_BADGE', badge: reward.id });
                        break;
                    }
                  }
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const RewardCard = ({ 
  reward, 
  isUnlocked, 
  isActive, 
  onSelect 
}: { 
  reward: any;
  isUnlocked: boolean;
  isActive: boolean;
  onSelect: () => void;
}) => {
  const Icon = reward.icon;
  
  return (
    <Card 
      className={`
        relative overflow-hidden transition-all duration-300
        ${isUnlocked 
          ? 'bg-white/10 hover:bg-white/20 cursor-pointer' 
          : 'bg-white/5 cursor-not-allowed'
        }
        ${isActive ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={isUnlocked ? onSelect : undefined}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className={`
            p-3 rounded-xl
            ${isUnlocked ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-500/50'}
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div>
            <h4 className="font-semibold text-white mb-1">{reward.title}</h4>
            <p className="text-sm text-blue-200">{reward.description}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className={`
            text-xs font-medium px-2 py-1 rounded-full w-fit
            ${isUnlocked 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-gray-500/20 text-gray-400'
            }
          `}>
            {isUnlocked ? 'Unlocked' : 'Locked'}
          </div>
        </div>
      </div>

      {isActive && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
      )}
    </Card>
  );
};

export default RewardsPanel;