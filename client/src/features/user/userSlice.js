import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
  updateUser,
} from './userAPI.js';

export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  },
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    // this is name mistake
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const userOrdersSlice = createSlice({
  name: 'userOrderName',
  initialState: {
    userInfo: null,
    userOrders: [],
    status: 'fulfilled',
  },
  reducers: {
    increment: (state) => {
      state.user += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        // earlier there was loggedInUser variable in other slice
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        // this info can be different or more from logged-in User info
        state.userOrders = action.payload;
      });
  },
});

export const selectUserInfo = (state) => state.userOrderName.userOrders;
export const selectUserOrders = (state) =>
  state.userOrderName.userOrders.orders;

export const userOrdersActions = userOrdersSlice.actions;
export default userOrdersSlice;
