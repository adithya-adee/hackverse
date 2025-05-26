import { apiSlice } from "@/store/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: ({ user }) => ({
        url: "/dashboard/profile",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApiSlice;
