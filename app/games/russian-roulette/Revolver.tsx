import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SVGLoader } from '@/lib/SVGLoader';
import { Shape, ShapePath, Mesh, ShapeGeometry } from 'three';

// Register ShapeGeometry so react-three-fiber can use it
extend({ ShapeGeometry });

const RevolverMesh: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const ref = useRef<Mesh>(null);

  // Load the SVG using SVGLoader
  useEffect(() => {
    const loader = new SVGLoader();
    loader.load('/revolver.svg', (data: { paths: ShapePath[] }) => {
      const loadedShapes = data.paths.flatMap((path: ShapePath) => path.toShapes(true));
      setShapes(loadedShapes);
    });
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Rotate the revolver slightly for effect
    }
  });

  return (
    shapes.length > 0 && (
      <mesh ref={ref}>
        {/* Use ShapeGeometry */}
        <shapeGeometry args={[shapes]} />
        <meshBasicMaterial color="gray" />
      </mesh>
    )
  );
};

export const Revolver: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <RevolverMesh />
      <OrbitControls />
    </Canvas>
  );
};
