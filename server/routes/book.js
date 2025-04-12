import express from "express";
import {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookStatus
  } from "../controllers/book.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/addBook", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.patch("/:id/status", updateBookStatus);

export default router;