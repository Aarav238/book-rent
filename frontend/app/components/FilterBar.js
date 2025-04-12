'use client';

import { useState, useEffect } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([
    'Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 
    'Mystery', 'Thriller', 'Biography', 'History', 'Self-help'
  ]);
  
  const [selectedGenre, setSelectedGenre] = useState('');
  const [location, setLocation] = useState('');

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onFilterChange({ genre });
  };

  const handleLocationChange = (e) => {
    const loc = e.target.value;
    setLocation(loc);
    onFilterChange({ location: loc });
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setLocation('');
    onFilterChange({ genre: '', location: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filter Books</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter city or area"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <button
        onClick={clearFilters}
        className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;