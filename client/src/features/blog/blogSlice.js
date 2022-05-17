import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1";

export const getBlogs = createAsyncThunk("blog/getBlogs", async () => {
  return await fetch(`${url}/blog/`)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

export const getBlog = createAsyncThunk("blog/getBlog", async (id) => {
  return await fetch(`${url}/blog/${id}`)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

export const createBlog = createAsyncThunk(`blog/createBlog`, async (data) => {
  return await axios
    .post(`${url}/blog/`, data)
    .then((resp) => console.log(resp.data))
    .catch((err) => console.log(err));
});

export const updateBlog = createAsyncThunk(
  `blog/updateBlog`,
  async (id, updateBlog) => {
    return await axios
      .patch(`${url}/blog/${id}`, updateBlog)
      .then((resp) => console.log(`Updated SuccessFully ${resp}`))
      .catch((err) => console.log(err));
  }
);

export const deleteBlog = createAsyncThunk(`blog/deleteBlog`, async (id) => {
  return await axios
    .delete(`${url}/blog/${id}`)
    .then(() => console.log("Blog Deleted"))
    .catch((err) => console.log(err));
});

const initialState = {
  blogs: [],
  blog: {},
  isLoading: true,
  editBlogId: "",
  isEditing: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setEditBlog: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
    },
  },
  extraReducers: {
    [getBlogs.pending]: (state) => {
      state.isLoading = true;
      console.log("Pending");
    },
    [getBlogs.fulfilled]: (state, action) => {
      console.log(action);
      console.log("FullFilled", action.payload);
      state.isLoading = false;
      state.blogs = action.payload;
    },
    [getBlogs.rejected]: (state) => {
      console.log("Rejected");
      state.isLoading = false;
    },
    [getBlog.fulfilled]: (state, action) => {
      console.log(action);
      console.log("FullFilled get Blog", action.payload);
      state.isLoading = false;
      state.blog = action.payload;
    },
    [createBlog.fulfilled]: (state, action) => {
      console.log(action);
      console.log(action.payload);
      console.log("FullFilled Post Blog", action.payload);
      state.isLoading = false;
      state.blogs = action.payload;
    },
    [updateBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [updateBlog.fulfilled]: (state, { payload }) => {
      console.log("FullFilled Update Blog", payload);
      state.isLoading = false;
      state.blogs.map((blog) => {
        return blog._id === payload._id ? payload : blog;
      });
      console.log(`Blog Modified!`);
    },
    [updateBlog.rejected]: (state) => {
      state.isLoading = true;
    },
    [deleteBlog.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setEditBlog } = blogSlice.actions;

export default blogSlice.reducer;
