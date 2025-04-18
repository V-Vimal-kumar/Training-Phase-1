import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=0c607b2d9bb741f4a8be21af2e0df980`);
      const data = await res.json();
      setRecipe(data);
    };

    fetchDetails();
  }, [id]);

  return recipe ? (
    <div className="detail">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((item) => (
          <li key={item.id}>{item.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  ) : <p>Loading...</p>;
};

export default Recipe;
