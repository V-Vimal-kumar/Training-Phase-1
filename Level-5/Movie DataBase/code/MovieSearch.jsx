import { useState, useEffect } from "react";
import './App.css'

const API_KEY = "be432db4"; 

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") return;
    setLoading(true);
    setError("");

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error || "No movies found.");
        }
      })
      .catch(() => setError("Failed to fetch movies."))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div className="movie-container">
      <h2>Movie Search</h2>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
            <h3>{movie.Title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
