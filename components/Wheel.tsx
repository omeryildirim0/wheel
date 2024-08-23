// components/Wheel.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';

interface WheelProps {
  restaurants: string[];
}

const Wheel: React.FC<WheelProps> = ({ restaurants }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numSegments = restaurants.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each segment
    restaurants.forEach((restaurant, i) => {
      const startAngle = i * anglePerSegment + rotation;
      const endAngle = startAngle + anglePerSegment;

      // Set color
      ctx.fillStyle = `hsl(${(i * 360) / numSegments}, 100%, 50%)`;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(restaurant, radius - 10, 10);
      ctx.restore();
    });

    // Draw arrow
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius + 10);
    ctx.lineTo(centerX + 10, centerY - radius + 10);
    ctx.fill();
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
  
    const numSegments = restaurants.length;
    const anglePerSegment = 360 / numSegments;
    const spins = 5; // Number of full spins
    const randomOffset = Math.random() * 360; // Random offset within a single spin
    const targetRotation = spins * 360 + randomOffset; // Total rotation amount
  
    const animationDuration = 3000; // 3 seconds
    const startRotation = rotation;
    const startTime = performance.now();
  
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easingProgress = progress < 0.5 ? 2 * progress ** 2 : -1 + (4 - 2 * progress) * progress; // Ease-in-out
  
      const currentRotation = startRotation + easingProgress * targetRotation;
      setRotation(currentRotation);
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Calculate the final rotation aligned with the 12 o'clock position
        const finalRotation = (currentRotation % 360 + 360) % 360; // Adjust to 12 o'clock position
        const normalizedRotation = (360 - finalRotation + anglePerSegment / 2) % 360;
        const selectedIndex = Math.floor(normalizedRotation / anglePerSegment);
  
        setSelectedRestaurant(restaurants[selectedIndex]);
        setIsSpinning(false);
      }
    };
  
    requestAnimationFrame(animate);
  };
  
  
  
  

  useEffect(() => {
    drawWheel();
  }, [rotation, restaurants]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={400} height={400} className="mb-4"></canvas>
      <button
        onClick={spinWheel}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      {selectedRestaurant && (
        <p className="mt-4 text-xl font-bold">Selected: {selectedRestaurant}</p>
      )}
    </div>
  );
};

export default Wheel;
