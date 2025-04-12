import Image from 'next/image';
import Link from 'next/link';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-56 w-full">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            style={{ objectFit: 'cover' }}
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
        
        <Link 
          href={`/books/${book._id}`}
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;