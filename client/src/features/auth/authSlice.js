import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchAuth } from "./authAPI.js";

export const fetchAsync = createAsyncThunk("auth/fetchAuth", async () => {
  const res = await fetchAuth();
  return res.data;
});

const authSlice = createSlice({
  name: "authName",
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
        state.auth = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.state = "rejected";
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
