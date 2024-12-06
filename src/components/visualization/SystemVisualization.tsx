import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SystemVisualizationProps {
  system: 'human' | 'ocean';
  highlightedPart?: string | null;
  onPartHover?: (part: string | null) => void;
}

export const SystemVisualization: React.FC<SystemVisualizationProps> = ({
  system,
  highlightedPart,
  onPartHover,
}) => {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1}
          castShadow
        />
        
        {system === 'human' ? (
          <HumanSystem highlightedPart={highlightedPart} onPartHover={onPartHover} />
        ) : (
          <OceanSystem highlightedPart={highlightedPart} onPartHover={onPartHover} />
        )}
      </Canvas>
    </div>
  );
};

const HumanSystem = ({ highlightedPart, onPartHover }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Add human body parts here */}
      <mesh
        onPointerOver={() => onPartHover?.('heart')}
        onPointerOut={() => onPartHover?.(null)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={highlightedPart === 'heart' ? '#ff6b6b' : '#ff9999'}
          emissive={highlightedPart === 'heart' ? '#ff0000' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Add blood vessels */}
      <BloodVessels highlighted={highlightedPart === 'vessels'} />
    </group>
  );
};

const OceanSystem = ({ highlightedPart, onPartHover }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Add ocean parts here */}
      <mesh
        onPointerOver={() => onPartHover?.('current')}
        onPointerOut={() => onPartHover?.(null)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={highlightedPart === 'current' ? '#4fc3f7' : '#81d4fa'}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Add ocean currents */}
      <OceanCurrents highlighted={highlightedPart === 'currents'} />
    </group>
  );
};

const BloodVessels = ({ highlighted }) => {
  const points = [];
  for (let i = 0; i < 100; i++) {
    points.push(
      new THREE.Vector3(
        Math.sin(i * 0.2) * 0.3,
        i * 0.02 - 1,
        Math.cos(i * 0.2) * 0.3
      )
    );
  }
  
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 100, 0.02, 8, false);

  return (
    <mesh>
      <primitive object={geometry} />
      <meshStandardMaterial 
        color={highlighted ? '#ff0000' : '#ff6666'}
        emissive={highlighted ? '#ff0000' : '#000000'}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const OceanCurrents = ({ highlighted }) => {
  const points = [];
  for (let i = 0; i < 200; i++) {
    points.push(
      new THREE.Vector3(
        Math.sin(i * 0.1) * 1.5,
        Math.cos(i * 0.2) * 0.5,
        Math.sin(i * 0.15) * 1.5
      )
    );
  }
  
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 200, 0.03, 8, false);

  return (
    <mesh>
      <primitive object={geometry} />
      <meshStandardMaterial 
        color={highlighted ? '#2196f3' : '#64b5f6'}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};