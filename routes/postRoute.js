import express from 'express';
import { getAllPosts, createPost, deletePost, updatePost, getPost, likePost } from '../controllers/post.js';

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);
router.route('/:id/likePost').patch(likePost);

export default router;