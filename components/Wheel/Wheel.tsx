'use client';
import React, { useEffect, useRef, useState } from 'react';
import RestaurantCard from '../RestaurantCard';
import { shortenName } from './shortenName';
import { drawWheel } from './drawWheel';
import { playClappingAndCheeringSound } from './sounds';
import { triggerConfetti } from './triggerConfetti';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './handleMouseEvents';
import { spinWheel } from './spinWheel';
import { Restaurant } from './types'; // Import the Restaurant type from the correct path

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
    const [slideIn, setSlideIn] = useState(false); // New state for slide-in effect

    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        drawWheel(canvasRef, restaurants, rotation, highlightedIndex, shortenName);
    }, [rotation, restaurants, highlightedIndex]);

    // Trigger slide-in animation on component mount
    useEffect(() => {
        setSlideIn(true);
    }, []);

    const handleMouseDownWrapper = (e: React.MouseEvent | React.TouchEvent) => {
        handleMouseDown(e, canvasRef, setIsDragging, setStartAngle, setLastTime, rotation);
    };

    const handleMouseMoveWrapper = (e: React.MouseEvent | React.TouchEvent) => {
        handleMouseMove(
            e,
            canvasRef,
            isDragging,
            setRotation,
            setCurrentDragSpeed,
            startAngle,
            lastTime,
            setLastTime,
            rotation
        );
    };

    const handleMouseUpWrapper = () => {
        handleMouseUp(
            isDragging,
            setIsDragging,
            setRotation,
            rotation,
            setCurrentDragSpeed,
            (targetRotation: number) => {
                spinWheel(
                    targetRotation,
                    restaurants,
                    isSpinning,
                    setIsSpinning,
                    setSelectedRestaurant,
                    setHighlightedIndex,
                    setRotation,
                    rotation,
                    setCurrentDragSpeed,
                    triggerConfetti,
                    () => playClappingAndCheeringSound(audioContextRef)
                );
            },
            currentDragSpeed
        );
    };

    return (
        <div className={`flex flex-col items-center relative transition-transform duration-700 ${slideIn ? 'translate-x-0' : 'translate-x-full'}`}>
            <div 
                className="absolute top-0 p-4 text-xl font-bold text-yellow-600 animate-pulse bg-white bg-opacity-75 rounded-lg"
                style={{ marginTop: '-60px' }}
            >
                Grab the wheel and give it a spin
            </div>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="mb-4 cursor-pointer"
                onMouseDown={handleMouseDownWrapper}
                onMouseMove={handleMouseMoveWrapper}
                onMouseUp={handleMouseUpWrapper}
                onMouseLeave={handleMouseUpWrapper}
                onTouchStart={handleMouseDownWrapper}
                onTouchMove={handleMouseMoveWrapper}
                onTouchEnd={handleMouseUpWrapper}
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
