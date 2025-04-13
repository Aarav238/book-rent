import mongoose from 'mongoose';
import User from './models/User.js';
import Book from './models/Book.js';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ MongoDB connected');
  seedData();
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

async function seedData() {
  try {
    // Clear old data
    await User.deleteMany({});
    await Book.deleteMany({});

    // Create mock users
    const users = await User.insertMany([
      { name: 'Aarav Sharma', mobile: '9999999991', email: 'user1@example.com', password: 'pass123', role: 'Owner' },
      { name: 'Priya Mehta', mobile: '9999999992', email: 'user2@example.com', password: 'pass123', role: 'Owner' },
      { name: 'Raj Verma', mobile: '9999999993', email: 'user3@example.com', password: 'pass123', role: 'Owner' },
      { name: 'Neha Patel', mobile: '9999999994', email: 'user4@example.com', password: 'pass123', role: 'Owner' },
      { name: 'Vikram Desai', mobile: '9999999995', email: 'user5@example.com', password: 'pass123', role: 'Owner' },
      { name: 'Anjali Rao', mobile: '9999999996', email: 'user6@example.com', password: 'pass123', role: 'Owner' },
      { name: 'Kunal Joshi', mobile: '9999999997', email: 'user7@example.com', password: 'pass123', role: 'Owner' },
      { name: 'Sneha Kapoor', mobile: '9999999998', email: 'user8@example.com', password: 'pass123', role: 'Owner' }
    ]);

    const bookData = [
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        location: "Mumbai",
        contact: "alchemist.owner@example.com",
        status: "Available",
        owner: users[0]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-help",
        location: "Delhi",
        contact: "atomic.owner@example.com",
        status: "Available",
        owner: users[1]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "History",
        location: "Bangalore",
        contact: "sapiens.owner@example.com",
        status: "Rented",
        owner: users[2]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg"
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        location: "Kolkata",
        contact: "orwell.owner@example.com",
        status: "Available",
        owner: users[3]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81AYCp2Z8tL.jpg"
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        location: "Hyderabad",
        contact: "deep.owner@example.com",
        status: "Exchanged",
        owner: users[0]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81fHA3yeNXL.jpg"
      },
      {
        title: "Ikigai",
        author: "Francesc Miralles",
        genre: "Philosophy",
        location: "Chennai",
        contact: "ikigai.owner@example.com",
        status: "Available",
        owner: users[1]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81QpkIctqPL.jpg"
      },
      {
        title: "The Power of Now",
        author: "Eckhart Tolle",
        genre: "Spirituality",
        location: "Pune",
        contact: "now.owner@example.com",
        status: "Available",
        owner: users[4]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71sBtM3Yi5L.jpg"
      },
      {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        genre: "Finance",
        location: "Ahmedabad",
        contact: "finance.owner@example.com",
        status: "Rented",
        owner: users[5]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71XzF1k-c5L.jpg"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        location: "Lucknow",
        contact: "mockingbird.owner@example.com",
        status: "Available",
        owner: users[6]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81OdwZ23HXL.jpg"
      },
      {
        title: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        genre: "Self-help",
        location: "Indore",
        contact: "subtle.owner@example.com",
        status: "Exchanged",
        owner: users[7]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg"
      },
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        genre: "Finance",
        location: "Noida",
        contact: "money.owner@example.com",
        status: "Available",
        owner: users[2]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg"
      },
      {
        title: "Can't Hurt Me",
        author: "David Goggins",
        genre: "Biography",
        location: "Jaipur",
        contact: "goggins.owner@example.com",
        status: "Rented",
        owner: users[3]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81fV5JRYTbL.jpg"
      },
      {
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        genre: "Biography",
        location: "Kanpur",
        contact: "wings.owner@example.com",
        status: "Available",
        owner: users[4]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YF6x8c-3L.jpg"
      },
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Psychology",
        location: "Bhopal",
        contact: "thinking.owner@example.com",
        status: "Exchanged",
        owner: users[5]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/71wZpJ-eYAL.jpg"
      },
      {
        title: "The Lean Startup",
        author: "Eric Ries",
        genre: "Business",
        location: "Gurgaon",
        contact: "lean.owner@example.com",
        status: "Available",
        owner: users[6]._id,
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
      }
    ];

    await Book.insertMany(bookData);

    console.log('✅ Mock data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}