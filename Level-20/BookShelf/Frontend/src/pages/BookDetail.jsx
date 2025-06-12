import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleSave = async () => {
    try {
      const payload = {
        title: book.title,
        author: book.authors?.[0]?.name || "Unknown",
        image: `https://covers.openlibrary.org/b/id/${book.covers?.[0]}-M.jpg`,
        category,
        rating,
        notes
      };

      await axios.post('http://localhost:3000/books', payload);
      alert("Book Saved!");
    } catch (err) {
      console.error("Error saving book", err);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details">
      <img src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`} alt={book.title} />
      <h1>{book.title}</h1>
      <p>{book.description?.value || book.description || 'No description available'}</p>

      <div className="book-form">
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select</option>
            <option value="Read">Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Want to Read">Want to Read</option>
          </select>
        </label>

        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </label>

        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your thoughts..."
          />
        </label>
      </div>

      <button onClick={handleSave}>Save Book</button>
    </div>
  );
};

export default BookDetails;
