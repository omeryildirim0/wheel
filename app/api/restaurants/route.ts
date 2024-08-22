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

// Function to handle GET requests
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const zipcode = searchParams.get('zipcode');

  if (!zipcode) {
    return NextResponse.json({ error: 'Zipcode is required' }, { status: 400 });
  }

  const googlePlacesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

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

    // Get the first 20 random restaurants
    const restaurants = shuffledRestaurants.slice(0, 13);

    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
};
