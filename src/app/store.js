import { configureStore } from "@reduxjs/toolkit";

import productSlice from "../features/products/productSlice.js";
import counterSlice from "../features/counter/counterSlice.js";

const reduxStore = configureStore({
  reducer: {
    productRedux: productSlice.reducer,
    counterRedux: counterSlice.reducer,
  },
});

export default reduxStore;
