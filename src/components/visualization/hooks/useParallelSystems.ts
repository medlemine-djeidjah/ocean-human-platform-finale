import { useMemo } from 'react';
import { PARALLEL_SYSTEMS, HEIGHT_LEVELS } from '../config';
import { Position3D, ParallelSystemWithPosition } from '../types';

const calculateRadialPosition = (
  index: number,
  total: number,
  radius: number,
  centerY: number,
  offsetZ: number
): Position3D => {
  // Adjust the starting angle to distribute nodes more evenly
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  
  // Use a more balanced elliptical distribution
  return {
    x: Math.cos(angle) * radius * 1.2, // Slightly wider spread
    y: centerY + Math.sin(angle) * (radius * 0.8), // Less vertical spread
    z: offsetZ // Keep consistent depth
  };
};

export const useParallelSystems = () => {
  const systemsWithPositions = useMemo<ParallelSystemWithPosition[]>(() => {
    return PARALLEL_SYSTEMS.map((system, index, array) => {
      const pos = calculateRadialPosition(
        index,
        array.length,
        1.2, // Increased base radius
        HEIGHT_LEVELS[system.heightLevel],
        0.5  // Reduced depth
      );

      return {
        ...system,
        position: [pos.x, pos.y, pos.z] as [number, number, number]
      };
    });
  }, []);

  return systemsWithPositions;
};
