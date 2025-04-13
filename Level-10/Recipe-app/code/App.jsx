import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Searched from './pages/Searched';
import Category from './components/Category';
import Search from './components/Search';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>🥗 Veggie Recipes</h1>
        <Search />
        <Category />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/searched/:query" element={<Searched />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
