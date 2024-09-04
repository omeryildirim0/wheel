'use client';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (zipcode: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    // Basic validation for a 5-digit US zip code
    const isValidZipcode = /^\d{5}$/.test(zipcode);

    if (!isValidZipcode) {
      setError('Please enter a valid 5-digit zip code.');
      return;
    }

    setError(null); // Clear any previous errors
    onSearch(zipcode);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        placeholder="Enter Zip Code"
        className="p-2 border border-gray-300 rounded-md w-2/3 focus:outline-none focus:border-blue-500
                   bg-white text-black dark:bg-gray-800 dark:text-white transition duration-200"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Search
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
