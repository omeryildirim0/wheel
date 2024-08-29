'use client';
import { useState } from 'react';
import Wheel from '../components/Wheel';
import SearchBar from '@/components/SearchBar';
import useSearch from '@/hooks/useSearch';

const Home = () => {
  const { restaurants, handleSearch, loading, error } = useSearch();
  const [wheelVisible, setWheelVisible] = useState(false);

  const onSearch = async (zipcode: string) => {
    await handleSearch(zipcode);
    setWheelVisible(true);
  };

  return (
    <div className="max-w-lg mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Find Restaurants</h1>
      <SearchBar onSearch={onSearch} />
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className='pt-10'>
        {wheelVisible && <Wheel restaurants={restaurants} />}
      </div>
    </div>
  );
};

export default Home;
