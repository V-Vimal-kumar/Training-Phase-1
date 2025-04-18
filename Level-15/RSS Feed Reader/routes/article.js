import express from 'express';
import Article from '../models/article.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ pubDate: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const articles = await Article.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') }
      ]
    }).sort({ pubDate: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

router.patch('/:id/read', async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;
  try {
    const updated = await Article.findByIdAndUpdate(id, { read }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update read status' });
  }
});

export default router;
