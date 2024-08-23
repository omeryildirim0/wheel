'use client';
import React, { useEffect, useRef, useState } from 'react';

interface WheelProps {
  restaurants: string[];
}

const Wheel: React.FC<WheelProps> = ({ restaurants }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

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
      if (i === highlightedIndex) {
        ctx.fillStyle = 'yellow'; // Highlighted segment color
      } else {
        ctx.fillStyle = `hsl(${(i * 360) / numSegments}, 100%, 50%)`;
      }

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
    const spins = 3; // Reduced number of full spins
    const randomOffset = Math.random() * 360; // Random offset within a single spin
    const targetRotation = spins * 360 + randomOffset; // Total rotation amount

    const animationDuration = 1500; // Shortened to 1.5 seconds
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
        // Calculate the final position where the wheel stops
        const finalRotation = (currentRotation % 360 + 360) % 360; // Normalize to 0-360 degrees
        const needlePosition = (360 - finalRotation) % 360; // Calculate needle position
        const selectedIndex = Math.floor(needlePosition / anglePerSegment); // Determine which segment the needle points to

        setHighlightedIndex(selectedIndex); // Highlight the selected segment
        setIsSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    drawWheel();
  }, [rotation, restaurants, highlightedIndex]);

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
    </div>
  );
};

export default Wheel;
