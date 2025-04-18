import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactions.js';
import goalRoutes from './routes/goals.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/transactions', transactionRoutes);
app.use('/goals', goalRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
