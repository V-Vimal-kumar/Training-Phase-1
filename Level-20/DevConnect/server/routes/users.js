import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/:id', protect, getUserById);

export default router;