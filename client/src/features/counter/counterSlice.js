import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";

export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
  const response = await fetchCount(amount);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    status: "idle",
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const selectCount = (state) => state.counter.value;

export const counterActions = counterSlice.actions;
export default counterSlice;
