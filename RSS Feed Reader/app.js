import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetchFeeds from './services/fetchFeeds.js';
import articleRoutes from './routes/article.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/articles', articleRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  
  fetchFeeds([
    'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    'https://feeds.bbci.co.uk/news/rss.xml'
  ]);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.error('MongoDB connection failed:', err.message));
