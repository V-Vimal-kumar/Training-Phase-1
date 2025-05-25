import React, { useState } from "react";
import "./Register.css";
import { Link,useNavigate  } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {email,password}=formData;

    if ( !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    axios.post('http://localhost:3000/Login', { email, password })
    .then((res) => {
      console.log("Login success", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.userId);

    navigate('/Dashboard')
    })
    .catch((err) => {
      console.error("Login error", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong");
      }
    });
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">

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

        <button type="submit">Login</button>

        <Link to={'/Register'}>Dont have an account</Link>
      </form>
    </div>
  );
};

export default Login;
