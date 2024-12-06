// src/hooks/useModelAnimation.ts
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useModelAnimation = (
  modelRef: React.RefObject<THREE.Group>,
  isActive: boolean,
  duration: number = 1
) => {
  const animationRef = useRef<number>();
  
  useEffect(() => {
    if (!modelRef.current) return;
    
    const model = modelRef.current;
    const startRotation = model.rotation.y;
    const targetRotation = startRotation + Math.PI * 2;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      if (model && isActive) {
        model.rotation.y = THREE.MathUtils.lerp(
          startRotation,
          targetRotation,
          progress
        );
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    };
    
    if (isActive) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, duration, modelRef]);
};
