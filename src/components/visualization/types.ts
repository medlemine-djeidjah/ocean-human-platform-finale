import { LucideIcon } from 'lucide-react';

export type HeightLevel = 'low' | 'mid' | 'high';

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface ParallelSystem {
  id: string;
  humanTitle: string;
  oceanTitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  heightLevel: HeightLevel;
}

export interface ParallelSystemWithPosition extends ParallelSystem {
  position: [number, number, number];
}

export interface ParallelIndicatorProps {
  system: {
    id: string;
    icon: any;
    position: [number, number, number];
    color: string;
    humanTitle: string;
    oceanTitle: string;
    description: string;
  };
  isActive: boolean;
  onClick: () => void;
  onLearnMore?: (systemId: string) => void;
  showPositionHelper?: boolean;
}

export interface HumanModelProps {
  activeSystem: string | null;
  onSystemSelect: (systemId: string) => void;
  onLearnMore?: (systemId: string) => void;
}
