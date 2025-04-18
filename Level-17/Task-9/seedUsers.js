import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleProducts = [
  { name: 'Laptop', price: 1200, category: 'Electronics', stock: 30 },
  { name: 'Smartphone', price: 900, category: 'Electronics', stock: 40 },
  { name: 'T-shirt', price: 25, category: 'Clothing', stock: 100 },
  { name: 'Microwave', price: 200, category: 'Appliances', stock: 50 }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');

    await Product.deleteMany();
    const inserted = await Product.insertMany(sampleProducts);

    console.log('Products inserted:');
    inserted.forEach(p => {
      console.log(`${p.name}: ${p._id}`);
    });

    process.exit();
  })
  .catch(err => {
    console.error('DB Error:', err);
    process.exit(1);
  });
