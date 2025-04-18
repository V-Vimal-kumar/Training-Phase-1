import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const user = new User({ name, email, password, age });
    await user.save();
    res.status(201).json(user.generateProfile());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(user => user.generateProfile()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/domain/:domain', async (req, res) => {
  try {
    const users = await User.findByEmailDomain(req.params.domain);
    res.json(users.map(user => user.generateProfile()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
