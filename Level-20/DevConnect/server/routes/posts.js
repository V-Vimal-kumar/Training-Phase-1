import express from 'express';
import {
  createPost,
  getPosts,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(protect, getPosts);

router.route('/user/:userId')
  .get(protect, getUserPosts);

router.route('/:id')
  .get(protect, getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like')
  .put(protect, likePost);

router.route('/:id/unlike')
  .put(protect, unlikePost);

router.route('/:id/comment')
  .post(protect, addComment);

export default router;