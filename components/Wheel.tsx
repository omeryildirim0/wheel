// components/Wheel.tsx
'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface WheelProps {
  restaurants: string[];
}

const WheelGroup: React.FC<WheelProps> = ({ restaurants }) => {
  const wheelRef = useRef<THREE.Group>(null);
  const segments = restaurants.length;
  const segmentAngle = (2 * Math.PI) / segments;

  // Rotate the wheel
  useFrame(() => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={wheelRef}>
      {restaurants.map((restaurant, index) => (
        <group
          key={index}
          rotation={[0, 0, index * segmentAngle]}
          position={[Math.cos(segmentAngle * index) * 2, Math.sin(segmentAngle * index) * 2, 0]}
        >
          <Text
            position={[0, 1, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0, -segmentAngle * index]}
          >
            {restaurant}
          </Text>
          <mesh position={[0, 0.5, 0]}>
            <planeGeometry args={[1.5, 0.5]} />
            <meshBasicMaterial color={new THREE.Color(`hsl(${(360 / segments) * index}, 100%, 50%)`)} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const Wheel: React.FC<WheelProps> = ({ restaurants }) => {
  return (
    <Canvas style={{ height: '400px', width: '400px' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <WheelGroup restaurants={restaurants} />
    </Canvas>
  );
};

export default Wheel;
