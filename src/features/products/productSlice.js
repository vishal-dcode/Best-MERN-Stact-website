import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchProducts } from "./productAPI.js";

export const fetchAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetchProducts();
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "productsRedux",
  initialState: { products: [], state: "pending" }, // Change initialValue to initialState
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
        state.products = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.state = "rejected";
      });
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice;
