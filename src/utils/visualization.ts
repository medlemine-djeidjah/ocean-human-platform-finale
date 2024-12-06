import * as THREE from 'three';

export const interpolateColor = (
  startColor: string,
  endColor: string,
  progress: number
): string => {
  const start = new THREE.Color(startColor);
  const end = new THREE.Color(endColor);
  
  const interpolated = new THREE.Color();
  interpolated.r = start.r + (end.r - start.r) * progress;
  interpolated.g = start.g + (end.g - start.g) * progress;
  interpolated.b = start.b + (end.b - start.b) * progress;
  
  return `#${interpolated.getHexString()}`;
};

export const createWaveGeometry = (
  width: number,
  height: number,
  segments: number
): THREE.BufferGeometry => {
  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  const positions = geometry.attributes.position;
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.2;
    positions.setZ(i, z);
  }
  
  geometry.computeVertexNormals();
  return geometry;
};