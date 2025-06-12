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
    registerForHackathon: builder.mutation({
      query: ({ hackathonId, userData }) => ({
        url: `/hackathons/${hackathonId}/register`,
        method: "POST",
        body: userData,
      }),
    }),
    getHackathonDetails: builder.query({
      query: (hackathonId) => ({
        url: `/hackathons/${hackathonId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useRegisterForHackathonMutation,
  useGetHackathonDetailsQuery
} = hackathonApiSlice;
