const express = require('express');
const { getAllPosts, createPost, deletePost, updatePost, getPost, likePost } = require('../controllers/post');

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);
router.route('/:id/likePost').patch(likePost);

module.exports = router;