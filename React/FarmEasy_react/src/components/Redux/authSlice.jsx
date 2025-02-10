import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    signup(state,action){
      state.isAuthenticated=true;
      state.user=action.payload;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload; // Store user details
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout,signup } = authSlice.actions;
export default authSlice.reducer;
