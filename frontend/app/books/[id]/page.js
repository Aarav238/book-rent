"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
export default function BookDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { user } = useAuth();
  console.log("book details user:", user);
  console.log("book details user:", user?._id);

  const [book, setBook] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://book-rent-o321.onrender.com/api/book/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();
        setBook(data);

        // Fetch owner information
        if (data.owner) {
          const ownerResponse = await fetch(
            `https://book-rent-o321.onrender.com/api/auth/profile/${data.owner._id}`
          );
          if (ownerResponse.ok) {
            const ownerData = await ownerResponse.json();
            setOwner(ownerData);
          }
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);
  console.log(owner);

  // const handleRenttBook = async () => {
  //   if (!user) {
  //     Link.push("/login");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `https://book-rent-o321.onrender.com/api/book/${book._id}/rent`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           status: "Rented",
  //           rentedBy: user?._id,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to send request");
  //     }

  //     setRequestSent(true);
  //     setShowContactInfo(true);
  //   } catch (err) {
  //     console.error("Error requesting book:", err);
  //     setError("Failed to send request. Please try again.");
  //   }
  // };

  const handleRequestBook = async (e) => {
    e.preventDefault();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setRequesting(true);
      const response = await fetch("http://localhost:5000/api/book/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: id,
          seekerId: user._id,
          message: requestMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to request book");
      }

      setRequestStatus({
        success: true,
        message: "Request sent successfully! The owner will be notified.",
      });
      setRequestMessage("");
    } catch (error) {
      console.error("Error requesting book:", error);
      setRequestStatus({
        success: false,
        message: error.message || "Failed to send request. Please try again.",
      });
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
        <Link href="/dashboard">
          <span className="text-white">Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-700">Book not found</h2>
          <p className="mt-2 text-gray-500">
            The book you are looking for does not exist or may have been
            removed.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-4">
        <Link href="/dashboard" className="text-gray-300 hover:text-white">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                width={500} // Replace with appropriate width
                height={750} // Replace with appropriate height
                className="w-full h-auto object-cover rounded"
              />
            ) : (
              <div className="bg-gray-200 w-full h-64 flex items-center justify-center rounded">
                <span className="text-gray-400 text-lg">No cover image</span>
              </div>
            )}

            <div className="mt-4">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  book.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {book.status === "Available"
                  ? "Available"
                  : "Currently Borrowed"}
              </span>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {book.genre}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Location
              </h3>
              <p className="text-gray-600">📍 {book.location}</p>
            </div>

            {owner && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Owner
                </h3>
                <p className="text-gray-600">
                  {owner.user.name || "Book Owner"}
                </p>
              </div>
            )}

            {showContactInfo && book.contact && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-600">{book.contact}</p>
              </div>
            )}

            {user && user.role === "Seeker" && book.status === "Available" && (
              <form onSubmit={handleRequestBook} className="mt-6 space-y-4">
                <textarea
                  className="w-full p-3 border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a message to the owner..."
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  required
                ></textarea>

                <button
                  type="submit"
                  disabled={requesting}
                  className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {requesting ? "Sending Request..." : "Request this Book"}
                </button>

                {requestStatus && (
                  <div
                    className={`p-4 rounded-lg ${
                      requestStatus.success
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {requestStatus.message}
                  </div>
                )}
              </form>
            )}

            {(!user ||
              (user.role === "Seeker" && book.status !== "Available")) && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                {book.status !== "Available" ? (
                  <p className="text-gray-700">
                    This book is currently borrowed by someone else. Check back
                    later or browse other available books.
                  </p>
                ) : (
                  <p className="text-gray-700">
                    Sign in as a Seeker to request this book.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-300 mb-2">
          Similar Books
        </h3>
        <p className="text-gray-500">
          Looking for related books? Check out our recommendations in the same
          genre.
        </p>
        <Link
          href="/"
          className="mt-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Browse Books
        </Link>
      </div>
    </div>
  );
}
