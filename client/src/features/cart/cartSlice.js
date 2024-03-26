import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemFromCart, fetchItemsByUserId, updateCart, emptyCart } from "./cartAPI";

const initialState = {
  status: "fulfilled",
  items: [],
};

export const addToCartAsync = createAsyncThunk("cart/addToCart", async (item) => {
  const response = await addToCart(item);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchItemsByUserIdAsync = createAsyncThunk("cart/fetchItemsByUserId", async (userId) => {
  const response = await fetchItemsByUserId(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const updateCartAsync = createAsyncThunk("cart/updateCart", async (update) => {
  const response = await updateCart(update);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const deleteItemFromCartAsync = createAsyncThunk("cart/deleteItemFromCart", async (itemId) => {
  const response = await deleteItemFromCart(itemId);
  return response.data;
});
export const emptyCartAsync = createAsyncThunk("cart/emptyCart", async (userId) => {
  const response = await emptyCart(userId);
  return response.data;
});
export const cartSlice = createSlice({
  name: "cartName",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(emptyCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(emptyCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cartName.items;

export const cartActions = cartSlice.actions;
export default cartSlice;
