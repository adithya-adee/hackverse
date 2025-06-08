import { apiSlice } from "@/store/apiSlice";
import type { User } from "@/types/core_interfaces";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getAllHackathons: builder.query({
      query: () => ({
        url: "/hackathons",
        method: "GET",
      }),
    }),
    getAllTeams: builder.query({
      query: () => ({
        url: "/team/count",
        method: "GET",
      }),
    }),
    getAllSubmissions: builder.query({
      query: () => ({
        url: "/registrations/submission",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllHackathonsQuery,
  useGetAllTeamsQuery,
  useGetAllSubmissionsQuery,
} = adminApiSlice;
