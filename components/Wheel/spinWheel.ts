import { Restaurant } from './types'; // Import the Restaurant type from the correct path

export const spinWheel = (
  targetRotation: number,
  restaurants: Restaurant[],
  isSpinning: boolean, // Add isSpinning as a parameter
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedRestaurant: React.Dispatch<React.SetStateAction<Restaurant | null>>,
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number | null>>,
  setRotation: React.Dispatch<React.SetStateAction<number>>,
  rotation: number, // Add rotation as a parameter
  setCurrentDragSpeed: React.Dispatch<React.SetStateAction<number>>, // Add setCurrentDragSpeed as a parameter
  triggerConfetti: () => void,
  playClappingAndCheeringSound: () => void
): void => {
  if (isSpinning) return;
  setIsSpinning(true);
  setSelectedRestaurant(null);

  const numSegments = restaurants.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;
  const threeOClockAngle = Math.PI * 1.5;

  const animationDuration = 3500;
  const startRotation = rotation; // Ensure rotation is correctly used
  const startTime = performance.now();

  const animate = (time: number) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easingProgress = 1 - Math.pow(1 - progress, 3);

    const currentRotation = startRotation + easingProgress * targetRotation;
    setRotation(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const finalRotation = (currentRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const selectedIndex = Math.floor(((threeOClockAngle - finalRotation + 2 * Math.PI) % (2 * Math.PI)) / anglePerSegment) % numSegments;

      const selectedRestaurantObj = restaurants[selectedIndex];
      setSelectedRestaurant(selectedRestaurantObj);

      setHighlightedIndex(selectedIndex);
      setIsSpinning(false);
      setCurrentDragSpeed(0); // Correctly call setCurrentDragSpeed with a value

      triggerConfetti();
      playClappingAndCheeringSound();
    }
  };

  requestAnimationFrame(animate);
};
