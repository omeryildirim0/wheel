import { RefObject, Dispatch, SetStateAction } from 'react';

export const handleMouseDown = (
  e: React.MouseEvent | React.TouchEvent,
  canvasRef: RefObject<HTMLCanvasElement>,
  setIsDragging: Dispatch<SetStateAction<boolean>>,
  setStartAngle: Dispatch<SetStateAction<number>>,
  setLastTime: Dispatch<SetStateAction<number>>,
  rotation: number // Ensure rotation is passed in
): void => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  const x = clientX - rect.left - centerX;
  const y = clientY - rect.top - centerY;
  const angle = Math.atan2(y, x);

  setIsDragging(true);
  setStartAngle(angle - rotation);
  setLastTime(performance.now());
};

export const handleMouseMove = (
  e: React.MouseEvent | React.TouchEvent,
  canvasRef: RefObject<HTMLCanvasElement>,
  isDragging: boolean,
  setRotation: Dispatch<SetStateAction<number>>,
  setCurrentDragSpeed: Dispatch<SetStateAction<number>>,
  startAngle: number,
  lastTime: number,
  setLastTime: Dispatch<SetStateAction<number>>,
  rotation: number // Add rotation as an argument
): void => {
  if (!isDragging) return;

  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  const x = clientX - rect.left - centerX;
  const y = clientY - rect.top - centerY;
  const angle = Math.atan2(y, x);

  const newRotation = angle - startAngle;
  setRotation(newRotation);

  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;

  if (deltaTime > 0) {
    const angularSpeed = (newRotation - rotation) / deltaTime; // Use rotation correctly
    setCurrentDragSpeed(angularSpeed);
    setLastTime(currentTime);
  }
};

export const handleMouseUp = (
    isDragging: boolean,
    setIsDragging: Dispatch<SetStateAction<boolean>>,
    setRotation: Dispatch<SetStateAction<number>>,
    rotation: number,
    setCurrentDragSpeed: Dispatch<SetStateAction<number>>,
    spinWheel: (targetRotation: number) => void, // Ensure this matches the signature
    currentDragSpeed: number
  ): void => {
    if (!isDragging) return;
    setIsDragging(false);
  
    const power = Math.abs(currentDragSpeed) * 800;
    setRotation(rotation + power);
  
    // Call spinWheel correctly
    spinWheel(power);
  };
  
