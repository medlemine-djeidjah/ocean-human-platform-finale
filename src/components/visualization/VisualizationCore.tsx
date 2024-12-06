// src/components/visualization/VisualizationCore.tsx
import React, { useState, useCallback } from 'react';
import { useVisualization } from '../../hooks/useVisualization';
import { SystemMapping } from '../../types/models';
import { Card } from '@/components/ui/card';
import HumanBodyModel from './HumanBodyModel';
import OceanSystemModel  from './OceanSystemModel';
import SystemComparison  from './SystemComparison';
import { Controls } from './Controls';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_MAPPINGS: SystemMapping[] = [
  {
    humanSystem: 'circulatory',
    oceanSystem: 'thermohaline',
    description: 'The heart pumps blood throughout the body just as ocean currents distribute heat and nutrients globally.',
    importance: 'Both systems are vital for distributing essential resources and maintaining temperature balance.',
    effects: {
      healthy: [
        'Efficient nutrient distribution',
        'Stable temperature regulation',
        'Proper waste removal'
      ],
      unhealthy: [
        'Poor resource distribution',
        'Temperature imbalances',
        'Waste accumulation'
      ]
    }
  },
  {
    humanSystem: 'respiratory',
    oceanSystem: 'gasExchange',
    description: 'Like human lungs exchanging oxygen and carbon dioxide, the ocean surface exchanges gases with the atmosphere.',
    importance: 'Both systems are crucial for maintaining proper gas balance and supporting life.',
    effects: {
      healthy: [
        'Efficient gas exchange',
        'Balanced oxygen levels',
        'Proper CO2 regulation'
      ],
      unhealthy: [
        'Reduced gas exchange efficiency',
        'Oxygen depletion',
        'CO2 accumulation'
      ]
    }
  }
  // Add other system mappings as needed
];

const VisualizationCore: React.FC = () => {
  const { state, setActiveSystem, setViewMode, setZoomLevel } = useVisualization();
  const [isLoading, setIsLoading] = useState(true);

  const handleSystemSelect = useCallback((system: string) => {
    setActiveSystem(system);
  }, [setActiveSystem]);

  const handleModelLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const activeMapping = SYSTEM_MAPPINGS.find(
    mapping => mapping.humanSystem === state.activeSystem
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="space-y-4">
        {/* Controls Section */}
        <Controls
          zoomLevel={state.zoomLevel}
          onZoomChange={setZoomLevel}
          viewMode={state.viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Visualization Section */}
        <div className={`grid gap-4 ${state.viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          <AnimatePresence mode="sync">
            {(state.viewMode === 'human' || state.viewMode === 'split') && (
              <motion.div
                key="human-body"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 h-96">
                  <h2 className="text-2xl font-bold mb-4">Human Body Systems</h2>
                  <div className="relative w-full h-full">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                      </div>
                    )}
                    <HumanBodyModel
                      activeSystem={state.activeSystem}
                      onSystemSelect={handleSystemSelect}
                      systemMappings={SYSTEM_MAPPINGS}
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {(state.viewMode === 'ocean' || state.viewMode === 'split') && (
              <motion.div
                key="ocean-system"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 h-96">
                  <h2 className="text-2xl font-bold mb-4">Ocean Systems</h2>
                  <div className="relative w-full h-full">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                      </div>
                    )}
                    <OceanSystemModel
                      activeSystem={state.activeSystem}
                      onSystemSelect={handleSystemSelect}
                      systemMappings={SYSTEM_MAPPINGS}
                    />
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* System Comparison Section */}
        <AnimatePresence mode="sync">
          {activeMapping && (
            <motion.div
              key="system-comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SystemComparison
                activeMapping={activeMapping}
                isVisible={!!state.activeSystem}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VisualizationCore;