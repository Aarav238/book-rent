'use client';

import { useState, useEffect } from 'react';
import { getAllBooks } from './services/bookService';
import BookCard from './components/BookCard';
import FilterBar from './components/FilterBar';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genre: '',
    location: '',
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks(filters);
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-blue-50 rounded-lg">
        <h1 className="text-4xl font-bold text-blue-800">Welcome to BookShare</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and share books with people in your community. Browse our collection or list your own books for others to enjoy.
        </p>
      </section>

      <FilterBar onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No books found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}