import React from "react";
import Navbar from "../components/Navbar";
import "../styles/bookPage.css";
// import BookCard from "../components/BookCard";
// todo Dima калай обычно css косвсын?
export default function Books() {
	return (
		<>
			<div className="book-searcher">
				<input
					type="text"
					className="search-book-input"
					placeholder="SEARCH BOOKS"
				/>
				<div className="sort-option-buttons">
					<button className="sort-button">BY RATING</button>
					<button className="sort-button">BY GENRE</button>
					<button className="sort-button">BY LETTER</button>
				</div>
			</div>

			<div className="books-body">
				<div className="book-container"></div>
			</div>
		</>
	);
}
