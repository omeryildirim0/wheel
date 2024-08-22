// components/Wheel.tsx
'use client';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';

interface WheelProps {
  restaurants: string[];
}

const WheelGroup: React.FC<WheelProps> = ({ restaurants }) => {
  const wheelRef = useRef<THREE.Group>(null);
  const [activeRotation, setActiveRotation] = useState(0);

  const bind = useDrag(({ offset: [, y] }) => {
    setActiveRotation(y);
  });

  const { rotationZ } = useSpring({
    rotationZ: activeRotation / 100,
    config: { tension: 300, friction: 20 },
  });

  const segments = restaurants.length;
  const segmentAngle = (2 * Math.PI) / segments;

  return (
    <a.group ref={wheelRef} {...bind()} rotation-z={rotationZ}>
      {restaurants.map((restaurant, index) => (
        <group
          key={index}
          rotation={[0, 0, index * segmentAngle]}
          position={[Math.cos(segmentAngle * index) * 3, Math.sin(segmentAngle * index) * 3, 0]}
        >
          <Text
            position={[0, 1, 0]}
            fontSize={0.25}
            color="black"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0, -segmentAngle * index]}
          >
            {restaurant}
          </Text>
          <mesh position={[0, 0.75, 0]}>
            <planeGeometry args={[2, 0.75]} />
            <meshBasicMaterial color={new THREE.Color(`hsl(${(360 / segments) * index}, 100%, 60%)`)} />
          </mesh>
        </group>
      ))}
    </a.group>
  );
};

const Wheel: React.FC<WheelProps> = ({ restaurants }) => {
  return (
    <Canvas style={{ height: '500px', width: '500px' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <WheelGroup restaurants={restaurants} />
    </Canvas>
  );
};

export default Wheel;
