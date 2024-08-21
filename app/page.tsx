'use client';
import { useState, useEffect } from 'react';
import ZipcodePopup from '../components/ZipcodePopup';


const HomePage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    // Open the popup when the page loads
    setIsPopupOpen(true);
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Wheel of Lunch!</h1>
      
      {/* Zipcode Popup */}
      <ZipcodePopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default HomePage;
