const express = require("express");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

// Route to get detailed information for all books in the user's library
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("library");
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

        const detailedBooks = await Promise.all(user.library.map(async (book) => {
            const url = `${GOOGLE_BOOKS_API_URL}/${book.google_books_id}?key=${apiKey}`;
            const response = await axios.get(url);
            const bookData = response.data;

            return {
                book_title: book.book_title,
                book_author: book.book_author,
                read: book.read,
                google_books_id: book.google_books_id,
                details: {
                    title: bookData.volumeInfo.title,
                    authors: bookData.volumeInfo.authors,
                    publisher: bookData.volumeInfo.publisher,
                    publishedDate: bookData.volumeInfo.publishedDate,
                    description: bookData.volumeInfo.description,
                    imageLinks: bookData.volumeInfo.imageLinks
                }
            };
        }));

        res.status(200).send(detailedBooks);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send({ message: "Internal Server Error", error: error.response ? error.response.data : error.message });
    }
});

module.exports = router;
