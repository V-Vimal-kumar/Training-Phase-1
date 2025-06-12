import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const categories = ['love', 'history', 'comic', 'adventure'];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('https://openlibrary.org/search.json?q=fiction&limit=12');
        const data = await res.json();
        const filtered = data.docs.filter(b => b.title && b.cover_i && b.key);
        setBooks(filtered);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="search-container">
        <SearchBar/>
        <Link to="/saved" className="view-saved-btn">View Saved Books</Link>
      </div>

      <div className="category">
        {categories.map((c) => (
          <NavLink key={c} to={`/searched/${c}`} className="btn">{c}</NavLink>
        ))}
      </div>

      <div className="book-grid">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div
              key={book.key}
              className="book-card"
              onClick={() =>
                navigate(`/book/${book.key.split('/').pop()}`, { state: book })
              }
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <h4>{book.author_name?.[0] || 'Unknown Author'}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
