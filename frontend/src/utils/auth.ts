// utils/auth.ts
import Cookies from "js-cookie";

export function getAuthToken() {
  return Cookies.get("token");
}

export function getLoggedInUser() {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
}

export function isUserLoggedIn() {
  return Cookies.get("isLoggedIn") === "true";
}
