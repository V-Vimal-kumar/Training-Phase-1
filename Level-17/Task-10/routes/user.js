const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../controllers/authControllers');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
