import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isLoggedIn: localStorage.getItem("loginStatus")
    ? JSON.parse(localStorage.getItem("loginStatus")!)
    : false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("loginStatus", JSON.stringify(state.isLoggedIn));
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("at", JSON.stringify(state.token));
    },
    logoutUser: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("loginStatus");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { logoutUser, setUserCredentials } = authSlice.actions;
export default authSlice.reducer;
