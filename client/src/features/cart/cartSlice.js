import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCart } from "./cartAPI.js";

export const addCartAsync = createAsyncThunk("carts/addCart", async () => {
  const res = await addCart();
  return res.data;
});
// export const fetchCartByUserAsync = createAsyncThunk("carts/fetchCartByUser", async (userId) => {
//   const res = await fetchCartByUser(userId);
//   return res.data;
// });
// export const updateCartAsync = createAsyncThunk("cart/updateCart", async (update) => {
//   const res = await updateCart(update);
//   return res.data;
// });
// export const removeCartAsync = createAsyncThunk("cart/removeCart", async (itemId) => {
//   const res = await removeCart(itemId);
//   return res.data;
// });

const cartSlice = createSlice({
  name: "cartsName", // import for useSelector(store=>store.CartReduxName)
  initialState: { carts: [], state: "fulfilled", error: null }, // Change initialValue to initialState
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        state.state = "fulfilled";
        state.carts = [...state.carts, action.payload];
        console.log("Received payload:", action.payload);
      })
      .addCase(addCartAsync.rejected, (state, action) => {
        state.state = "rejected";
        state.error = action.error.message;
      });

    // .addCase(fetchCartByUserAsync.pending, (state) => {
    //   state.state = "pending";
    // })
    // .addCase(fetchCartByUserAsync.fulfilled, (state, action) => {
    //   state.state = "fulfilled";
    //   state.items = action.payload;
    // });

    // .addCase(updateCartAsync.fulfilled, (state, action) => {
    //   state.state = "fulfilled";
    //   const index = state.items.findIndex((item) => item.id === action.payload.id);
    //   state.items[index] = action.payload;
    // })
    // .addCase(removeCartAsync.fulfilled, (state, action) => {
    //   state.state = "fulfilled";
    //   const index = state.items.findIndex((item) => item.id === action.payload.id);
    //   state.items.splice(index, 1);
    // });
  },
});

export const cartActions = cartSlice.actions; // import for dispatch(updateAsync(Cart))
export default cartSlice; // import only for store.js {reducer: {CartReduxName : CartSlice.reducer}}
