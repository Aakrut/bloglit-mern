import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (page, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/blog?page=${page}`, {
        headers: {
          authorization: `Bearer ${getUserFromLocalStorage().token}`,
        },
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/blog/${id}`, {
        headers: {
          authorization: `Bearer ${getUserFromLocalStorage().token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createBlog = createAsyncThunk(
  `blog/createBlog`,
  async (blog, thunkAPI) => {
    try {
      const resp = await axios.post("/api/v1/blog", blog, {
        headers: {
          authorization: `Bearer ${getUserFromLocalStorage().token}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        removeUserFromLocalStorage();
        removeTokenFromLocalStorage();
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateBlog = createAsyncThunk(
  `blog/updateBlog`,
  async ({ blogId, blog }, thunkAPI) => {
    try {
      const resp = await axios.patch(`/api/v1/blog/${blogId}`, blog, {
        headers: {
          authorization: `Bearer ${getUserFromLocalStorage().token}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        removeUserFromLocalStorage();
        removeTokenFromLocalStorage();
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  `blog/deleteBlog`,
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(`/api/v1/blog/${id}`, {
        headers: {
          authorization: `Bearer ${getUserFromLocalStorage().token}`,
        },
      });
      return resp.data.msg;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  blogs: [],
  blog: {},
  isLoading: false,
  editBlogId: "",
  isEditing: false,
  currentPage: 1,
  numberOfPages:null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setEditBlog: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: {
    [getBlogs.pending]: (state) => {
      state.isLoading = true;
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blogs = [...action.payload.blog];
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getBlogs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    [getBlog.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [createBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blogs = [...state.blogs, action.payload];
      toast.success("Your Blog Published SuccessFully!");
    },
    [createBlog.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updateBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Your Blog Updated SuccessFully!");
    },
    [updateBlog.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Your Blog Deleted SuccessFully!");
    },
    [deleteBlog.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { setEditBlog, setCurrentPage } = blogSlice.actions;

export default blogSlice.reducer;
