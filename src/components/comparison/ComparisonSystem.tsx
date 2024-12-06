import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  MinusCircle, 
  PlusCircle,
  Link2,
  Lightbulb,
  ArrowUpRight,
  Heart,
  Droplet
} from 'lucide-react';
import { COMPARISON_POINTS } from '../../data/parallels';
import { Card } from '@/components/ui/card';

interface ComparisonSystemProps {
  systemId?: string;
  onComplete?: () => void;
}

export const ComparisonSystem: React.FC<ComparisonSystemProps> = ({ 
  systemId = 'heart',
  onComplete = () => {} 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [foundConnections, setFoundConnections] = useState<string[]>([]);

  const relevantPoints = COMPARISON_POINTS.filter(point => point.id === systemId);
  
  if (relevantPoints.length === 0) {
    return (
      <Card className="flex items-center justify-center h-96 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md">
        <p className="text-lg text-black">No comparison data available for this system.</p>
      </Card>
    );
  }

  const currentPoint = relevantPoints[currentIndex];

  const handleConnectionFound = (connection: string) => {
    if (!foundConnections.includes(connection)) {
      setFoundConnections([...foundConnections, connection]);
      
      if (foundConnections.length + 1 === currentPoint.connections.length) {
        setTimeout(() => {
          if (currentIndex + 1 < relevantPoints.length) {
            setCurrentIndex(currentIndex + 1);
            setFoundConnections([]);
          } else {
            onComplete();
          }
        }, 1500);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ 
            width: `${(foundConnections.length / currentPoint.connections.length) * 100}%` 
          }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

      <div className="relative min-h-[600px] grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md overflow-hidden">
          <SystemCard
            type="human"
            system={currentPoint.humanSystem}
            showDetails={showDetails}
            onToggleDetails={() => setShowDetails(!showDetails)}
            icon={<Heart className="text-red-500" size={24} />}
          />
        </Card>

        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="text-center mb-6">
            <motion.div 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              <Link2 className="w-6 h-6 text-white" />
            </motion.div>
            <h2 className="text-xl font-semibold text-white mb-2">Core Connections</h2>
            <p className="text-sm text-white/60">Discover the links between these systems</p>
          </div>
          
          <ConnectionArea
            connections={currentPoint.connections}
            foundConnections={foundConnections}
            onConnectionFound={handleConnectionFound}
          />
        </div>

        <Card className="lg:col-span-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md overflow-hidden">
          <SystemCard
            type="ocean"
            system={currentPoint.oceanSystem}
            showDetails={showDetails}
            onToggleDetails={() => setShowDetails(!showDetails)}
            icon={<Droplet className="text-blue-500" size={24} />}
          />
        </Card>
      </div>

      <div className="flex items-center justify-between px-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Previous</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
          <span className="text-sm font-medium">{currentIndex + 1}</span>
          <span className="text-sm text-white/60">of</span>
          <span className="text-sm font-medium">{relevantPoints.length}</span>
        </div>

        <button
          onClick={() => setCurrentIndex(Math.min(relevantPoints.length - 1, currentIndex + 1))}
          disabled={currentIndex === relevantPoints.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="text-sm">Next</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const SystemCard: React.FC<{
  type: 'human' | 'ocean';
  system: ComparisonPoint['humanSystem'] | ComparisonPoint['oceanSystem'];
  showDetails: boolean;
  onToggleDetails: () => void;
  icon: React.ReactNode;
}> = ({ type, system, showDetails, onToggleDetails, icon }) => {
  return (
    <motion.div className="p-6 h-full flex flex-col" layout>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="text-xl font-semibold text-black mb-1">
              {system.title}
            </h3>
            <p className="text-sm text-black/60">
              {type === 'human' ? 'Human Biology' : 'Ocean System'}
            </p>
          </div>
        </div>
        <button
          onClick={onToggleDetails}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {showDetails ? <MinusCircle size={20} /> : <PlusCircle size={20} />}
        </button>
      </div>

      <p className="text-black/80 mb-6 flex-grow">
        {system.description}
      </p>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {system.facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 
                              group-hover:bg-gradient-to-br from-blue-500 to-cyan-500 transition-all">
                  <Lightbulb size={14} className="text-black/60 group-hover:text-white" />
                </div>
                <p className="text-sm text-black/70 group-hover:text-black transition-colors">
                  {fact}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ConnectionArea: React.FC<{
  connections: string[];
  foundConnections: string[];
  onConnectionFound: (connection: string) => void;
}> = ({ connections, foundConnections, onConnectionFound }) => {
  return (
    <div className="space-y-4">
      {connections.map((connection, index) => {
        const isFound = foundConnections.includes(connection);
        
        return (
          <motion.button
            key={index}
            className={`
              w-full px-6 py-4 rounded-xl text-sm font-medium transition-all
              ${isFound 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                : 'bg-white/5 hover:bg-white/10 text-black/60 hover:text-black'
              }
              flex items-center justify-between group
            `}
            onClick={() => onConnectionFound(connection)}
            disabled={isFound}
            whileHover={{ scale: isFound ? 1 : 1.02 }}
          >
            <span>{connection}</span>
            {!isFound && (
              <ArrowUpRight 
                size={16} 
                className="opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};