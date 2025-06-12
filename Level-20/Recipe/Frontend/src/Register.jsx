import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    axios.post('http://localhost:3000/Register',formData)
    .then(result => console.log(result))
    .catch(err=>console.error(err))

    if (!name || !email || !password ) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Account created!", formData);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
      <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <Link to={'/Login'}>Already have an account</Link>
      </form>
    </div>
  );
};

export default Register;
