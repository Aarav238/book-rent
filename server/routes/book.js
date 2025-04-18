import express from "express";
import {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookStatus,
    getBooksByUser,
    rentBook,
    requestBook,
    getOwnerRequests,
    acceptBookRequest,
    declineBookRequest
  } from "../controllers/book.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/addBook", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/:userId/books", getBooksByUser);
router.patch("/:id/status", updateBookStatus);
router.put("/:id/rent", rentBook);

// Request a book (for seekers)
router.post("/request", requestBook);

// Get all requests for an owner
router.get("/requests/:ownerId", getOwnerRequests);

// Accept a book request
router.post("/requests/:ownerId/accept/:requestId", acceptBookRequest);

// Decline a book request
router.post("/requests/:ownerId/decline/:requestId", declineBookRequest);
export default router;