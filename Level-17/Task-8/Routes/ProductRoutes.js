import express from 'express';
import Product from '../models/Products.js'
const router = express.Router();

router.get('/stats', async (req, res) => {
  const data = await Product.aggregate([
    { $group: { _id: '$category', total: { $sum: 1 }, stock: { $sum: '$stock' } } }
  ]);
  res.json(data);
});

router.get('/', async (req, res) => {
  const { category, minPrice, maxPrice, inStock } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (minPrice) filter.price = { $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
  if (inStock === 'true') filter.stock = { $gt: 0 };

  const products = await Product.find(filter);
  res.json(products);
});

router.get('/search', async (req, res) => {
  const { query } = req.query;
  const result = await Product.find({ $text: { $search: query } });
  res.json(result);
});

router.get('/avg-price', async (req, res) => {
  const data = await Product.aggregate([
    { $group: { _id: '$category', avgPrice: { $avg: '$price' } } }
  ]);
  res.json(data);
});

router.get('/sorted', async (req, res) => {
  const { sortBy = 'price', order = 'asc', category } = req.query;
  const filter = category ? { category } : {};
  const sort = { [sortBy]: order === 'desc' ? -1 : 1 };

  const products = await Product.find(filter).sort(sort);
  res.json(products);
});

export default router;