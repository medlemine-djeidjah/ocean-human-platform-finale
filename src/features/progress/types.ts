export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    condition: {
      type: 'chapters_completed' | 'connections_found' | 'quiz_score' | 'time_spent';
      value: number;
    };
    reward?: {
      type: 'unlock_chapter' | 'badge' | 'points';
      value: string | number;
    };
  }
  
  export interface Progress {
    completedChapters: string[];
    foundConnections: Record<string, string[]>;
    quizScores: Record<string, number>;
    achievements: string[];
    totalPoints: number;
    timeSpent: number;
  }