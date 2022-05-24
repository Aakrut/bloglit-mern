import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import Blog from "../models/post.js";
import checkPermissions from "../utils/checkPermissions.js";

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
  const { title, desc, image } = req.body;
  try {
    req.body.createdBy = req.user.userId;

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
    const blog = await Blog.findById({ _id: postId }).populate(
      "createdBy",
      "username fullName email avatar _id"
    );
    res.status(StatusCodes.OK).json(blog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Update Blog By Id
const updatePost = async (req, res) => {
  const { id } = req.params;

  const { title, desc, image } = req.body;

  if (!title || !desc || !image) {
    throw new BadRequestError("Please Provide All Values");
  }

  try {
    const blog = await Blog.findOne({ _id: id });

    if (!blog) {
      throw new NotFoundError(`No blog with id:${id}`);
    }

    checkPermissions(req.user, blog.createdBy);

    const updateBlog = await Blog.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.CREATED).json(updateBlog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Delete Blog By Id
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne({ _id: id });

    if (!blog) {
      throw new NotFoundError(`No blog with id:${id}`);
    }

    checkPermissions(req.user, blog.createdBy);

    const deleteBlog = await Blog.findOneAndDelete({ _id: id });
    res.status(StatusCodes.OK).json(deleteBlog);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

// Like Blog Post
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.user.userId) {
      throw new UnAuthenticatedError("UnAuthenticated User!");
    }
    const postId = await Blog.findById({ _id: id });

    const index = postId.likes.findIndex(
      (id) => id === String(req.user.userId)
    );

    if (index === -1) {
      postId.likes.push(req.user.userId);
    } else {
      postId.likes = postId.likes.filter(
        (id) => id !== String(req.user.userId)
      );
    }

    const blog = await Blog.findByIdAndUpdate({ _id: id }, postId, {
      new: true,
    });
    res.status(StatusCodes.OK).json({ blog });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

const searchBlog = async (req, res) => {
  try {
    res.send('Search Blog!!!');
  } catch (error) {
    res.send(error);
  }
}

export { getAllPosts, createPost, getPost, updatePost, deletePost, likePost ,searchBlog};
