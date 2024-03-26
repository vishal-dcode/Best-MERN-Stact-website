import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userAPI.js";

export const fetchUserOrdersAsync = createAsyncThunk("user/fetchUserOrders", async (id) => {
  const response = await fetchUserOrders(id);
  return response.data;
});

export const userOrdersSlice = createSlice({
  name: "userOrderName",
  initialState: {
    userOrders: [],
    status: "fulfilled",
  },
  reducers: {
    increment: (state) => {
      state.user += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.userOrderName.userOrders;

export const userOrdersActions = userOrdersSlice.actions;
export default userOrdersSlice;
