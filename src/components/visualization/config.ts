import { Heart, Wind, Activity, Droplet } from 'lucide-react';
import { ParallelSystem, HeightLevel } from './types';

export const HEIGHT_LEVELS: Record<HeightLevel, number> = {
  low: 1.8,
  mid: 2.2,
  high: 2.6
};

export const PARALLEL_SYSTEMS: ParallelSystem[] = [
  {
    id: 'circulatory',
    humanTitle: 'Heart & Blood Flow',
    oceanTitle: 'Ocean Currents',
    description: 'Just as the heart pumps blood through the body, ocean currents distribute heat and nutrients globally.',
    icon: Heart,
    color: '#FF6B6B',
    heightLevel: 'mid'
  },
  {
    id: 'respiratory',
    humanTitle: 'Lungs & Breathing',
    oceanTitle: 'Ocean-Atmosphere Exchange',
    description: 'Like lungs exchanging gases with air, the ocean surface exchanges oxygen and CO2 with the atmosphere.',
    icon: Wind,
    color: '#4FC3F7',
    heightLevel: 'high'
  },
  {
    id: 'digestive',
    humanTitle: 'Digestive System',
    oceanTitle: 'Marine Food Web',
    description: "Similar to our digestive system breaking down food, the ocean's food web processes and cycles nutrients.",
    icon: Activity,
    color: '#66BB6A',
    heightLevel: 'low'
  },
  {
    id: 'filtration',
    humanTitle: 'Filtration System',
    oceanTitle: 'Ocean Purification',
    description: 'Like our kidneys and liver filter toxins, ocean organisms and processes purify seawater.',
    icon: Droplet,
    color: '#26A69A',
    heightLevel: 'mid'
  }
];
