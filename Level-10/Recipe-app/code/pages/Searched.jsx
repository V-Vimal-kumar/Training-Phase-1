import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const Searched = () => {
  const [results, setResults] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    const search = async () => {
      const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=9&apiKey=0c607b2d9bb741f4a8be21af2e0df980`);
      const data = await res.json();
      setResults(data.results);
    };

    search();
  }, [query]);

  return (
    <div className="grid">
      {results.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Searched;
