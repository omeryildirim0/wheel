// /hooks/useSearch.ts
import { useState } from 'react';
import axios from 'axios';

const useSearch = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (zipcode: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/restaurants`, {
        params: { zipcode },
      });
      setRestaurants(response.data);
    } catch (err) {
      setError('Error fetching restaurants');
    } finally {
      setLoading(false);
    }
  };

  return { restaurants, handleSearch, loading, error };
};

export default useSearch;
