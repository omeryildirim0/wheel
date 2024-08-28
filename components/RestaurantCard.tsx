// RestaurantCard.tsx
import React from 'react';

interface Restaurant {
  name: string;
  photoUrl: string;
  rating: number;
  address: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full">
      {restaurant.photoUrl && (
        <img
          src={restaurant.photoUrl}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
      <p className="text-gray-700 mb-2">Rating: {restaurant.rating}</p>
      <p className="text-gray-600">{restaurant.address}</p>
      {/* Add more restaurant details here if needed */}
    </div>
  );
};

export default RestaurantCard;
