import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productName",
  initialState: { products: [] },
  reducers: {
    productDataState: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
