'use client';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (zipcode: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [zipcode, setZipcode] = useState('');

  const handleSearch = () => {
    onSearch(zipcode);
  };

  return (
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
  );
};

export default SearchBar;
