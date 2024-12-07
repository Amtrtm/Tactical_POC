import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, SoftShadows, Grid as DreiGrid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import TruckModel from './TruckModel';
import HUD from './hud/HUD';
import * as THREE from 'three';
import styled from 'styled-components';
import GaugeChart from './hud/GaugeChart'; // Assuming GaugeChart is a separate component

const ViewerContainer = styled.div`
  width: 100vw;
  height: 130vh;
  background: #1a1a1a;
  position: relative;
`;

const AttitudeContainer = styled.div`
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 100;
`;

const GaugeContainer = styled.div`
  width: 150px;
  height: 150px;
  background: rgba(42, 42, 60, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GaugeLabel = styled.div`
  color: #4FFBDF;
  font-size: 14px;
  margin-bottom: 8px;
  font-family: 'Inter', sans-serif;
`;

const GaugeCanvas = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GaugeValue = styled.div`
  color: white;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  margin-top: 8px;
`;

const TruckViewer = () => {
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const updateAttitude = () => {
      if (controlsRef.current) {
        const rotation = controlsRef.current.object.rotation;
        setPitch(-(rotation.x * (180 / Math.PI)));
        setRoll((rotation.z * (180 / Math.PI)));
      }
    };

    const interval = setInterval(updateAttitude, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <ViewerContainer>
      <AttitudeContainer>
        <GaugeContainer>
          <GaugeLabel>Pitch</GaugeLabel>
          <GaugeCanvas>
            <GaugeChart
              value={pitch}
              maxValue={90}
              label="Pitch"
              type="pitch"
            />
          </GaugeCanvas>
        </GaugeContainer>
        <GaugeContainer>
          <GaugeLabel>Roll</GaugeLabel>
          <GaugeCanvas>
            <GaugeChart
              value={roll}
              maxValue={90}
              label="Roll"
              type="roll"
            />
          </GaugeCanvas>
        </GaugeContainer>
      </AttitudeContainer>

      <Canvas shadows camera={{ position: [15, 1, 15], fov: 45 }}>
        <SoftShadows size={2.5} samples={16} focus={0.5} />
        <color attach="background" args={['#1a1a1a']} />
        <fog attach="fog" args={['#1a1a1a', 10, 40]} />
        
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <Environment preset="city" />
        
        {/* Ground plane with blue tint */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color="#1b1f7b"
            roughness={0.2}
            metalness={0.2}
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Add grid using drei's Grid component */}
        <DreiGrid
          position={[0, 0, 0]}
          args={[100, 100]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#61c8ff"
          sectionSize={3}
          fadeStrength={0.5}
          fadeDistance={8}
          infiniteGrid={false}
        />

        <TruckModel />
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
          minDistance={10}
          maxDistance={30}
        />

        <ambientLight intensity={0.1} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        {/* Add glow effect */}
        <EffectComposer>
          <Bloom 
            intensity={0.1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.1}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
      <HUD />
    </ViewerContainer>
  );
};

export default TruckViewer;
