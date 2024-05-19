const express = require("express");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

// Route to add a book to the user's library
router.post("/:id", auth, async (req, res) => {
    const google_books_id = req.params.id;

    if (!google_books_id) {
        return res.status(400).send({ message: "Google Books ID is required" });
    }

    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const url = `${GOOGLE_BOOKS_API_URL}/${google_books_id}?key=${apiKey}`;

        const response = await axios.get(url);
        const bookData = response.data;

        const newBook = {
            book_title: bookData.volumeInfo.title,
            book_author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(", ") : "Unknown",
            read: false, // false for now 
            google_books_id: google_books_id
        };

        const user = await User.findById(req.user._id);

        // Check if the book is already in the user's library
        const bookExists = user.library.some(book => book.google_books_id === google_books_id);
        if (bookExists) {
            return res.status(400).send({ message: "Book is already in your library" });
        }

        user.library.push(newBook);
        await user.save();

        res.status(200).send(user.library);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send({ message: "Internal Server Error", error: error.response ? error.response.data : error.message });
    }
});

module.exports = router;
