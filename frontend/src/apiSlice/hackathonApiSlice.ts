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
    getAllEvents: builder.query({
      query: () => ({
        url: "/hackathons/events",
        method: "GET",
      }),
    }),
    getHackathonById: builder.query({
      query: (hackathonId) => ({
        url: `/hackathons/${hackathonId}`,
        method: "GET",
      }),
    }),
    getTeamsByHackathonId: builder.query({
      query: (hackathonId) => ({
        url: `/hackathons/${hackathonId}/teams`,
        method: "GET",
      }),
    }),
    getSubmissionsByHackathonId: builder.query({
      query: (hackathonId) => ({
        url: `/hackathons/${hackathonId}/submissions`,
        method: "GET",
      }),
    }),
    getParticipantsByHackathonId: builder.query({
      query: (hackathonId) => ({
        url: `/hackathons/${hackathonId}/participants`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useRegisterForHackathonMutation,
  useGetHackathonDetailsQuery,
  useGetAllEventsQuery,
  useGetHackathonByIdQuery,
  useGetTeamsByHackathonIdQuery,
  useGetSubmissionsByHackathonIdQuery,
  useGetParticipantsByHackathonIdQuery,
} = hackathonApiSlice;
