const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_title: { type: String, required: true },
    book_author: { type: String, required: true },
    read: { type: Boolean, required: true }, // intialized as false
    google_books_id: { type: String, required: true}
});

module.exports = bookSchema;
