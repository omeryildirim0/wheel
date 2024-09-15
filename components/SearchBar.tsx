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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-6 flex justify-center items-center">
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter Zip Code"
        className="p-3 border border-gray-300 rounded-full shadow-sm w-2/3 focus:outline-none focus:border-indigo-500
                   bg-white text-black dark:bg-gray-800 dark:text-white transition duration-200 ease-in-out"
      />
      <button
        onClick={handleSearch}
        className="ml-3 px-4 py-3 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 
                   transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Search
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
