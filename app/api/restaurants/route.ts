import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to fetch restaurant details including the URL
const fetchRestaurantDetails = async (placeId: string, apiKey: string) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: apiKey,
        fields: 'url', // Requesting only the URL field for efficiency
      },
    });
    return response.data.result.url; // Return the URL from the response
  } catch (error) {
    console.error(`Failed to fetch details for place_id ${placeId}:`, error);
    return ''; // Return an empty string if fetching fails
  }
};

// Function to handle GET requests
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const zipcode = searchParams.get('zipcode');

  if (!zipcode) {
    return NextResponse.json({ error: 'Zipcode is required' }, { status: 400 });
  }

  const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!googlePlacesApiKey) {
    return NextResponse.json({ error: 'Internal Server Error: Missing Google Places API Key' }, { status: 500 });
  }

  try {
    // Make a request to Google Places API to get restaurants
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `restaurants in ${zipcode}`,
        key: googlePlacesApiKey,
      },
    });

    // Shuffle the restaurants array
    const shuffledRestaurants = shuffleArray(response.data.results);

    // Get the first 12 restaurants and fetch their URLs using place_id
    const restaurants = await Promise.all(
      shuffledRestaurants.slice(0, 12).map(async (restaurant: any) => {
        const url = await fetchRestaurantDetails(restaurant.place_id, googlePlacesApiKey);
        return {
          name: restaurant.name,
          photoUrl: restaurant.photos && restaurant.photos.length > 0
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${googlePlacesApiKey}`
            : '', // Fallback if no photo is available
          rating: restaurant.rating,
          address: restaurant.formatted_address,
          url, // Include the fetched URL
        };
      })
    );

    return NextResponse.json(restaurants, { status: 200 });

  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
};
