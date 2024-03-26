import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, updateUser, signOut } from "./authAPI";

export const createUserAsync = createAsyncThunk("user/createUser", async (userData) => {
  const response = await createUser(userData);
  return response.data;
});

export const checkUserAsync = createAsyncThunk("user/checkUser", async (loginInfo) => {
  const response = await checkUser(loginInfo);
  return response.data;
});
export const updateUserAsync = createAsyncThunk("user/updateUser", async (update) => {
  const response = await updateUser(update);
  return response.data;
});
export const signOutAsync = createAsyncThunk("user/signOut", async (loginInfo) => {
  const response = await signOut(loginInfo);
  return response.data;
});

export const authSlice = createSlice({
  name: "authName",
  initialState: {
    loggedInUser: null,
    status: "fulfilled",
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "fulfilled";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.authName.loggedInUser;
export const selectError = (state) => state.authName.error;

export const authActions = authSlice.actions;
export default authSlice;
