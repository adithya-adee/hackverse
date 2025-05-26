import { createSlice } from "@reduxjs/toolkit";

// Next.js Caching Strategy: Use cookies for SSR/ISR/CSR compatibility, not localStorage.
// Helper functions to safely access cookies on both server/client.
const getCookie = (name: string): string | null => {
  if (typeof window !== "undefined") {
    // Client: document.cookie
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift() ?? null;
    return null;
  } else {
    // Server: SSR — cookies must be read from incoming request, so we can't access here.
    // You must pass cookies from getServerSideProps or API to Redux initial state.
    return null;
  }
};

// Parse cookie value safely
const parseCookie = (key: string, fallback: any) => {
  try {
    const value = getCookie(key);
    return value ? JSON.parse(decodeURIComponent(value)) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  user: parseCookie("user", null),
  isLoggedIn: parseCookie("loginStatus", false),
  token: parseCookie("token", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof document !== "undefined") {
        document.cookie = `loginStatus=${encodeURIComponent(
          JSON.stringify(state.isLoggedIn)
        )}; path=/;`;
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(state.user)
        )}; path=/;`;
        document.cookie = `token=${encodeURIComponent(
          JSON.stringify(state.token)
        )}; path=/;`;
      }
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      if (typeof document !== "undefined") {
        document.cookie =
          "loginStatus=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
    },
  },
});

export const { logoutUser, setUserCredentials } = authSlice.actions;
export default authSlice.reducer;
