import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = 'http://localhost:5000/api/v1'

export const getBlogs = createAsyncThunk('blog/getBlogs', async () => {
    return await fetch(`${url}/blog/`).then((resp) => resp.json()).catch((err) => console.log(err));
});

export const getBlog = createAsyncThunk('blog/getBlog', async(id) => {
    return await fetch(`${url}/blog/${id}`).then((resp) => resp.json()).catch((err) => console.log(err));
})

const initialState = {
    blogs: [],
    blog: {},
    isLoading: true,
}

export const blogSlice = createSlice({
  name: "blog",
  initialState,
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
   
  },
});

export default blogSlice.reducer; 