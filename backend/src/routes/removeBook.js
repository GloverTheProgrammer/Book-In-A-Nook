const express = require("express");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

// Route to remove a book from the user's library
router.delete("/:id", auth, async (req, res) => {
    const google_books_id = req.params.id;

    if (!google_books_id) {
        return res.status(400).send({ message: "Google Books ID is required" });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const initialLibraryLength = user.library.length;
        user.library = user.library.filter(book => book.google_books_id !== google_books_id);

        if (user.library.length === initialLibraryLength) {
            return res.status(404).send({ message: "Book not found in the library" });
        }

        await user.save();
        res.status(200).send({ message: "Book removed successfully", library: user.library });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send({ message: "Internal Server Error", error: error.response ? error.response.data : error.message });
    }
});

module.exports = router;
