import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Saved = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get('http://localhost:3000/books');
        setSaved(res.data);
      } catch (err) {
        console.error("Failed to fetch saved books", err);
      }
    };

    fetchSaved();
  }, []);

  return (
    <div className="saved-books">
      <h2>Saved Books</h2>
      <div className="book-grid">
        {saved.map((book, index) => (
          <div key={index} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
