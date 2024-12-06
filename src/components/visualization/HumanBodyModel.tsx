import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Html, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Wind, Waves, Activity, Ear, Droplets, Layers, Beaker } from 'lucide-react';
import type { ParallelIndicatorProps, HumanModelProps } from './types';
import LoadingAnimation from '../loading/LoadingAnimation';

const SYSTEM_POSITIONS = {
  HEART: [-0.5, 3.2, 0.5],
  LUNGS: [0.4, 3.2, 0.4],
  SKIN: [1.7, 2.5, 0.8],
  LIVER: [-0.4, 2.3, 0.3],
  KIDNEY: [0.5, 2.4, 0.2],
  EAR: [-0.5, 5, 0.3],
  ENDOCRINE: [-0.5, 1.2, 0.4],
  TEGUMENTARY: [0, 4, 0.7],
};

const PositionHelper = ({ position, label, isVisible = false }) => {
  if (!isVisible) return null;
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="red" transparent opacity={0.5} />
      </mesh>
      <Html center>
        <div className="bg-black/75 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {label}: [{position.map(n => n.toFixed(2)).join(', ')}]
        </div>
      </Html>
    </group>
  );
};

const useParallelSystems = () => [
  {
    id: 'heart',
    icon: Heart,
    position: SYSTEM_POSITIONS.HEART,
    color: '#e74c3c',
    humanTitle: 'Circulatory System',
    oceanTitle: 'Ocean Currents',
    description: 'Distributes essential resources (energy, nutrients) throughout the system. Dysfunction leads to climate and ecological imbalances.'
  },
  {
    id: 'lungs',
    icon: Wind,
    position: SYSTEM_POSITIONS.LUNGS,
    color: '#3498db',
    humanTitle: 'Respiratory System',
    oceanTitle: 'Phytoplankton System',
    description: 'Enables vital gas exchange. Dysfunction results in oxygen reduction and CO2 accumulation.'
  },
  {
    id: 'skin',
    icon: Layers,
    position: SYSTEM_POSITIONS.SKIN,
    color: '#e67e22',
    humanTitle: 'Skin System',
    oceanTitle: 'Ocean Surface',
    description: 'Regulates thermal exchanges and provides protection. Dysfunction leads to global warming and climate disruption.'
  },
  {
    id: 'liver',
    icon: Beaker,
    position: SYSTEM_POSITIONS.LIVER,
    color: '#8e44ad',
    humanTitle: 'Hepatic System',
    oceanTitle: 'Coastal Zones',
    description: 'Filters waste and maintains nutrient balance. Dysfunction results in pollutant accumulation and habitat destruction.'
  },
  {
    id: 'kidney',
    icon: Activity,
    position: SYSTEM_POSITIONS.KIDNEY,
    color: '#2ecc71',
    humanTitle: 'Renal System',
    oceanTitle: 'Tidal Circulation',
    description: 'Cleanses and redistributes vital elements. Dysfunction leads to stagnant waters and increased pollution.'
  },
  {
    id: 'ear',
    icon: Ear,
    position: SYSTEM_POSITIONS.EAR,
    color: '#f1c40f',
    humanTitle: 'Auditory System',
    oceanTitle: 'Abyssal Zones',
    description: 'Captures signals for adaptation and survival. Dysfunction results in loss of communication and disorientation.'
  },
  {
    id: 'endocrine',
    icon: Droplets,
    position: SYSTEM_POSITIONS.ENDOCRINE,
    color: '#1abc9c',
    humanTitle: 'Endocrine System',
    oceanTitle: 'Kelp Forests',
    description: 'Maintains balance and supports other systems. Dysfunction leads to collapse of dependent ecosystems.'
  },
  {
    id: 'tegumentary',
    icon: Waves,
    position: SYSTEM_POSITIONS.TEGUMENTARY,
    color: '#95a5a6',
    humanTitle: 'Tegumentary System',
    oceanTitle: 'Ocean Interface',
    description: 'Provides protective barrier and regulates exchanges with the environment.'
  }
];
const ParallelIndicator: React.FC<ParallelIndicatorProps> = ({ 
  system, 
  isActive, 
  onClick,
  showPositionHelper = false 
}) => {
  const Icon = system.icon;
  
  return (
    <group position={system.position}>
      <PositionHelper 
        position={[0, 0, 0]}
        label={system.humanTitle}
        isVisible={showPositionHelper}
      />
      <Html center distanceFactor={15}>
        <div className="relative">
          <motion.button
            onClick={onClick}
            className={`
              p-1.5 sm:p-2 rounded-full transition-colors duration-300
              ${isActive 
                ? 'bg-white shadow-lg ring-1 sm:ring-2 ring-offset-1 sm:ring-offset-2 ring-offset-black/10 ring-white' 
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
              }
            `}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon 
              size={14} 
              className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
              color={isActive ? system.color : 'white'} 
            />
          </motion.button>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1.5 sm:mt-2 
                         w-36 sm:w-48 md:w-56 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl 
                         shadow-lg sm:shadow-2xl p-2 sm:p-3 z-[9999]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  pointerEvents: 'auto'
                }}
              >
                <div className="absolute -top-1.5 left-1/2 w-px h-1.5 
                              bg-gradient-to-b from-white/0 to-white/50" />
                
                <div className="space-y-1 relative">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                        {system.humanTitle}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-medium text-gray-500">
                        {system.oceanTitle}
                      </p>
                    </div>
                    <Icon size={16} className="text-gray-400 mt-0.5" />
                  </div>
                  
                  <div className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                    {system.description}
                  </div>
                  
                  <div className="pt-1">
                    <motion.button
                      className="text-[10px] sm:text-xs font-medium text-blue-600 hover:text-blue-700"
                      whileHover={{ x: 3 }}
                    >
                      Learn more →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
};

const HumanModel: React.FC<HumanModelProps> = ({ activeSystem, onSystemSelect }) => {
  const { nodes } = useGLTF('/assets/models/human.glb');
  const parallelSystems = useParallelSystems();
  const [showPositionHelpers, setShowPositionHelpers] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'd') {
        setShowPositionHelpers(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <group position={[0, 0.008, 0]} rotation={[0, Math.PI, 0]}>
      <primitive
        object={nodes.Scene || Object.values(nodes)[0]}
        scale={6}
        rotation={[0, Math.PI, 0]}
      />
      {parallelSystems.map((system) => (
        <ParallelIndicator
          key={system.id}
          system={system}
          isActive={activeSystem === system.id}
          onClick={() => onSystemSelect(system.id)}
          showPositionHelper={showPositionHelpers}
        />
      ))}
    </group>
  );
};

const FixedHumanModel: React.FC<HumanModelProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to show animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50"
          >
            <LoadingAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={[0, 1.5, 4]}
            fov={95}
          />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.7} />
          <spotLight 
            position={[-10, 10, -10]} 
            angle={0.5} 
            intensity={0.6} 
            penumbra={1}
            castShadow
          />
          
          <Suspense fallback={null}>
            <HumanModel {...props} />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </motion.div>
    </>
  );
};
export default FixedHumanModel;