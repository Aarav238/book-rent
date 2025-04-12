import Book from "../models/Book.js";
import User from "../models/User.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, location, coverImage, ownerId } = req.body;

    if (!title || !author || !location || !ownerId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const owner = await User.findById(ownerId);
    console.log(owner)
    if (!owner) {
      return res.status(404).json({ msg: "Owner not found" });
    }

    if (owner.role !== "Owner") {
      return res.status(403).json({ msg: "Only book owners can add listings" });
    }

    const book = new Book({
      title,
      author,
      genre,
      location,
      coverImage,
      contact: owner.email,
      owner: owner._id,
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