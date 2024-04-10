import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {checkUser, createUser, signOut} from './authAPI';
import {updateUser} from '../user/userAPI';

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  },
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  },
);
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    return response.data;
  },
);

export const authSlice = createSlice({
  name: 'authName',
  initialState: {
    loggedInUser: null,
    status: 'fulfilled',
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
        state.status = 'pending';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'fulfilled';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.authName.loggedInUser;
export const selectError = (state) => state.authName.error;

export const authActions = authSlice.actions;
export default authSlice;
