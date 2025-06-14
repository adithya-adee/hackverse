import { apiSlice } from "@/store/apiSlice";
import { TeamRequest, type User } from "@/types/core_interfaces";
import { url } from "inspector";

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

    isRegistered: builder.query<
      { isRegistered: boolean; user: User },
      { memberEmail: string }
    >({
      query: ({ memberEmail }) => ({
        url: `users/isRegistered?email=${encodeURIComponent(memberEmail)}`,
        method: "GET",
      }),
    }),

    updateUserProfile: builder.mutation({
      query: ({ id, data }) => {
        console.log("updating user...", id);
        console.log("Sending update data:", data);
        return {
          url: `/users/${id}/profile`,
          method: "PATCH",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
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

    getHackathonsByOrganizer: builder.query({
      query: () => ({
        url: "/users/organizer/hackathons",
        method: "GET",
      }),
    }),

    getTeamsByOrganizer: builder.query({
      query: () => ({
        url: "/users/organizer/teams",
        method: "GET",
      }),
    }),

    getSubmissionsByOrganizer: builder.query({
      query: () => ({
        url: "/users/organizer/submissions",
        method: "GET",
      }),
    }),

    getParticipantsByOrganizer: builder.query({
      query: () => ({
        url: "/users/organizer/participants",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetTeamRequestsQuery,
  useUpdateUserProfileMutation,
  useRegisterTeamMutation,
  useUpdateSkillsMutation,
  useGetHackathonsByOrganizerQuery,
  useGetTeamsByOrganizerQuery,
  useGetSubmissionsByOrganizerQuery,
  useGetParticipantsByOrganizerQuery,
  useLazyIsRegisteredQuery,
} = userApiSlice;
