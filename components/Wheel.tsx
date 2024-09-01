'use client';
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti'; // Import confetti library
import RestaurantCard from './RestaurantCard';

interface Restaurant {
  name: string;
  photoUrl: string;
  rating: number;
  address: string;
  url: string;
}

interface WheelProps {
  restaurants: Restaurant[];
}

const Wheel: React.FC<WheelProps> = ({ restaurants }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [currentDragSpeed, setCurrentDragSpeed] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const tickIntervalRef = useRef<number | null>(null);

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
      const isHighlighted = i === highlightedIndex;

      ctx.fillStyle = segmentColors[i % segmentColors.length];

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);

      const shortName = shortenName(restaurant.name);

      if (isHighlighted) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
      }

      ctx.textAlign = 'right';
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
    ctx.fillText('Meals', centerX, centerY + 20);
  };

  const createTickSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    // Use white noise burst to simulate the mechanical "tick" sound
    const bufferSize = context.sampleRate * 0.1; // 0.1 seconds buffer
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // White noise
    }

    const noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.setValueAtTime(0.05, context.currentTime); // Adjust volume
    
    noise.start();
    noise.stop(context.currentTime + 0.05); // Play sound for 50 milliseconds
  };

  const startTickingSound = (initialInterval: number) => {
    let currentInterval = initialInterval;

    const tick = () => {
      createTickSound();
      currentInterval = Math.max(50, currentInterval * 0.95); // Gradually decrease the interval for speeding up effect

      tickIntervalRef.current = window.setTimeout(tick, currentInterval);
    };

    tickIntervalRef.current = window.setTimeout(tick, currentInterval);
  };

  const stopTickingSound = () => {
    if (tickIntervalRef.current) {
      clearTimeout(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSpinning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    const x = clientX - rect.left - centerX;
    const y = clientY - rect.top - centerY;
    const angle = Math.atan2(y, x);

    setIsDragging(true);
    setStartAngle(angle - rotation);
    setLastTime(performance.now());
    setCurrentDragSpeed(0);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    const x = clientX - rect.left - centerX;
    const y = clientY - rect.top - centerY;
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

    const power = Math.abs(currentDragSpeed) * 800;
    setRotation(rotation + power);

    spinWheel(power);
  };

  const spinWheel = (targetRotation: number) => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedRestaurant(null);

    const numSegments = restaurants.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const threeOClockAngle = Math.PI * 1.5; // Three o'clock position in radians

    const animationDuration = 3500;
    const startRotation = rotation;
    const startTime = performance.now();

    startTickingSound(200); // Start ticking sound with an initial interval

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easingProgress = 1 - Math.pow(1 - progress, 3);

      const currentRotation = startRotation + easingProgress * targetRotation;
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        stopTickingSound(); // Stop ticking sound when the wheel stops

        const finalRotation = (currentRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const selectedIndex = Math.floor(((threeOClockAngle - finalRotation + 2 * Math.PI) % (2 * Math.PI)) / anglePerSegment) % numSegments;

        const selectedRestaurantObj = restaurants[selectedIndex];
        setSelectedRestaurant(selectedRestaurantObj);

        setHighlightedIndex(selectedIndex);
        setIsSpinning(false);
        setCurrentDragSpeed(0);

        // Trigger confetti effect when the wheel stops
        triggerConfetti();
      }
    };

    requestAnimationFrame(animate);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    drawWheel();
  }, [rotation, restaurants, highlightedIndex]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="absolute top-0 p-4 text-xl font-semibold text-black bg-white bg-opacity-75 rounded-lg" style={{ marginTop: '-60px' }}>
        Grab the wheel and give it a spin
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="mb-4 cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      ></canvas>
      {selectedRestaurant && (
        <div className="mt-4">
          <RestaurantCard restaurant={selectedRestaurant} />
        </div>
      )}
    </div>
  );
};

export default Wheel;
