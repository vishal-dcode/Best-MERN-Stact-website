import { configureStore } from "@reduxjs/toolkit";

import productSlice from "../features/products/productSlice.js";
import usersSlice from "../features/auth/authSlice.js";
import cartSlice from "../features/cart/cartSlice.js";

const reduxStore = configureStore({
  reducer: {
    productName: productSlice.reducer,
    usersName: usersSlice.reducer,
    cartsName: cartSlice.reducer,
  },
});

export default reduxStore;
