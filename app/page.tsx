'use client';
import { useState } from 'react';
import axios from 'axios';
import Wheel from '../components/Wheel';

const Home = () => {
  const [zipcode, setZipcode] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [wheelVisible, setWheelVisible] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/restaurants`, {
        params: { zipcode },
      });
      // console.log('API Response:', response.data); // Log the response data
      setRestaurants(response.data);
      setWheelVisible(true);
    } catch (error) {
      console.error('Error fetching restaurants', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Find Restaurants</h1>
      <div className="mb-6">
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="Enter Zip Code"
          className="p-2 border border-gray-300 rounded-md w-2/3 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>

      <div className='pt-10'>
        {wheelVisible && <Wheel restaurants={restaurants} />}
      </div>
    </div>
  );
};

export default Home;
