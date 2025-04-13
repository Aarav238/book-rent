'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddBook() {
  const { user, isAuthenticated , loading: authLoading } = useAuth();
  console.log(user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    contact: '',
    coverImage: '',
    status: 'available',
    owner: user?._id

  });

  // Check if user is authenticated and is an Owner
  useState(() => {
    if (authLoading) return;

      if (!isAuthenticated && !loading) {
        router.push('/login');
        return;
      }

    if (user && user.role !== 'Owner') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form
    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.location) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/book/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookData,
          ownerId: user._id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      router.push('/dashboard');
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const genreOptions = [
    'Fiction',
    'Non-fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Biography',
    'History',
    'Self-help',
    'Business',
    'Children',
    'Young Adult',
    'Poetry',
    'Other'
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Add New Book</h1>
        <Link 
          href="/dashboard"
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Dashboard
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">
            Genre *
          </label>
          <select
            id="genre"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a genre</option>
            {genreOptions.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={bookData.location}
            onChange={handleChange}
            placeholder="City, Neighborhood, etc."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">
            Contact Info
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={bookData.contact}
            onChange={handleChange}
            placeholder="Phone or email (optional)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coverImage" className="block text-gray-700 text-sm font-bold mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={bookData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="available"
              name="status"
              value="available"
              checked={bookData.status === 'available'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="available" className="mr-6">Available</label>
            
            <input
              type="radio"
              id="borrowed"
              name="status"
              value="borrowed"
              checked={bookData.status === 'borrowed'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="borrowed">Borrowed</label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
          <Link 
            href="/dashboard" 
            className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form>
      
      <p className="text-sm text-gray-500">* Required fields</p>
    </div>
  );
}