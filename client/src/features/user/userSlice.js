import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../utils/localStorage';

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
    try {
        const resp = await axios.post('/api/v1/auth/register', user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
    try {
       const resp = await axios.post("/api/v1/auth/login", user);
       return resp.data;
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const initialState = {
    isLoading: false,
    user:getUserFromLocalStorage(),
}

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
      toast.success(`Hello There ${user.username}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
      toast.success(`Hello There ${user.username}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;