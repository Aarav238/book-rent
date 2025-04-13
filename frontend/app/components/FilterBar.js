'use client';

import { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [genres] = useState([
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
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">📚 Filter Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Genre Filter */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <div className="relative">
  <select
    id="genre"
    value={selectedGenre}
    onChange={handleGenreChange}
    className={`w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg appearance-none 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition 
      ${selectedGenre === '' ? 'text-gray-500' : 'text-gray-800'}`}
  >
    <option value="">All Genres</option>
    {genres.map((genre) => (
      <option key={genre} value={genre}>
        {genre}
      </option>
    ))}
  </select>

  {/* Custom dropdown arrow */}
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <svg
      className="w-4 h-4 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter city or country"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Clear Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition"
        >
          ✖ Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
