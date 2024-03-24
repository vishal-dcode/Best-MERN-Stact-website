import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUsers, checkUsers } from "./authAPI.js";

export const createUsersAsync = createAsyncThunk("users/createUsers", async (userData) => {
  const res = await createUsers(userData);
  return res.data;
});
export const checkUsersAsync = createAsyncThunk("users/checkUsers", async (loginInfo) => {
  const res = await checkUsers(loginInfo);
  return res.data;
});

const usersSlice = createSlice({
  name: "usersName", // import for useSelector(store=>store.productsName.products)
  initialState: { users: null, state: "fulfilled" }, // Change initialValue to initialState
  reducers: {
    // increment: (state, action) => {
    //   return action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUsersAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(createUsersAsync.fulfilled, (state, action) => {
        state.state = "fulfilled";
        state.users = action.payload;
      })
      .addCase(createUsersAsync.rejected, (state) => {
        state.state = "rejected";
      })

      .addCase(checkUsersAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(checkUsersAsync.fulfilled, (state, action) => {
        state.state = "fulfilled";
        state.users = action.payload;
      });
  },
});

export const selectLoggedInUsers = (state) => state.usersName.users;
export const usersActions = usersSlice.actions; // import for dispatch(addAsync(products))
export default usersSlice; // import only for store.js {reducer: {usersName : usersSlice.reducer}}
