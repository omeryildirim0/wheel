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
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [currentDragSpeed, setCurrentDragSpeed] = useState(0);

  const segmentColors = [
    '#FFCC00', '#FF9900', '#FF6600', '#FF3300', '#FF0000', '#CC0000', '#990000',
    '#FF99CC', '#FF66CC', '#FF33CC', '#CC0099', '#990066', '#FF6699', '#FF3366',
    '#FF0033', '#FF6600', '#FF9933', '#FFCC66', '#FFFF66', '#FFFF00'
  ];

  const shortenName = (name: string) => {
    const maxLength = 15;
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    restaurants.forEach((restaurant, i) => {
      const startAngle = i * anglePerSegment + rotation;
      const endAngle = startAngle + anglePerSegment;

      ctx.fillStyle = segmentColors[i % segmentColors.length];

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      const shortName = shortenName(restaurant);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = i % 2 === 0 ? 'bold 18px Arial' : '16px Arial';
      ctx.fillText(shortName, radius - 10, 10);
      ctx.restore();
    });

    ctx.fillStyle = '#FFCC00';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius / 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'blue';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Wheel of', centerX, centerY - 10);
    ctx.fillText('Lunch', centerX, centerY + 20);

    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 20, centerY - radius + 20);
    ctx.lineTo(centerX + 20, centerY - radius + 20);
    ctx.fill();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSpinning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const angle = Math.atan2(y, x);

    setIsDragging(true);
    setStartAngle(angle - rotation);
    setLastTime(performance.now());
    setCurrentDragSpeed(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const angle = Math.atan2(y, x);

    const newRotation = angle - startAngle;
    setRotation(newRotation);

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;

    if (deltaTime > 0) {
      const angularSpeed = (newRotation - rotation) / deltaTime;
      setCurrentDragSpeed(angularSpeed);
      setLastTime(currentTime);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const power = Math.abs(currentDragSpeed) * 400; // Slightly increased multiplier for faster spin
    setRotation(rotation + power); // Ensure rotation is reset properly each time

    spinWheel(power);
  };

  const spinWheel = (targetRotation: number) => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedRestaurant(null);

    const numSegments = restaurants.length;
    const anglePerSegment = 360 / numSegments;

    const animationDuration = 3500; // Slightly reduced duration for a faster spin
    const startRotation = rotation;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easingProgress = 1 - Math.pow(1 - progress, 3); // Easing function for realistic slow down

      const currentRotation = startRotation + easingProgress * targetRotation;
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const finalRotation = (currentRotation % 360 + 360) % 360;
        const selectedIndex = Math.floor((finalRotation + anglePerSegment / 2) / anglePerSegment) % numSegments;

        setHighlightedIndex(selectedIndex);
        setSelectedRestaurant(restaurants[selectedIndex]);
        setIsSpinning(false);
        setCurrentDragSpeed(0); // Reset drag speed after each spin
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    drawWheel();
  }, [rotation, restaurants, highlightedIndex]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="mb-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></canvas>
      <button
        onClick={() => spinWheel(360)} // Allow clicking the button to spin with a fixed power
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      {selectedRestaurant && (
        <div className="mt-4 text-xl font-bold">
          Selected Restaurant: {selectedRestaurant}
        </div>
      )}
    </div>
  );
};

export default Wheel;
