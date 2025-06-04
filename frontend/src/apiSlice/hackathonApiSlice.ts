import { apiSlice } from "@/store/apiSlice";

export const hackathonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: ({ data }) => ({
        url: "/hackathons/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateMutation } = hackathonApiSlice;
