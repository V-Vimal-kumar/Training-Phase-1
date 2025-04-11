import express from 'express';
import Transaction from '../models/transaction.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;
    const transaction = new Transaction({ type, amount, category, date });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const { start, end, category } = req.query;
  const filter = {};
  if (start && end) {
    filter.date = { $gte: new Date(start), $lte: new Date(end) };
  }
  if (category) {
    filter.category = category;
  }
  const transactions = await Transaction.find(filter).sort({ date: -1 });
  res.json(transactions);
});

router.get('/summary', async (req, res) => {
  const transactions = await Transaction.find();
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  res.json({ income, expenses, balance: income - expenses });
});

export default router;
