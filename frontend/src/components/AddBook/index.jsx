import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import styles from "./styles.module.css";

const Main = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [status, setStatus] = useState({}); 
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");  // Clear previous errors
        console.log("Searching for books with title:", title, "and author:", author);
        
        try {
            const url = `http://localhost:8080/api/search?title=${title}&author=${author}`;
            const response = await axios.get(url);
            setSearchResults(response.data);
            console.log("Search results:", response.data);
        } catch (error) {
            console.error("Search error:", error);
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    const handleAddBook = async (googleBooksId) => {
        setError("");  // Clear previous errors
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to add a book.");
                return;
            }
            const url = `http://localhost:8080/api/addBook/${googleBooksId}`;
            await axios.post(url, {}, {
                headers: {
                    "x-auth-token": token
                }
            });
            console.log("Book added successfully.");
            setStatus(prevState => ({ ...prevState, [googleBooksId]: "success" }));
        } catch (error) {
            console.error("Add book error:", error);
            setStatus(prevState => ({ ...prevState, [googleBooksId]: "error" }));
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Book In A Nook</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            <h1 className={styles.title}>Add Book</h1>
            <form className={styles.form_container} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Author"
                    name="author"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.green_btn}>
                    Search
                </button>
            </form>

            {error && <div className={styles.error_msg}>{error}</div>}

            <h2>Search Results</h2>
            <div className={styles.results_container}>
                {searchResults.map(book => (
                    <div key={book.id} className={styles.book_card}>
                        <div className={styles.book_details}>
                            {book.imageLinks && <img src={book.imageLinks.thumbnail} alt={book.title} />}
                            <h3>{book.title}</h3>
                            <p>{book.authors ? book.authors.join(", ") : "Unknown author"}</p>
                            <p>{book.publishedDate}</p>
                        </div>
                        <div className={styles.book_action}>
                            {status[book.id] === "success" ? (
                                <span className={styles.green_checkmark}>✔</span>
                            ) : status[book.id] === "error" ? (
                                <span className={styles.red_x}>✖</span>
                            ) : (
                                <button onClick={() => handleAddBook(book.id)} className={styles.green_btn}>
                                    Add to Library
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <br />
            <hr />

            <div className={styles.right}>
                <Link to="/library">
                    <button type="button" className={styles.green_btn}>
                        Back to My Library
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Main;
