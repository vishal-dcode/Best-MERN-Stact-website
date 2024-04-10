import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createOrder, updateOrder, fetchAllOrders} from './orderAPI.js';

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  },
);
export const updateOrderAsync = createAsyncThunk(
  'orders/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  },
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'orders/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  },
);
export const orderSlice = createSlice({
  name: 'orderName',
  initialState: {
    orders: [],
    status: 'fulfilled',
    orderPlaced: null,
    totalOrders: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orders.push(action.payload);
        state.orderPlaced = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        );
        state.orders[index] = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orderName.orders;
export const selectTotalOrders = (state) => state.orderName.totalOrders;
export const selectOrderPlaced = (state) => state.orderName.orderPlaced;

export const orderActions = orderSlice.actions;
export default orderSlice;
