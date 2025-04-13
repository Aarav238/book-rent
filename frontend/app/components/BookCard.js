import Image from 'next/image';
import Link from 'next/link';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex flex-col">
      <div className="relative h-64 w-full">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <span className="text-gray-400 text-base">No cover image</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight line-clamp-2">
            {book.title}
          </h3>
          <span
            className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
              book.status === 'Available'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {book.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-1">by {book.author}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
            {book.genre}
          </span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            📍 {book.location}
          </span>
        </div>

        {/* Spacer to push button down */}
        <div className="flex-grow" />

        {/* Button always at bottom */}
        <div className="mt-4">
          <Link
            href={`/books/${book._id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
