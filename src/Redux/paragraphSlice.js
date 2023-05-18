import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getParagraph = createAsyncThunk(
  "paragraph/getParagraph/",
  async (number) => {
    const res = await axios(
      `https://baconipsum.com/api/?type=all-meat&paras=${number}`
    );

    return res.data;
  }
);

export const paragraphSlice = createSlice({
  name: "paragraph",
  initialState: {
    isLoading: false,
    paragraph: null,
  },
  reducers: {},
  extraReducers: {
    [getParagraph.pending]: (state) => {
      state.isLoading = true;
    },
    [getParagraph.fulfilled]: (state, action) => {
      state.paragraph = action.payload;
      state.isLoading = false;
    },
    [getParagraph.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export const { change } = paragraphSlice.actions;
export default paragraphSlice.reducer;
