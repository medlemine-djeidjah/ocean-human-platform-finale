import { Heart, Wind, Activity, Droplet, Layers, Beaker, Ear, Waves } from 'lucide-react';
import type { ParallelSystem, ComparisonPoint } from '../types/comparison';

// Height levels for 3D visualization
export const HEIGHT_LEVELS = {
  low: 1.8,
  mid: 2.2,
  high: 2.6
} as const;

// Core parallel systems data
export const PARALLEL_SYSTEMS: ParallelSystem[] = [
  {
    id: 'circulatory',
    humanTitle: 'Heart & Blood Flow',
    oceanTitle: 'Ocean Currents',
    description: 'Just as the heart pumps blood through the body, ocean currents distribute heat and nutrients globally.',
    icon: Heart,
    color: '#FF6B6B',
    heightLevel: 'mid',
    facts: [
      'The human heart pumps about 2,000 gallons of blood daily',
      'Ocean currents move over 100 times the global river flow',
      'Both systems transport vital nutrients and regulate temperature',
      'Disruptions in either can lead to systemic problems'
    ]
  },
  {
    id: 'respiratory',
    humanTitle: 'Lungs & Breathing',
    oceanTitle: 'Ocean-Atmosphere Exchange',
    description: 'Like lungs exchanging gases with air, the ocean surface exchanges oxygen and CO2 with the atmosphere.',
    icon: Wind,
    color: '#4FC3F7',
    heightLevel: 'high',
    facts: [
      'Oceans produce 50-80% of Earth\'s oxygen',
      'Both systems regulate gas exchange with the atmosphere',
      'Carbon dioxide absorption is crucial in both systems',
      'Temperature affects gas exchange rates'
    ]
  },
  {
    id: 'digestive',
    humanTitle: 'Digestive System',
    oceanTitle: 'Marine Food Web',
    description: "Similar to our digestive system breaking down food, the ocean's food web processes and cycles nutrients.",
    icon: Activity,
    color: '#66BB6A',
    heightLevel: 'low',
    facts: [
      'Both break down complex materials into simpler forms',
      'Nutrient cycling is essential in both systems',
      'Microorganisms play crucial roles in both processes',
      'Energy transfer efficiency is similar'
    ]
  },
  {
    id: 'filtration',
    humanTitle: 'Filtration System',
    oceanTitle: 'Ocean Purification',
    description: 'Like our kidneys and liver filter toxins, ocean organisms and processes purify seawater.',
    icon: Droplet,
    color: '#26A69A',
    heightLevel: 'mid',
    facts: [
      'Both systems filter out harmful substances',
      'Natural filtration occurs continuously',
      'Multiple organisms/organs work together',
      'Capacity can be overwhelmed by excess pollution'
    ]
  },
  {
    id: 'skin',
    humanTitle: 'Skin System',
    oceanTitle: 'Ocean Surface',
    description: 'The ocean surface, like human skin, regulates temperature and provides protection.',
    icon: Layers,
    color: '#e67e22',
    heightLevel: 'mid',
    facts: [
      'Both act as protective barriers',
      'Temperature regulation is a key function',
      'Both are sensitive to environmental changes',
      'Damage can affect the entire system'
    ]
  },
  {
    id: 'liver',
    humanTitle: 'Hepatic System',
    oceanTitle: 'Coastal Zones',
    description: 'Coastal zones, like the liver, process and transform materials while maintaining balance.',
    icon: Beaker,
    color: '#8e44ad',
    heightLevel: 'low',
    facts: [
      'Both process and store nutrients',
      'Chemical transformation occurs in both',
      'Both are crucial for system health',
      'Can be damaged by toxic substances'
    ]
  }
];

// Detailed comparison points for interactive learning
export const COMPARISON_POINTS: ComparisonPoint[] = [
  {
    id: 'heart',
    humanSystem: {
      title: 'Circulatory System',
      description: 'The human circulatory system pumps blood throughout the body, delivering oxygen and nutrients while removing waste.',
      facts: [
        'Pumps 2,000 gallons of blood daily',
        'Creates continuous circulation',
        'Maintains body temperature',
        'Responds to body needs'
      ]
    },
    oceanSystem: {
      title: 'Ocean Currents',
      description: 'Ocean currents form a global conveyor belt, moving water, heat, and nutrients around the planet.',
      facts: [
        'Moves water globally',
        'Distributes heat and nutrients',
        'Affects global climate',
        'Creates marine highways'
      ]
    },
    connections: [
      'Both systems create continuous circulation',
      'Temperature regulation is crucial',
      'Nutrient distribution is essential',
      'System disruption affects the whole'
    ]
  },
  {
    id: 'respiratory',
    humanSystem: {
      title: 'Respiratory System',
      description: 'The respiratory system enables gas exchange between the body and the environment through the lungs.',
      facts: [
        'Exchanges oxygen and CO2',
        'Regulated by pressure differences',
        'Constant adaptation to needs',
        'Filters incoming air'
      ]
    },
    oceanSystem: {
      title: 'Ocean-Atmosphere Exchange',
      description: 'The ocean surface constantly exchanges gases with the atmosphere, particularly oxygen and carbon dioxide.',
      facts: [
        'Major oxygen producer',
        'CO2 absorption buffer',
        'Temperature dependent exchange',
        'Vital for global cycles'
      ]
    },
    connections: [
      'Gas exchange is fundamental',
      'Both systems are pressure-driven',
      'Temperature affects efficiency',
      'Filtering mechanisms exist in both'
    ]
  }
];

// System positions for 3D visualization
export const SYSTEM_POSITIONS = {
  HEART: { x: 0, y: 0.2, z: 0 },
  LUNGS: { x: -0.3, y: 0.3, z: 0.1 },
  SKIN: { x: 0.3, y: 0.1, z: -0.1 },
  LIVER: { x: -0.1, y: -0.2, z: 0.2 },
  KIDNEY: { x: 0.2, y: -0.1, z: 0.1 },
  EAR: { x: -0.2, y: 0.4, z: -0.1 },
  ENDOCRINE: { x: 0.1, y: 0.3, z: 0.2 },
  TEGUMENTARY: { x: -0.1, y: 0.1, z: -0.2 }
} as const;
