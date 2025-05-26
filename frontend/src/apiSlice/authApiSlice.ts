import { apiSlice } from "@/store/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ user }) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),

    // signup:
    signup: builder.mutation({
      query: ({ user }) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),

    //rest...
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
