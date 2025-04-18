import { useState } from "react";
import "./App.css"; 

const recipes = [
  {
    id: 1,
    title: "Bun Parotto",
    imageUrl: "https://haribhavanam.com/cdn/shop/files/Bun_parotta.webp?v=1733297900",
    ingredients: ["refined flour", "salt", "baking soda", "egg mixture"],
    instructions: "Cook spaghetti. Mix eggs and cheese. Add cooked bacon. Combine everything.",
  },
  {
    id: 2,
    title: "Chicken Curry",
    imageUrl: "https://dmlxzvnzyohme.cloudfront.net/2023/07/PBSFood-TGAR-S2-Salmah_Chicken-Curry-and-Roti.jpg",
    ingredients: ["Chicken", "Curry Powder", "Onion", "Garlic", "Tomatoes"],
    instructions: "Cook onions and garlic. Add chicken and curry powder. Stir in tomatoes and simmer.",
  },
];

export default function RecipeFinder() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              <h2 className="recipe-title">{recipe.title}</h2>
            </div>
          ))
        ) : (
          <p className="no-results">No matching recipes found.</p>
        )}
      </div>
    </div>
  );
}
