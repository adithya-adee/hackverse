import Cookies from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null;
  isLoggedIn: boolean;
  userStats: any | null;
}

// Helper to safely parse cookie JSON
function getCookieJSON(key: string) {
  try {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  user: getCookieJSON("user"),
  token: Cookies.get("token") || null,
  isLoggedIn: Cookies.get("isLoggedIn") === "true",
  userStats: getCookieJSON("userStats"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (
      state,
      action: PayloadAction<{
        user: any;
        access_token: string;
        userStats: any;
      }>
    ) => {
      console.log(action.payload);
      const { user, access_token, userStats } = action.payload;
      state.user = user;
      state.token = access_token;
      state.isLoggedIn = !!user && !!access_token;
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      Cookies.set("token", access_token, {
        expires: 7,
      });
      Cookies.set("isLoggedIn", "true", {
        expires: 7,
      });
      Cookies.set("userStats", JSON.stringify(userStats), {
        expires: 7,
      });
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("isLoggedIn");
    },
  },
});

export const { setUserCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;
