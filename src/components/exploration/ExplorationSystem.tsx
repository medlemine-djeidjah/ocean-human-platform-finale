// src/components/exploration/ExplorationSystem.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Map, Heart, Wind, TreePine, Compass } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  parallels: {
    human: string;
    ocean: string;
    connection: string;
    importance: string[];
  };
  isUnlocked: boolean;
}

const chapters: Chapter[] = [
  {
    id: 'circulation',
    title: 'Circulation Systems',
    icon: Heart,
    description: 'Discover how ocean currents mirror our circulatory system',
    parallels: {
      human: 'The heart pumps blood through vessels, distributing nutrients and oxygen',
      ocean: 'Ocean currents move water globally, distributing heat and nutrients',
      connection: 'Both systems are vital for maintaining life through circulation and distribution',
      importance: [
        'Temperature regulation',
        'Nutrient distribution',
        'Waste removal',
        'Global ecosystem balance'
      ]
    },
    isUnlocked: true
  },
  {
    id: 'respiratory',
    title: 'Gas Exchange',
    icon: Wind,
    description: 'Explore how oceans breathe like our lungs',
    parallels: {
      human: 'Lungs exchange oxygen and carbon dioxide with the atmosphere',
      ocean: 'Ocean surface exchanges gases with the atmosphere, absorbing CO2',
      connection: 'Both systems regulate gas exchange essential for life',
      importance: [
        'Oxygen production',
        'Carbon dioxide regulation',
        'Air quality',
        'Climate stability'
      ]
    },
    isUnlocked: false
  },
  // Add more chapters here
];

export const ExplorationSystem: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [unlockedChapters, setUnlockedChapters] = useState(['circulation']);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      {/* Navigation */}
      <motion.div 
        className="fixed left-0 top-0 bottom-0 w-24 bg-black bg-opacity-20 backdrop-blur-lg
                   flex flex-col items-center py-8 space-y-8"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        {chapters.map((chapter) => (
          <ChapterButton
            key={chapter.id}
            chapter={chapter}
            isActive={activeChapter === chapter.id}
            isUnlocked={unlockedChapters.includes(chapter.id)}
            onClick={() => setActiveChapter(chapter.id)}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="ml-24 p-8">
        <AnimatePresence mode="wait">
          {activeChapter ? (
            <ChapterContent
              key={activeChapter}
              chapter={chapters.find(c => c.id === activeChapter)!}
            />
          ) : (
            <WelcomeScreen onStart={() => setActiveChapter('circulation')} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ChapterButton: React.FC<{
  chapter: Chapter;
  isActive: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}> = ({ chapter, isActive, isUnlocked, onClick }) => {
  const Icon = chapter.icon;
  
  return (
    <motion.button
      whileHover={{ scale: isUnlocked ? 1.1 : 1 }}
      whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
      onClick={isUnlocked ? onClick : undefined}
      className={`
        relative w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1
        transition-all duration-300
        ${isActive 
          ? 'bg-white text-blue-900' 
          : isUnlocked
            ? 'text-white hover:bg-white hover:bg-opacity-20'
            : 'text-gray-500 cursor-not-allowed'
        }
      `}
    >
      <Icon size={24} />
      <span className="text-xs font-medium">{chapter.title.split(' ')[0]}</span>
      {!isUnlocked && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-xl
                      flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-500 rounded-full" />
        </div>
      )}
    </motion.button>
  );
};

const ChapterContent: React.FC<{
  chapter: Chapter;
}> = ({ chapter }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'learn' | 'compare'>('explore');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{chapter.title}</h1>
        <p className="text-xl text-blue-200 mb-8">{chapter.description}</p>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {['explore', 'learn', 'compare'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all
                ${activeTab === tab 
                  ? 'bg-white text-blue-900' 
                  : 'bg-white bg-opacity-10 hover:bg-opacity-20'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8">
          {activeTab === 'explore' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Explore the Connection</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Human Body</h3>
                  <p className="text-blue-200">{chapter.parallels.human}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Ocean System</h3>
                  <p className="text-blue-200">{chapter.parallels.ocean}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'learn' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Why It Matters</h2>
              <div className="space-y-4">
                {chapter.parallels.importance.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-lg text-blue-200">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'compare' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">System Comparison</h2>
              <p className="text-xl text-blue-200 mb-6">{chapter.parallels.connection}</p>
              {/* Add interactive comparison content here */}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const WelcomeScreen: React.FC<{
  onStart: () => void;
}> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center text-center"
    >
      <Compass className="w-32 h-32 mb-8 text-blue-400" />
      <h1 className="text-5xl font-bold mb-6">Begin Your Journey</h1>
      <p className="text-xl text-blue-200 max-w-2xl mb-8">
        Discover the fascinating parallels between human biology and ocean systems.
        Each chapter reveals new connections and insights.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="px-8 py-4 bg-white text-blue-900 rounded-xl text-xl font-bold"
      >
        Start Exploration
      </motion.button>
    </motion.div>
  );
};

export default ExplorationSystem;