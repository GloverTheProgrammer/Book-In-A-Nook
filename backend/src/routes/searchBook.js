const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

router.get("/", async (req, res) => { // Changed to "/" to match the route prefix
    const { title, author, isbn, iccn, publisher } = req.query;

    if (!title || !author) {
        return res.status(400).send({ message: "Title and author are required" });
    }

    let query = `intitle:${title}+inauthor:${author}`;
    if (isbn) query += `+isbn:${isbn}`;
    if (iccn) query += `+lccn:${iccn}`;
    if (publisher) query += `+inpublisher:${publisher}`;

    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const url = `${GOOGLE_BOOKS_API_URL}?q=${query}&key=${apiKey}`;
        const response = await axios.get(url);
        const books = response.data.items || [];
        const bookDetails = books.map(book => {
            const volumeInfo = book.volumeInfo;
            return {
                id: book.id,
                title: volumeInfo.title,
                authors: volumeInfo.authors,
                publisher: volumeInfo.publisher,
                publishedDate: volumeInfo.publishedDate,
                description: volumeInfo.description,
                imageLinks: volumeInfo.imageLinks
            };
        });
        res.status(200).send(bookDetails);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send({ message: "Internal Server Error", error: error.response ? error.response.data : error.message });
    }
});

module.exports = router;
