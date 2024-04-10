import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  // fetchAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
} from './productAPI';

// export const fetchAllProductsAsync = createAsyncThunk(
//   'product/fetchAllProducts',
//   async () => {
//     const response = await fetchAllProducts();
//     return response.data;
//   },
// );
export const addProductAsync = createAsyncThunk(
  'product/addProduct',
  async (product) => {
    const response = await addProduct(product);
    return response.data;
  },
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  },
);
export const deleteProductAsync = createAsyncThunk(
  'product/deleteProduct',
  async (product) => {
    const response = await deleteProduct(product);
    return response.data;
  },
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  },
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter, sort, pagination, admin}) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      pagination,
      admin,
    );
    return response.data;
  },
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const productSlice = createSlice({
  name: 'productName',
  initialState: {
    products: [],
    brands: [],
    categories: [],
    status: 'fulfilled',
    totalItems: 100,
    selectedProduct: null,
  },
  reducers: {
    resetProductForm: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchAllProductsAsync.pending, (state) => {
      //   state.status = 'pending';
      // })
      // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //   state.status = 'fulfilled';
      //   state.products = action.payload;
      // })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.products = action.payload.products;
        // state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.categories = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.selectedProduct = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        state.products.splice(index, 1);
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.selectedProduct = [];
      });
  },
});

export const selectAllProducts = (state) => state.productName.products;
export const selectBrands = (state) => state.productName.brands;
export const selectCategories = (state) => state.productName.categories;
export const selectProductById = (state) => state.productName.selectedProduct;
export const selectTotalItems = (state) => state.productName.totalItems;
export const selectStatus = (state) => state.productName.status;

export const productActions = productSlice.actions;
export default productSlice;
