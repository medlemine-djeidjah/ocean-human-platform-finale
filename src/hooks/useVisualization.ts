import { useState, useCallback } from 'react';
import { VisualizationState } from '../types/models';

const DEFAULT_STATE: VisualizationState = {
  activeSystem: null,
  viewMode: 'split',
  zoomLevel: 1,
  highlightedParts: [],
};

export const useVisualization = () => {
  const [state, setState] = useState<VisualizationState>(DEFAULT_STATE);

  const setActiveSystem = useCallback((system: string | null) => {
    setState(prev => ({ ...prev, activeSystem: system }));
  }, []);

  const setViewMode = useCallback((mode: 'human' | 'ocean' | 'split') => {
    setState(prev => ({ ...prev, viewMode: mode }));
  }, []);

  const setZoomLevel = useCallback((level: number) => {
    setState(prev => ({ ...prev, zoomLevel: Math.max(0.5, Math.min(3, level)) }));
  }, []);

  const toggleHighlight = useCallback((partId: string) => {
    setState(prev => ({
      ...prev,
      highlightedParts: prev.highlightedParts.includes(partId)
        ? prev.highlightedParts.filter(id => id !== partId)
        : [...prev.highlightedParts, partId],
    }));
  }, []);

  return {
    state,
    setActiveSystem,
    setViewMode,
    setZoomLevel,
    toggleHighlight,
  };
};