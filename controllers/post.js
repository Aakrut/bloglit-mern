const { StatusCodes } = require("http-status-codes");
const Blog = require("../models/post");

// Get All Blog Posts
const getAllPosts = async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.status(StatusCodes.OK).json(blog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Create Blog Post
const createPost = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(StatusCodes.CREATED).json(blog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Get Blog Post By Id
const getPost = async (req, res) => {
  const { id: postId } = req.params;

  try {
    const blog = await Blog.findById({ _id: postId });
    res.status(StatusCodes.OK).json(blog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Update Blog By Id
const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(StatusCodes.CREATED).json(blog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Delete Blog By Id
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete({ _id: id });
    res.status(StatusCodes.OK).json(blog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Like Blog Post
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const postId = await Blog.findById({ _id: id });
    const blog = await Blog.findByIdAndUpdate(
      { _id: id },
      { likes: postId.likes + 1 },
      {
        new: true,
      }
    );
    res.status(StatusCodes.CREATED).json(blog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
};
