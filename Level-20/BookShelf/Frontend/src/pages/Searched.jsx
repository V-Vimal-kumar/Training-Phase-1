import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Searched = () => {
  const { term } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchedBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://openlibrary.org/search.json?q=${term}`);
        const data = await res.json();
        const filtered = data.docs.filter(book => book.title && book.cover_i);
        setBooks(filtered);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (term) fetchSearchedBooks();
  }, [term]);

  const handleBookClick = (book) => {
    navigate(`/book/${book.key.replace('/works/', '')}`, { state: book });
  };

  return (
    <div className="book-grid">
    {loading ? (
  <div className="bar-loader-container">
    <div className="bar-loader">
      <div></div><div></div><div></div><div></div>
    </div>
    <p>Fetching books from the cloud...</p>
  </div>
      ) : books.length > 0 ? (
        books.map(book => (
          <div key={book.key} className="book-card" onClick={() => handleBookClick(book)}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              className="book-img"
            />
            <h3>{book.title}</h3>
            <h4>{book.author_name?.[0] || "Unknown Author"}</h4>
          </div>
        ))
      ) : (
        <p>No results found for "{term}"</p>
      )}
    </div>
  );
};

export default Searched;
