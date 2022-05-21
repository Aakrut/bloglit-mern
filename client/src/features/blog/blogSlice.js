import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../utils/localStorage";

// const url = "http://localhost:5000/api/v1";

// export const getBlogs = createAsyncThunk("blog/getBlogs", async (_,thunkAPI) => {
//   return await fetch(`/api/v1/blog/`)
//     .then((resp) => resp.json())
//     .catch((err) => console.log(err));
// });

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/blog/`, {
        headers: {
          authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// export const getBlog = createAsyncThunk("blog/getBlog", async (id) => {
//   return await fetch(`/api/v1/blog/${id}`)
//     .then((resp) => resp.json())
//     .catch((err) => console.log(err));
// });

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/blog/${id}`, {
        headers: {
          authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// export const createBlog = createAsyncThunk(`blog/createBlog`, async (data) => {
//   return await axios
//     .post(`${url}/blog/`, data)
//     .then((resp) => console.log(resp.data))
//     .catch((err) => console.log(err));
// });

export const createBlog = createAsyncThunk(
  `blog/createBlog`,
  async (blog, thunkAPI) => {
    try {
      const resp = await axios.post("/api/v1/blog", blog, {
        headers: {
          authorization: `Bearer ${getTokenFromLocalStorage()}`,
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
  async ({ blogID, blog }, thunkAPI) => {
    return await axios
      .patch(`/api/v1/blog/${blogID}`, blog)
      .then((resp) => console.log(`Updated SuccessFully ${resp}`))
      .catch((err) => console.log(err));
  }
);

export const deleteBlog = createAsyncThunk(
  `blog/deleteBlog`,
  async (id, thunkAPI) => {
    return await axios
      .delete(`/api/v1/blog/${id}`)
      .then(() => console.log("Blog Deleted"))
      .catch((err) => console.log(err));
  }
);

const initialState = {
  blogs: [],
  blog: {},
  isLoading: false,
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
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
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
      state.blogs = [action.payload, ...state.blogs];
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
      // const editBlog = state.blogs.map((b) => b._id === action.payload._id ? action.payload : b)

      // return {
      //   ...state,
      //   blogs: editBlog,
      // };

      state.isLoading = false;
    },
    [updateBlog.rejected]: (state) => {
      state.isLoading = true;
    },
    [deleteBlog.pending]: (state) => {
      state.isLoading = true;
      console.log("Pending");
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    },
    [deleteBlog.rejected]: (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    },
  },
});

export const { setEditBlog } = blogSlice.actions;

export default blogSlice.reducer;
