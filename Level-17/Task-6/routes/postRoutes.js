import express from 'express';
import { createPost, getPosts, getPostsByUser } from '../controllers/postControllers.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/user/:id', getPostsByUser);

export default router;