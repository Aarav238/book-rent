import Book from "../models/Book.js";
import User from "../models/User.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, location, coverImage, owner } = req.body;

    if (!title || !author || !location || !owner) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const ownerObj = await User.findById(owner);
    console.log(ownerObj)
    if (!ownerObj) {
      return res.status(404).json({ msg: "Owner not found" });
    }

    if (ownerObj.role !== "Owner") {
      return res.status(403).json({ msg: "Only book owners can add listings" });
    }

    const book = new Book({
      title,
      author,
      genre,
      location,
      coverImage,
      contact: ownerObj.email,
      owner
    });

    await book.save();
    res.status(201).json({ msg: "Book added successfully", book });
  } catch (err) {
    res.status(500).json({ msg: "Error adding book", error: err.message });
  }
};



  export const getAllBooks = async (req, res) => {
    try {
      const { genre } = req.query;
      let query = {};
  
      if (genre) {
        query.genre = new RegExp(genre, "i"); // case-insensitive search
      }
  
      const books = await Book.find(query).populate("owner", "name email");
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching books", error: err.message });
    }
  };

  export const getBookById = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id).populate("owner", "name email");
  
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching book", error: err.message });
    }
  };
  export const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { owner, ...updateData } = req.body;
  
      const book = await Book.findById(id);
      console.log("Book found:", book);
      if (!book) return res.status(404).json({ msg: "Book not found" });
       // Print all keys of the book object
    console.log("Book Object Keys:", Object.keys(book));
    
    // If book is a Mongoose document, also print keys of its _doc property
    if (book._doc) {
      console.log("Book _doc Keys:", Object.keys(book._doc));
    }
      // Add debugging to see what values we're working with
      console.log("Book ownerId:", book._doc.owner);
      console.log("Request ownerId:", owner);
      
      // Check if either value is undefined before comparing
      if (!book._doc.owner|| !owner) {
        return res.status(400).json({ msg: "Owner ID is missing" });
      }
      
      // Compare string representations - book.ownerId is an ObjectId, ownerId is a string
      if (book._doc.owner.toString()!== owner) {
        return res.status(403).json({ msg: "Not authorized to edit this book" });
      }
  
      Object.assign(book, updateData);
      await book.save();
  
      res.status(200).json({ msg: "Book updated successfully", book });
    } catch (err) {
      console.error("Update book error details:", err);
      res.status(500).json({ msg: "Error updating book", error: err.message });
    }
  };
  
  export const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { owner } = req.body;
  
      const book = await Book.findById(id);
      console.log("Book for deletion:", book);
      if (!book) return res.status(404).json({ msg: "Book not found" });
  
      console.log("Book ownerId:", book._doc.owner);
      console.log("Request ownerId:", owner);
      
      // Check if either value is undefined before comparing
      if (!book._doc.owner || !owner) {
        return res.status(400).json({ msg: "Owner ID is missing" });
      }
      
      // Compare string representations - book.ownerId is an ObjectId, ownerId is a string
      if (book._doc.owner.toString()!== owner) {
        return res.status(403).json({ msg: "Not authorized to delete this book" });
      }
  
      await book.deleteOne();
      res.status(200).json({ msg: "Book deleted successfully" });
    } catch (err) {
      console.error("Delete book error details:", err);
      res.status(500).json({ msg: "Error deleting book", error: err.message });
    }
  };
  