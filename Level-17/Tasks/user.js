import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import user from './model/schema.js'

dotenv.config();

const app=express();
const port=process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.use(express.json())

mongoose.connect(mongoURI)
.then(()=>console.log('connecion success!'))
.catch((err)=>console.error('connecion declined',err))

app.get('/schema',(req,res)=>{
    const path=Object.keys(user.schema.paths);
    res.json({fields:path});
})

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = new user({ name, email, age });
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser); 
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
    try {
      const { name, email, limit = 10, skip = 0 } = req.query;
  
      const query = { isActive: true }; 
      if (name) query.name = new RegExp(name, 'i');
      if (email) query.email = new RegExp(email, 'i');
  
      const users = await user.find(query)
        .limit(Number(limit))
        .skip(Number(skip));
  
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await user.findOne({ _id: req.params.id, isActive: true });
  
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.json(user);
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.put('/api/users/:id', async (req, res) => {
    try {
      const { name, email, age } = req.body;
  
      const updatedUser = await user.findByIdAndUpdate(
        req.params.id,
        { name, email, age },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
  
      res.json(updatedUser);
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const deletedUser = await user.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
  
      if (!deletedUser) return res.status(404).json({ error: 'User not found' });
  
      res.json({ message: 'User deleted (soft)', user: deletedUser });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  });
  

app.listen(port,()=>{
    console.log("server is running")
})