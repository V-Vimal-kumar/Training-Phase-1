import mongoose from 'mongoose'; 
import Products from './models/Products.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleProducts = [
  { name: 'Laptop', price: 1200, category: 'Electronics', stock: 30 },
  { name: 'Microwave', price: 200, category: 'Appliances', stock: 50 },
  { name: 'T-shirt', price: 25, category: 'Clothing', stock: 100 },
  { name: 'Washing Machine', price: 500, category: 'Appliances', stock: 20 },
  { name: 'Smartphone', price: 900, category: 'Electronics', stock: 40 },
  { name: 'Lap', price: 12000, category: 'Electronics', stock: 30 },
  { name: 'wave', price: 20, category: 'Appliances', stock: 50 },
  { name: 'shirt', price: 250, category: 'Clothing', stock: 100 },
  { name: 'Machine', price: 5000, category: 'Appliances', stock: 20 },
  { name: 'phone', price: 9000, category: 'Electronics', stock: 40 },
  { name: 'top', price: 120, category: 'Electronics', stock: 30 },
  { name: 'Micro', price: 200, category: 'Appliances', stock: 50 },
  { name: 'lycra', price: 500, category: 'Clothing', stock: 10 },
  { name: 'Washing powder', price: 50, category: 'Appliances', stock: 20 },
  { name: 'Smart watch', price: 1000, category: 'Electronics', stock: 40 },
  { name: 'Gaming Laptop', price: 74000, category: 'Electronics', stock: 30 },
  { name: 'oven', price: 2000, category: 'Appliances', stock: 50 },
  { name: 'checked T-shirt', price: 2500, category: 'Clothing', stock: 100 },
  { name: 'fidge', price: 50000, category: 'Appliances', stock: 20 },
  { name: 'AC', price: 9000, category: 'Electronics', stock: 4 }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Database connected');

    await Products.deleteMany(); 
    console.log('Cleared existing products');
    
    try {
      const result = await Products.insertMany(sampleProducts);
      console.log('Successfully inserted products:\n', result);
    } catch (err) {
      console.error('Error during insertion:', err.message);
    }

    process.exit();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
