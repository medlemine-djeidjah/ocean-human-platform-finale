export interface ComparisonPoint {
  id: string;
  humanSystem: {
    title: string;
    description: string;
    facts: string[];
    image?: string;
  };
  oceanSystem: {
    title: string;
    description: string;
    facts: string[];
    image?: string;
  };
  connections: string[];
}
export type ParallelSystem = {
  id: string;
  humanTitle: string;
  oceanTitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  heightLevel: 'low' | 'mid' | 'high';
};
