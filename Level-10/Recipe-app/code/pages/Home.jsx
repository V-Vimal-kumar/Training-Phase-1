import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const cached = localStorage.getItem('popular');
      if (cached) {
        setRecipes(JSON.parse(cached));
      } else {
        const res = await fetch(`https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian&apiKey=0c607b2d9bb741f4a8be21af2e0df980`);
        const data = await res.json();
        localStorage.setItem('popular', JSON.stringify(data.recipes));
        setRecipes(data.recipes);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="grid">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Home;
