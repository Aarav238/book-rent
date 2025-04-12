'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';

export default function EditBook({ params }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams;
  const { user, isAuthenticated, loading:authLoading } = useAuth();
  console.log("edit page :" , user?._id)
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  // Fetch book data
  // useEffect(() => {
  //   const fetchBookData = async () => {
  //     if (!isAuthenticated) {
  //       router.push('/login');
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`http://localhost:5000/api/book/${id}`);
        
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch book data');
  //       }
        
  //       const data = await response.json();
        
  //       // Verify ownership
  //       if (user?.role === 'Owner' && data.owner._id !== user._id) {
  //         router.push('/dashboard');
  //         return;
  //       }
        
  //       setBookData(data);
  //     } catch (err) {
  //       console.error('Error fetching book:', err);
  //       setError('Failed to load book data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookData();
  // }, [id, isAuthenticated, user, router]);
  useEffect(() => {
    const fetchBookData = async () => {
      // Don't redirect if still loading authentication state
      if (authLoading) return;

      if (!isAuthenticated && !loading) {
        router.push('/login');
        return;
      }
      
      // Only proceed with the fetch if authentication is complete and user is logged in
      if (isAuthenticated) {
        try {
          const response = await fetch(`http://localhost:5000/api/book/${id}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch book data');
          }
          
          const data = await response.json();
          
          // Verify ownership
          if (user?.role === 'Owner' && data.owner._id !== user._id) {
            router.push('/dashboard');
            return;
          }
          
          setBookData(data);
        } catch (err) {
          console.error('Error fetching book:', err);
          setError('Failed to load book data');
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchBookData();
  }, [id, isAuthenticated, loading, user, router, authLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/book/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      router.push('/dashboard');
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to update book. Please try again.');
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Book</h1>
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {bookData.coverImage && (
            <div className="mt-2 h-40 relative rounded overflow-hidden">
  <Image
    src={bookData.coverImage}
    alt="Book cover preview"
    fill
    className="object-cover"
  />
</div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <div className="flex items-center text-gray-700">
            <input
              type="radio"
              id="Available"
              name="status"
              value="Available"
              checked={bookData.status === 'Available'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="available" className="mr-6">Available</label>
            
            <input
              type="radio"
              id="Rented"
              name="status"
              value="Rented"
              checked={bookData.status === 'Rented'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="borrowed">Borrowed</label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link 
            href="/dashboard" 
            className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}