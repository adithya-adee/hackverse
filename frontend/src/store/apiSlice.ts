import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_NESTJS_API_URL || "http://localhost:3001",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        if (!process.env.NEXT_PUBLIC_NESTJS_API_URL) {
          console.log("NO");
        }
        console.log("token get");
        headers.set("Authorization", `Bearer ${token}`);
        console.log("headers set");
      }
      return headers;
    },
  }),

  tagTypes: [
    "User",
    "UserProfile",
    "Skills",
    "TeamRequests",
    "TeamMembers",
    "OrganizerData",
  ],
  endpoints: (builder) => ({}),
});
