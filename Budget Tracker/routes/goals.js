import express from 'express';
import Goal from '../models/goal.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { category, target } = req.body;
  const goal = new Goal({ category, target });
  await goal.save();
  res.status(201).json(goal);
});

router.patch('/:id', async (req, res) => {
  const { current } = req.body;
  const updated = await Goal.findByIdAndUpdate(req.params.id, { current }, { new: true });
  res.json(updated);
});

router.get('/', async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

export default router;
