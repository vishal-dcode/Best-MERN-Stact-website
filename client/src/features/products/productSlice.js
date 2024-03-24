import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "./productAPI";

// dispatch(fetchProductsAsync({pagination, filter, sort}))
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProductsAsync",
  // "products/fetchProducts", //! May be this is correct

  async ({ pagination, filter, sort }) => {
    const data = await fetchProducts(pagination, filter, sort);
    return data;
  }
);
// dispatch(fetchProductByIdAsync({id}))
export const fetchProductByIdAsync = createAsyncThunk("products/fetchProductById", async ({ id }) => {
  const data = await fetchProductById(id);
  return data;
});

const productSlice = createSlice({
  name: "productName",
  initialState: { products: [], totalItems: 100, selectedProduct: null },
  reducers: {
    // totalItemsState: (state, action) => {
    //   state.totalItems = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // //! fetchProductsAsync
      .addCase(fetchProductsAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.state = "fulfilled";
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.state = "rejected";
      })

      //! fetchProductByIdAsync
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const productActions = productSlice.actions;
export default productSlice;
