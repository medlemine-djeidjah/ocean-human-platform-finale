export interface SystemMapping {
    humanSystem: string;
    oceanSystem: string;
    description: string;
    importance: string;
    effects: {
      healthy: string[];
      unhealthy: string[];
    };
  }
  
  export interface VisualizationState {
    activeSystem: string | null;
    viewMode: 'human' | 'ocean' | 'split';
    zoomLevel: number;
    highlightedParts: string[];
  }