import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <div className="card">
    <Link to={`/recipe/${recipe.id}`}>
      <img src={recipe.image} alt={recipe.title} />
      <h4>{recipe.title}</h4>
    </Link>
  </div>
);

export default RecipeCard;
