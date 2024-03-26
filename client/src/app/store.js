import { configureStore } from "@reduxjs/toolkit";

import productSlice from "../features/product/productSlice";
import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import orderSlice from "../features/order/orderSlice";
import userOrdersSlice from "../features/user/userSlice";

export const reduxStore = configureStore({
  reducer: {
    productName: productSlice.reducer,
    authName: authSlice.reducer,
    cartName: cartSlice.reducer,
    orderName: orderSlice.reducer,
    userOrderName: userOrdersSlice.reducer,
  },
});
