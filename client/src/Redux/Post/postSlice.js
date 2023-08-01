import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allPost, getPost } from "../../Utils/api";

export const getAllData = createAsyncThunk(
  "post",
  async (args, { rejectWithValue }) => {
    try {
      const res = await allPost();
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getAllData.pending]: (state) => {
      state.loading = true;
    },
    [getAllData.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [getAllData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
