const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    recommended: { type: Boolean, required: true },
    book_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book' 
    },
    text: { type: String, required: true }
});

module.exports = reviewSchema;
