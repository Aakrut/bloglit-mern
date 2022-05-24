import express from "express";
import {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  getPost,
  likePost,
  searchBlog,
} from "../controllers/post.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);
router.route("/:id/like").patch(likePost);
router.get('/search').get(searchBlog);

export default router;
