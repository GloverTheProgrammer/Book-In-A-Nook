// index.jsx (javascriptreact)
// Benjamin, Sam, Vinh, David
// Started: 
// Last edited: 2024-05-14 (yyyy mm dd)

import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>bookshelf app</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<h1>My Library</h1>
			<hr />
			<br />
			<i>Comment:
				<div>for (book in myBooks)</div>
				<div>Show Book title and cover image</div>
			</i>

			<br />
			<div className={styles.right}>
				<Link to="/library/add-book">
					<button type="button" className={styles.green_btn}>
						Add Book
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Main;
