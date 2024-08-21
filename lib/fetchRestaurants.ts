import axios from 'axios';

export const fetchRestaurants = async (zipcode: string) => {
    try {
      const { data } = await axios.get(`/api/restaurants?zipcode=${zipcode}`);
      return data.restaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  };
  