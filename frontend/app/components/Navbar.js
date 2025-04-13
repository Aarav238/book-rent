'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight hover:text-blue-200 transition">
            Book<span className="text-yellow-300">Share</span>
          </Link>

          {/* Hamburger Button (Mobile Only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 relative">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>

                {/* User Avatar / Role Button */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-blue-700 px-3 py-1 text-sm rounded-full hover:bg-blue-800 transition"
                  >
                    <span className="capitalize font-medium">{user?.role || 'User'}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                      <div className="px-4 py-2 text-sm">
                        <p className="font-medium">{user?.name || 'Guest User'}</p>
                        <p className="text-gray-500 text-xs">{user?.email}</p>
                      </div>
                      <hr className="my-1" />
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-blue-200 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-white text-blue-600 hover:bg-blue-100 font-medium px-4 py-2 rounded-lg transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500 animate-fadeIn">
            <div className="flex flex-col space-y-4 pb-4">
              <Link 
                href="/" 
                className="hover:bg-blue-700 px-4 py-2 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="hover:bg-blue-700 px-4 py-2 rounded transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  <div className="px-4 py-2 bg-blue-700 rounded">
                    <p className="font-medium">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-blue-200">{user?.email}</p>
                    <p className="text-xs mt-1 bg-blue-800 inline-block px-2 py-0.5 rounded-full">
                      {user?.role || 'User'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-blue-700 rounded flex items-center gap-2 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hover:bg-blue-700 px-4 py-2 rounded transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  
                  <Link
                    href="/register"
                    className="bg-white text-blue-600 hover:bg-blue-100 font-medium px-4 py-2 rounded transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;