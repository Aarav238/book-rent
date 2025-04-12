import express from "express";
import { addBook, getAllBooks } from "../controllers/book.js";

const router = express.Router();

router.post("/addBook", addBook);
router.get("/", getAllBooks);

export default router;