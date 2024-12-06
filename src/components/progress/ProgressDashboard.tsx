// src/components/progress/ProgressDashboard.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Target, Book, Brain, Star, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useProgress } from '../../features/progress/ProgressContext';

export const ProgressDashboard: React.FC = () => {
  const { progress } = useProgress();
  const [prevProgress, setPrevProgress] = useState(progress);
  const [changes, setChanges] = useState<Record<string, number>>({});

  useEffect(() => {
    // Calculate changes when progress updates
    const newChanges: Record<string, number> = {
      chapters: progress.completedChapters.length - prevProgress.completedChapters.length,
      connections: 
        Object.values(progress.foundConnections).flat().length - 
        Object.values(prevProgress.foundConnections).flat().length,
      points: progress.totalPoints - prevProgress.totalPoints,
      achievements: progress.achievements.length - prevProgress.achievements.length,
    };

    setChanges(newChanges);
    setPrevProgress(progress);
  }, [progress]);

  const stats = [
    {
      icon: Book,
      label: 'Chapters Completed',
      value: progress.completedChapters.length,
      change: changes.chapters,
      color: 'from-blue-500 to-blue-600',
      gradient: 'from-blue-50 to-blue-100',
    },
    {
      icon: Brain,
      label: 'Connections Found',
      value: Object.values(progress.foundConnections).flat().length,
      change: changes.connections,
      color: 'from-purple-500 to-purple-600',
      gradient: 'from-purple-50 to-purple-100',
    },
    {
      icon: Target,
      label: 'Quiz Score Average',
      value: `${calculateAverageScore(progress.quizScores) ?? 0}%`,
      color: 'from-green-500 to-green-600',
      gradient: 'from-green-50 to-green-100',
    },
    {
      icon: Trophy,
      label: 'Achievements',
      value: progress.achievements.length,
      change: changes.achievements,
      color: 'from-yellow-500 to-yellow-600',
      gradient: 'from-yellow-50 to-yellow-100',
    },
    {
      icon: Star,
      label: 'Total Points',
      value: progress.totalPoints,
      change: changes.points,
      color: 'from-red-500 to-red-600',
      gradient: 'from-red-50 to-red-100',
    },
    {
      icon: Clock,
      label: 'Time Spent',
      value: formatTime(progress.timeSpent),
      color: 'from-teal-500 to-teal-600',
      gradient: 'from-teal-50 to-teal-100',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Your Progress</h1>
        <motion.div 
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full
                     text-white font-medium flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Award size={20} />
          <span>Level {Math.floor(progress.totalPoints / 1000) + 1}</span>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progress.achievements.slice(-4).map((achievement, index) => (
            <AchievementCard key={achievement} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`p-6 bg-gradient-to-br ${stat.gradient} border-none shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
            <Icon size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.change && stat.change > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 text-green-600 text-sm font-medium"
                >
                  <TrendingUp size={14} />
                  <span>+{stat.change}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
    >
      <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600">
            <Trophy size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{achievement}</h3>
            <p className="text-sm text-gray-600">Achievement Unlocked!</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Helper functions
const calculateAverageScore = (scores: Record<string, number>): number => {
  const scoreValues = Object.values(scores);
  if (scoreValues.length === 0) return 0;
  return Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);
};

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

interface StatCardProps {
  stat: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    change?: number;
    color: string;
    gradient: string;
  };
  index: number;
}

interface AchievementCardProps {
  achievement: string;
  index: number;
}