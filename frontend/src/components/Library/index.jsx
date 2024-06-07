import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const Main = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("You must be logged in to view your library.");
                    console.log("No token found, redirecting to login");
                    navigate("/login");
                    return;
                }
                const url = "https://book-in-a-nook.onrender.com/api/allBooks";
                const response = await axios.get(url, {
                    headers: {
                        "x-auth-token": token
                    }
                });
                setBooks(response.data);
            } catch (error) {
                console.error("Fetch books error:", error);
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            }
        };

        fetchBooks();
    }, [navigate]);

    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleRemoveBook = async (googleBooksId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to remove a book.");
                return;
            }
            const url = `https://book-in-a-nook.onrender.com/api/removeBook/${googleBooksId}`;
            await axios.delete(url, {
                headers: {
                    "x-auth-token": token
                }
            });
            setBooks(books.filter(book => book.google_books_id !== googleBooksId));
            console.log("Book removed successfully.");
        } catch (error) {
            console.error("Remove book error:", error);
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Book In A Nook</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <h1>My Library</h1>
            <hr />
            {error && <div className={styles.error_msg}>{error}</div>}
            <div className={styles.books_container}>
                <Link to="/library/add-book" className={styles.add_book_card}>
                    <div className={styles.book_card}>
                        <div className={styles.book_image_placeholder}></div>
                        <h3>Add Book</h3>
                    </div>
                </Link>
                {books.map(book => (
                    <div key={book.google_books_id} className={styles.book_card}>
                        {book.details.imageLinks && (
                            <img
                                src={book.details.imageLinks.thumbnail}
                                alt={book.details.title}
                                className={styles.book_image}
                            />
                        )}
                        <h3>{book.details.title}</h3>
                        <p>{book.details.authors ? book.details.authors.join(", ") : "Unknown author"}</p>
                        <button onClick={() => handleRemoveBook(book.google_books_id)} className={styles.red_btn}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
