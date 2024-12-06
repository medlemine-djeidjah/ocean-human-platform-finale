import React from 'react';
import { Slider } from '@/components/ui/slider';

interface ControlsProps {
  zoomLevel: number;
  onZoomChange: (value: number) => void;
  viewMode: 'human' | 'ocean' | 'split';
  onViewModeChange: (mode: 'human' | 'ocean' | 'split') => void;
}

export const Controls: React.FC<ControlsProps> = ({
  zoomLevel,
  onZoomChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <label className="text-sm font-medium text-gray-700">Zoom Level</label>
        <Slider
          value={[zoomLevel]}
          onValueChange={([value]) => onZoomChange(value)}
          min={0.5}
          max={3}
          step={0.1}
          className="mt-2"
        />
      </div>

      <div className="flex gap-2">
        {(['human', 'ocean', 'split'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              ${viewMode === mode
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};