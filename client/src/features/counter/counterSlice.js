import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCounter } from "./counterAPI.js";

export const fetchAsync = createAsyncThunk("counter/fetchCounter", async () => {
  const res = await fetchCounter();
  return res.data;
});

const counterSlice = createSlice({
  name: "counterName",
  initialState: {}, // Change initialValue to initialState
  reducers: {
    toggle: (state, action) => {
      return action.payload; // Update the state correctly
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.state = "fulfilled";
        state.counter = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.state = "rejected";
      });
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice;
