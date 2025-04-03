import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./MultiPages/Home";
import Contact from "./MultiPages/Contact";
import ProductList from "./MultiPages/ProductList";
import ProductDetail from "./MultiPages/ProductDetail";
import About from "./MultiPages/About";
import Login from "./MultiPages/Login";
import Dashboard from "./MultiPages/Dashboard"
import SearchPage from "./SearchPage";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>

          <li><Link to="/search">Search</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />

        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
