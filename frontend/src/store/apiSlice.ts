import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        console.log("token exists");
        headers.set("Authorization", `Bearer ${token}`);
        console.log("headers set");
      }
      return headers;
    },
  }),
  
  tagTypes: ["TeamMembers", "TeamRequests"],
  endpoints: (builder) => ({}),
});
