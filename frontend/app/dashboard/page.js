'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  console.log(user);
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch books based on user role
  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        let url;
        if(user.role !== 'Owner') {
            url = `http://localhost:5000/api/book`;
        }else{
            url = `http://localhost:5000/api/book/${user._id}/books`;
        
        }
       
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        console.log("books data:",data);    
        
        // Filter books if user is an Owner
        if (user.role !== 'Owner') {
            setBooks(data);
          } else {
            setBooks(data.books);
          }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [user]);
  console.log("books:",books)

  const handleDeleteBook = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
        const response = await fetch(`http://localhost:5000/api/book/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ owner:user._id })
          });
      
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      
      // Remove book from state
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
        const response = await fetch(`http://localhost:5000/api/book/${id}/status`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              owner: user._id,
              status: currentStatus === 'Available' ? 'Rented' : 'Available'
            })
          });
    
      console.log("toggle res:",response);
      
      if (!response.ok) {
        throw new Error('Failed to update book status');
      }
      
      // Update book status in state
      setBooks(books.map(book => 
        book._id === id 
          ? { ...book, status: currentStatus === 'Available' ? 'Rented' : 'Available' } 
          : book
      ));
    } catch (error) {
      console.error('Error updating book status:', error);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {user.role === 'Owner' ? 'My Book Listings' : 'Browse Books'}
          </h1>
          
          {user.role === 'Owner' && (
            <div>
              {showAddForm ? (
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              ) : (
                <Link 
                  href="/add-book"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add New Book
                </Link>
              )}
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mt-2">
          {user.role === 'Owner' 
            ? 'Manage your book listings and track their status.' 
            : 'Discover books available near you.'}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  {book.coverImage ? (
                    <Image
  src={book.coverImage}
  alt={`Cover of ${book.title}`}
  fill
  className="object-cover"
/>
                  ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                      <span className="text-gray-400 text-lg">No cover image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      book.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.status === 'Available' ? 'Available' : 'Borrowed'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mt-1">by {book.author}</p>
                  
                  <div className="mt-3 flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {book.genre}
                    </span>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-500">
                    <p>📍 {book.location}</p>
                  </div>
                  
                  {user.role === 'Owner' && book.owner._id === user._id ? (
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleToggleStatus(book._id, book.status)}
                        className={`${
                          book.status === 'available' 
                            ? 'bg-orange-500 hover:bg-orange-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white px-3 py-1 rounded-md text-sm cursor-pointer`}
                      >
                        {book.status === 'Available' ? 'Mark as Borrowed' : 'Mark as Available'}
                      </button>
                      
                      <Link 
                        href={`/edit-book/${book._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Edit
                      </Link>
                      
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <Link 
                      href={`/books/${book._id}`}
                      className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-md">
              {user.role === 'Owner' ? (
                <div>
                  <p className="text-gray-500 text-lg">You have not added any books yet.</p>
                  <Link 
                    href="/add-book"
                    className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                  >
                    Add Your First Book
                  </Link>
                </div>
              ) : (
                <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}