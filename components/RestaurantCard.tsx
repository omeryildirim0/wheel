import React from 'react';

interface Restaurant {
  name: string;
  photoUrl: string;
  rating: number;
  address: string;
  url: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <a
      href={restaurant.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      {restaurant.photoUrl && (
        <img
          src={restaurant.photoUrl}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{restaurant.name}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">Google Rating: {restaurant.rating}</p>
      <p className="text-gray-600 dark:text-gray-400">{restaurant.address}</p>
    </a>
  );
};

export default RestaurantCard;
