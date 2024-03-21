import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productName",
  initialState: { products: [], totalItems: 101, selectedProduct: null },
  reducers: {
    productDataState: (state, action) => {
      state.products = action.payload;
    },
    totalItemsState: (state, action) => {
      state.totalItems = action.payload;
    },
    selectedProductState: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
