'use client';
import { useState, useEffect } from 'react';
import ZipcodePopup from '../components/ZipcodePopup';
import axios from 'axios';

const Home = () => {
  const [zipcode, setZipcode] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/restaurants`, {
        params: { zipcode },
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants', error);
    }
  };

  return (
    <div>
      <h1>Find Restaurants</h1>
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        placeholder="Enter Zip Code"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {restaurants.map((restaurant: any, index: number) => (
          <li key={index}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
