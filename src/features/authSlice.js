// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Store the user object when logged in
  status: 'idle', // idle | loading | succeeded | failed (for login/logout requests)
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; 
      state.status = 'succeeded';
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.status = 'failed';
      state.error = action.payload; 
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
    },
  },
});

export const { setUser, loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
