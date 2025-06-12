import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import './saved.css'
import { FaHeart } from 'react-icons/fa';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const cuisines = ['Italian', 'American', 'Indian', 'Mexican'];
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  if (input.trim()) {
    navigate("/searched/" + input.trim());
  }
};

  useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian&apiKey=0c607b2d9bb741f4a8be21af2e0df980`);
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  };
  fetchRecipes();
}, []);


  const handleSaveRecipe = async (recipe) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      const payload = {
        title: recipe.title,
        image: recipe.image,
        ingredients: recipe.extendedIngredients ? recipe.extendedIngredients.map(ing => ing.original) : [],
        instructions: recipe.instructions || '',
        userId: userId
      };


      const res = await axios.post('http://localhost:3000/recipes', payload);
      console.log('Recipe saved', res.data);

      setSavedRecipes(prev => [...prev, recipe.id]);
    } catch (error) {
      console.error('Error saving recipe', error);
    }
  };

  return (
    <div>
      {/* Search bar and View Saved button */}
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <Link to="/Saved" className="view-saved-btn">
          View Saved Items
        </Link>
      </div>

      {/* Cuisine category filter buttons */}
      <div className="category">
        {cuisines.map(cuisine => (
          <NavLink key={cuisine} to={`/searched/${cuisine.toLowerCase()}`} className="btn">
            {cuisine}
          </NavLink>
        ))}
      </div>

      {/* Recipes grid */}
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-img" />
            <h3>{recipe.title}</h3>
            <button
              onClick={() => handleSaveRecipe(recipe)}
              className="heart-btn"
            >
              <FaHeart size={24} color={savedRecipes.includes(recipe.id) ? 'red' : 'grey'} />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

