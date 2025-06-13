import { apiSlice } from "@/store/apiSlice";
import { TeamRequest, type User } from "@/types/core_interfaces";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<User, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      keepUnusedDataFor: 300,
    }),
    getTeamRequests: builder.query<TeamRequest[], void>({
      query: () => ({
        url: "/team/all-team-reqs",
        method: "GET",
      }),
      keepUnusedDataFor: 150,
      transformResponse: (response: TeamRequest[] | null) => response || [],
    }),
    updateUserProfile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
    registerTeam: builder.mutation({
      query: ({ hackathonId, teamData }) => ({
        url: `/hackathons/${hackathonId}/teams`,
        method: "POST",
        body: teamData,
      }),
    }),
    updateSkills: builder.mutation<void, { userId: string; skills: string[] }>({
      query: ({ userId, skills }) => ({
        url: `/users/${userId}/skills`,
        method: "PATCH",
        body: { skills },
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetTeamRequestsQuery,
  useUpdateUserProfileMutation,
  useRegisterTeamMutation,
  useUpdateSkillsMutation, // Export the new mutation
} = userApiSlice;
