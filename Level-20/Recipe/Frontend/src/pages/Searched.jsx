import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import './Dashboard.css'; 
import './saved.css'; 

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { query } = useParams(); 

  useEffect(() => {
    const fetchSearched = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=0c607b2d9bb741f4a8be21af2e0df980`
      );
      const data = await res.json();
      setSearchedRecipes(data.results);
    };
    fetchSearched();
  }, [query]);

  const handleSaveRecipe = async (recipe) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const payload = {
        title: recipe.title,
        image: recipe.image,
        ingredients: [],
        instructions: '',
        userId: userId,
      };

      const res = await axios.post('http://localhost:3000/recipes', payload);
      console.log('Recipe saved', res.data);

      setSavedRecipes((prev) => [...prev, recipe.id]);
    } catch (error) {
      console.error('Error saving recipe', error);
    }
  };

  return (
    <div>
      <h2 className="search-heading">Results for "{query}"</h2>
      <div className="recipes-grid">
        {searchedRecipes.length > 0 ? (
          searchedRecipes.map((item) => (
            <div key={item.id} className="recipe-card">
              <img
                src={item.image}
                alt={item.title}
                className="recipe-img"
              />
              <h3>{item.title}</h3>
              <button
                onClick={() => handleSaveRecipe(item)}
                className="heart-btn"
              >
                <FaHeart
                  size={24}
                  color={savedRecipes.includes(item.id) ? 'red' : 'gray'}
                />
              </button>
            </div>
          ))
        ) : (
          <h3>No recipes found for "{query}"</h3>
        )}
      </div>
    </div>
  );
};

export default Searched;
