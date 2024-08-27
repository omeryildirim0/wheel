import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WheelThreeD: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create the wheel
    const wheelRadius = 2;
    const wheelSegments = 12; // You can change this to add more segments
    const wheelGeometry = new THREE.CircleGeometry(wheelRadius, wheelSegments);
    const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    scene.add(wheel);

    // Add segments (like slices of a pizza)
    const segmentAngle = (2 * Math.PI) / wheelSegments;
    const segmentColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

    for (let i = 0; i < wheelSegments; i++) {
      const segmentMaterial = new THREE.MeshBasicMaterial({ color: segmentColors[i % segmentColors.length], side: THREE.DoubleSide });
      const segmentGeometry = new THREE.ShapeGeometry(new THREE.Shape([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(Math.cos(i * segmentAngle) * wheelRadius, Math.sin(i * segmentAngle) * wheelRadius),
        new THREE.Vector2(Math.cos((i + 1) * segmentAngle) * wheelRadius, Math.sin((i + 1) * segmentAngle) * wheelRadius)
      ]));
      const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
      scene.add(segment);
    }

    // Create the needle
    const needleGeometry = new THREE.ConeGeometry(0.1, 1, 32);
    const needleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const needle = new THREE.Mesh(needleGeometry, needleMaterial);
    needle.rotation.x = Math.PI / 2;
    needle.position.y = -wheelRadius - 0.5;
    scene.add(needle);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      wheel.rotation.z += 0.01; // Spin the wheel

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default WheelThreeD;
