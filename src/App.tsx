import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Map, Heart, Wind, TreePine, Compass, 
  Trophy, BookOpen, User, Globe2, Waves, Gift 
} from 'lucide-react';
import ExplorationView from './components/exploration/ExplorationView';
import { ProgressProvider } from './features/progress/ProgressContext';
import { GamificationProvider } from './features/gamification/GamificationContext';
import { RewardsProvider } from './features/rewards/RewardsContext';
import { ComparisonSystem } from './components/comparison/ComparisonSystem';
import { QuizSystem } from './components/quiz/QuizSystem';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { RewardsPanel } from './components/rewards/RewardsPanel';
import { RewardNotification } from './components/notifications/RewardNotification';
import { ProgressBar } from './components/progress/ProgressBar';
import { chapterQuizzes } from './data/quizzes';
import OceanQuiz from './components/quiz/OceanQuiz';

type Section = 'explore' | 'learn' | 'quiz' | 'progress' | 'rewards';
type AppStage = 'intro' | 'initial-quiz' | 'welcome' | 'main';

const App: React.FC = () => {
  const [appStage, setAppStage] = useState<AppStage>('intro');
  const [currentSection, setCurrentSection] = useState<Section>('explore');
  const [currentChapter, setCurrentChapter] = useState('circulation');
  const [quizScore, setQuizScore] = useState(0);
  const [newReward, setNewReward] = useState<any>(null);

  const gradientStyles = {
    background: 'linear-gradient(180deg, #1B2B4B 0%, #0F2167 50%, #142B4B 100%)',
  };

  return (
    <GamificationProvider>
      <RewardsProvider>
        <ProgressProvider>
          <div 
            className="min-h-screen text-white relative overflow-hidden"
            style={gradientStyles}
          >
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
                  style={{
                    background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(15,33,103,0) 70%)',
                  }}
                />
              </div>
            </div>

            {/* Progress Bar - Always visible in main stage */}
            {appStage === 'main' && <ProgressBar />}

            {/* Main Content */}
            <AnimatePresence mode="wait">
              {appStage === 'intro' && (
                <IntroScreen onStart={() => setAppStage('initial-quiz')} />
              )}

              {appStage === 'initial-quiz' && (
                <motion.div
                  key="initial-quiz"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="min-h-screen flex items-center justify-center"
                >
                  <OceanQuiz 
                    onComplete={(score) => {
                      setQuizScore(score);
                      setAppStage('welcome');
                    }} 
                  />
                </motion.div>
              )}

              {appStage === 'welcome' && (
                <WelcomeScreen 
                  score={quizScore} 
                  onContinue={() => setAppStage('main')} 
                />
              )}

              {appStage === 'main' && (
                <MainInterface 
                  currentSection={currentSection} 
                  onSectionChange={setCurrentSection}
                  currentChapter={currentChapter}
                  onChapterChange={setCurrentChapter}
                />
              )}
            </AnimatePresence>

            {/* Notifications */}
            <AnimatePresence>
              {newReward && (
                <RewardNotification
                  reward={newReward}
                  onClose={() => setNewReward(null)}
                  onClaim={() => {
                    // Handle claiming logic here
                    setNewReward(null);
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </ProgressProvider>
      </RewardsProvider>
    </GamificationProvider>
  );
};

const MainInterface: React.FC<{
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  currentChapter: string;
  onChapterChange: (chapter: string) => void;
}> = ({ currentSection, onSectionChange, currentChapter, onChapterChange }) => {
  const navigationItems = [
    { id: 'explore' as Section, icon: Camera, label: 'Explore' },
    { id: 'learn' as Section, icon: BookOpen, label: 'Learn' },
    { id: 'quiz' as Section, icon: Trophy, label: 'Quiz' },
    { id: 'progress' as Section, icon: Map, label: 'Progress' },
    { id: 'rewards' as Section, icon: Gift, label: 'Rewards' }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full md:w-24 bg-[#1a365d] bg-opacity-40 backdrop-blur-md 
                 flex flex-row md:flex-col items-center justify-around md:justify-start 
                 py-4 md:py-8 gap-4 md:gap-8 border-b md:border-r border-white border-opacity-10"
      >
        {navigationItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={currentSection === item.id}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-4 md:p-8 overflow-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
            {currentSection === 'explore' && (
              <ExplorationView 
                currentChapter={currentChapter}
                onChapterChange={onChapterChange}
              />
            )}
            {currentSection === 'learn' && (
              <ComparisonSystem 
                points={[]} 
                onComplete={() => onSectionChange('quiz')}
              />
            )}
            {currentSection === 'quiz' && (
              <QuizSystem
                chapterId={currentChapter}
                questions={chapterQuizzes[currentChapter].questions}
                onComplete={(score) => {
                  onSectionChange('progress');
                }}
              />
            )}
            {currentSection === 'progress' && (
              <ProgressDashboard />
            )}
            {currentSection === 'rewards' && (
              <RewardsPanel />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const NavButton: React.FC<{
  item: { id: Section; icon: React.ElementType; label: string };
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative p-3 rounded-xl transition-all
        ${isActive 
          ? 'bg-white text-blue-900' 
          : 'text-white hover:bg-white/10'
        }
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={24} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1
                   text-[10px] font-medium"
      >
        •
      </motion.span>
    </motion.button>
  );
};

const IntroScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center max-w-2xl mx-auto p-8">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="mb-8"
        >
          <Compass className="w-24 h-24 mx-auto text-blue-400" />
        </motion.div>
        
        <h1 className="text-5xl font-bold mb-6">
          Ocean & Human Body Systems
        </h1>
        
        <p className="text-xl text-blue-200 mb-8">
          Discover the fascinating connections between ocean systems and human biology.
          Begin with a short quiz to explore the unique relationship between the Pacific Ocean and Mauritania.
        </p>
        
        <motion.button
          onClick={onStart}
          className="px-8 py-4 bg-blue-500 text-white rounded-xl text-xl font-bold
                   hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Journey
        </motion.button>
      </div>
    </motion.div>
  );
};

const WelcomeScreen: React.FC<{ score: number; onContinue: () => void }> = ({ score, onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center max-w-3xl mx-auto p-8">
        <div className="flex justify-center gap-8 mb-8">
          {[Heart, Waves, Globe2].map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Icon className="w-16 h-16 text-blue-400" />
            </motion.div>
          ))}
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Welcome to Our Interactive Exploration
        </h2>

        <div className="space-y-6 text-lg text-blue-200">
          <p>
            Great job on completing the quiz! You scored {score}% and have already begun to understand
            how interconnected our world's systems are - from the Pacific Ocean's influence
            on Mauritania to the broader parallels between ocean and human body systems.
          </p>
          <p>
            Now, let's dive deeper into these fascinating connections. You'll discover
            how the human body's intricate systems mirror the ocean's complex networks,
            and how understanding these parallels can help us better protect both.
          </p>
        </div>

        <motion.button
          onClick={onContinue}
          className="mt-8 px-8 py-4 bg-blue-500 text-white rounded-xl text-xl font-bold
                   hover:bg-blue-600 transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Exploration
          <motion.span
            className="inline-block ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default App;