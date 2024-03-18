import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCart } from "./cartAPI.js";

export const fetchAsync = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetchCart();
  return res.data;
});

const cartSlice = createSlice({
  name: "cartRedux",
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
        state.cart = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.state = "rejected";
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
