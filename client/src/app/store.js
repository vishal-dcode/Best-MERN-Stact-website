import { configureStore } from "@reduxjs/toolkit";

import productSlice from "../features/products/productSlice.js";
import counterSlice from "../features/counter/counterSlice.js";

const reduxStore = configureStore({
  reducer: {
    productName: productSlice.reducer,
    counterName: counterSlice.reducer,
  },
});

export default reduxStore;
