'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            BookShare
          </Link>
          <div className="flex space-x-4 items-center">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">
                  {user?.role}
                </span>
                <button
                  onClick={logout}
                  className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="hover:text-blue-200"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;