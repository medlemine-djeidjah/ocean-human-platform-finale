import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Droplet, Wind, Leaf, Trees, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SystemMapping = {
  circulatory: {
    human: {
      title: 'Human Circulatory System',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      points: [
        'Heart pumps blood through vessels',
        'Distributes oxygen and nutrients',
        'Removes waste products',
        'Maintains body temperature'
      ]
    },
    ocean: {
      title: 'Ocean Current System',
      icon: Droplet,
      color: 'from-blue-500 to-blue-600',
      points: [
        'Thermohaline circulation moves water',
        'Distributes heat and nutrients',
        'Transports marine life',
        'Regulates global climate'
      ]
    }
  },
  respiratory: {
    human: {
      title: 'Human Respiratory System',
      icon: Wind,
      color: 'from-purple-500 to-purple-600',
      points: [
        'Lungs exchange gases with air',
        'Absorbs oxygen',
        'Releases carbon dioxide',
        'Maintains pH balance'
      ]
    },
    ocean: {
      title: 'Ocean Gas Exchange',
      icon: Leaf,
      color: 'from-green-500 to-green-600',
      points: [
        'Surface exchanges gases with atmosphere',
        'Absorbs CO2',
        'Produces oxygen through phytoplankton',
        'Regulates atmospheric composition'
      ]
    }
  },
  immune: {
    human: {
      title: 'Human Immune System',
      icon: ShieldCheck,
      color: 'from-yellow-500 to-yellow-600',
      points: [
        'Protects against pathogens',
        'Removes harmful substances',
        'Maintains healthy balance',
        'Adapts to new threats'
      ]
    },
    ocean: {
      title: 'Ocean Self-Cleaning',
      icon: Trees,
      color: 'from-teal-500 to-teal-600',
      points: [
        'Filters pollutants',
        'Breaks down organic matter',
        'Maintains ecosystem balance',
        'Adapts to environmental changes'
      ]
    }
  }
};

const SystemComparison = () => {
  const [activeSystem, setActiveSystem] = useState('circulatory');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* System Selection */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {Object.entries(SystemMapping).map(([key, system]) => (
          <button
            key={key}
            onClick={() => setActiveSystem(key)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl transition-all
              ${activeSystem === key 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }
            `}
          >
            <system.human.icon size={24} />
            <span className="whitespace-nowrap font-medium">
              {system.human.title.split(' ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Comparison Display */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="wait">
          {/* Human System Card */}
          <motion.div
            key={`human-${activeSystem}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ComparisonCard
              system={SystemMapping[activeSystem].human}
              hoveredPoint={hoveredPoint}
              onHoverPoint={setHoveredPoint}
            />
          </motion.div>

          {/* Ocean System Card */}
          <motion.div
            key={`ocean-${activeSystem}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ComparisonCard
              system={SystemMapping[activeSystem].ocean}
              hoveredPoint={hoveredPoint}
              onHoverPoint={setHoveredPoint}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ComparisonCard = ({ 
  system, 
  hoveredPoint, 
  onHoverPoint 
}: { 
  system: any;
  hoveredPoint: number | null;
  onHoverPoint: (index: number | null) => void;
}) => {
  const Icon = system.icon;
  
  return (
    <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/10">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${system.color}`}>
          <Icon size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold">{system.title}</h2>
      </div>

      <div className="space-y-4">
        {system.points.map((point: string, index: number) => (
          <motion.div
            key={index}
            onHoverStart={() => onHoverPoint(index)}
            onHoverEnd={() => onHoverPoint(null)}
            className={`
              p-4 rounded-lg transition-all
              ${hoveredPoint === index 
                ? 'bg-white bg-opacity-20' 
                : 'bg-white bg-opacity-5 hover:bg-opacity-10'
              }
            `}
          >
            <p className="text-lg">{point}</p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default SystemComparison;