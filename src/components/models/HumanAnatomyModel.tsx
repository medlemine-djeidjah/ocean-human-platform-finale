// src/components/models/HumanAnatomyModel.tsx
import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Preload the model
useGLTF.preload('../assets/models/human.glb');

interface AnatomyModelProps {
  showCrossSection: boolean;
  highlightSystem: string | null;
  opacity: number;
}

export const HumanAnatomyModel: React.FC<AnatomyModelProps> = ({
  showCrossSection,
  highlightSystem,
  opacity
}) => {
  const mainRef = useRef<THREE.Group>();
  const circulationRef = useRef<THREE.Points>();
  
  // Load the GLTF model
  const { nodes, materials } = useGLTF('../assets/models/human.glb');

  // Debug the loaded model
  console.log('Loaded model nodes:', nodes);
  console.log('Loaded model materials:', materials);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Dispose of the model when component unmounts
      Object.values(materials).forEach(material => material.dispose());
      Object.values(nodes).forEach(node => {
        if (node.geometry) node.geometry.dispose();
      });
    };
  }, [nodes, materials]);

  // Create blood flow particles
  const bloodParticles = useMemo(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Create arterial and venous paths
    const arterialPath = new THREE.CurvePath();
    arterialPath.add(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(0.3, 0.7, 0.2),
        new THREE.Vector3(0.5, 0.3, 0.4),
        new THREE.Vector3(0, -0.5, 0)
      )
    );

    for (let i = 0; i < particleCount; i++) {
      // Position particles along the paths
      const t = (i / particleCount);
      const isArterial = i < particleCount / 2;
      const point = arterialPath.getPoint(t);
      
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      
      // Red for arterial, blue for venous
      colors[i * 3] = isArterial ? 1 : 0.3;
      colors[i * 3 + 1] = 0.2;
      colors[i * 3 + 2] = isArterial ? 0.2 : 1;
      
      sizes[i] = isArterial ? 0.02 : 0.015;
    }
    
    return {
      positions,
      colors,
      sizes
    };
  }, []);

  // Animate blood flow
  useFrame((state) => {
    if (circulationRef.current) {
      const positions = circulationRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.01;
        if (positions[i + 1] > 1) positions[i + 1] = -1;
      }
      circulationRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    if (mainRef.current && showCrossSection) {
      // Animate cross-section plane
      mainRef.current.rotation.y += 0.001;
    }
  });

  // Create cross-section effect using clipping planes
  const clippingPlanes = useMemo(() => {
    if (!showCrossSection) return [];
    return [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0)
    ];
  }, [showCrossSection]);

  return (
    <Suspense fallback={null}>
      <group ref={mainRef}>
        {/* Main body structure */}
        <primitive 
          object={nodes.Scene} 
          scale={1}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          material-opacity={opacity}
          material-transparent={true}
        />

        {/* Heart with pumping animation */}
        <mesh position={[0, 0.5, 0.3]} scale={0.3}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            color={highlightSystem === 'circulatory' ? '#ff6b6b' : '#ff8787'}
            emissive={highlightSystem === 'circulatory' ? '#ff0000' : '#000000'}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Blood circulation particles */}
        <points ref={circulationRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={bloodParticles.positions.length / 3}
              array={bloodParticles.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={bloodParticles.colors.length / 3}
              array={bloodParticles.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              count={bloodParticles.sizes.length}
              array={bloodParticles.sizes}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            vertexColors
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Organs with cross-section capability */}
        <group visible={!showCrossSection}>
          {/* Lungs */}
          <mesh position={[-0.4, 0.5, 0.3]} scale={0.25}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial
              color="#98FB98"
              clippingPlanes={clippingPlanes}
              clipShadows
            />
          </mesh>
          <mesh position={[0.4, 0.5, 0.3]} scale={0.25}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial
              color="#98FB98"
              clippingPlanes={clippingPlanes}
              clipShadows
            />
          </mesh>
        </group>
      </group>
    </Suspense>
  );
};