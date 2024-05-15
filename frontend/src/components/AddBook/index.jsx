// index.jsx (javascriptreact)
// Benjamin, Sam, Vinh, David
// Started: 
// Last edited: 2024-05-14 (yyyy mm dd)

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
	const [data, setData] = useState({ title: "", auther: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			/*const url = "http://localhost:8080/api/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";*/
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

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
			<h1>Add Book by Search</h1>
			<p>Search results for [Title], [Author], [ISBN, Publisher]</p>
			<input
				type="search"
				placeholder="Search..."
				name="search"
				className={styles.input}
			/>
			<br />
			<hr />
			<h1>Manually Add Book</h1>
			<div className={styles.left}>
				<form className={styles.form_container} onSubmit={handleSubmit}>
					<input
						type="title"
						placeholder="Title"
						name="title"
						onChange={handleChange}
						value={data.title}
						required
						className={styles.input}
					/>
					<input
						type="auther"
						placeholder="Auther"
						name="auther"
						onChange={handleChange}
						value={data.auther}
						required
						className={styles.input}
					/>
					{error && <div className={styles.error_msg}>{error}</div>}
					<button type="submit" className={styles.green_btn}>
						Add
					</button>
				</form>
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
