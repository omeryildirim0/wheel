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
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  // Function to shorten restaurant names
  const shortenName = (name: string) => {
    const maxLength = 15; // Adjust this value as needed
    return name.length > maxLength ? name.slice(0, maxLength - 3) + '...' : name;
  };

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
  
      // Adjust hue calculation to avoid yellow (shifted hue to skip yellow range)
      const hue = (i * 300) / numSegments; // We use 300 instead of 360 to avoid yellow
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();
  
      // Draw text
      const shortName = shortenName(restaurant);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(shortName, radius - 10, 10);
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
    setSelectedRestaurant(null); // Reset selected restaurant before spinning
  
    const numSegments = restaurants.length;
    const anglePerSegment = 360 / numSegments;
    const spins = 5; // Number of full spins
    const randomOffset = Math.random() * 360; // Random offset within a single spin
    const targetRotation = spins * 360 + randomOffset; // Total rotation amount
  
    const animationDuration = 3000; // Duration of the spin animation
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
        // Calculate final rotation and selected segment
        const finalRotation = (currentRotation % 360 + 360) % 360; // Normalize to 0-360 degrees
        const selectedIndex = Math.floor((finalRotation + anglePerSegment / 2) / anglePerSegment) % numSegments;
  
        setHighlightedIndex(selectedIndex); // Highlight the selected segment
        setSelectedRestaurant(restaurants[selectedIndex]); // Set the selected restaurant
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
      {selectedRestaurant && ( // Display selected restaurant
        <div className="mt-4 text-xl font-bold">
          Selected Restaurant: {selectedRestaurant}
        </div>
      )}
    </div>
  );
};

export default Wheel;
