import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import Users from './model/schema.js';
import foods from './model/recipeSchema.js';

const app = express();
app.use(express.json());
app.use(cors({
     origin: ['http://localhost:5173'], 
   }));

mongoose.connect("mongodb://localhost:27017/recipe", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register
app.post('/Register', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a Recipe
app.post('/recipes', async (req, res) => {
  const { title, image, userId } = req.body; 
  try {
    const recipe = await foods.create({ title, image, userId });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Saved Recipes
app.get('/recipes/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const recipes = await foods.find({ userId });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//saved
app.get('/Saved', async (req, res) => {
  const { userId } = req.query; 
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const items = await foods.find({ userId }); 
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, () => {
  console.log("connected");
});


