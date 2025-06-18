import { apiSlice } from "@/store/apiSlice";
import { TeamRequest, type User } from "@/types/core_interfaces";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<User, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["UserProfile", "Skills"],
      keepUnusedDataFor: 300,
    }),

    getTeamRequestsByUser: builder.query<TeamRequest[], void>({
      query: () => ({
        url: "/team/all-team-reqs-by-user",
        method: "GET",
      }),
      providesTags: ["TeamRequests"],
      keepUnusedDataFor: 300,
      transformResponse: (response: TeamRequest[] | null) => response || [],
    }),
    getTeamRequestByTeam: builder.query<TeamRequest[], void>({
      query: () => ({
        url: "/team/all-team-reqs-by-team",
        method: "GET",
      }),
      providesTags: ["TeamRequests"],
      keepUnusedDataFor: 300,
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

    updateUserProfile: builder.mutation<
      User,
      { id: string; data: Partial<User> }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}/profile`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UserProfile"],
    }),

    registerTeam: builder.mutation<any, { hackathonId: string; teamData: any }>(
      {
        query: ({ hackathonId, teamData }) => ({
          url: `/hackathons/${hackathonId}/teams`,
          method: "POST",
          body: teamData,
        }),
      }
    ),

    updateSkills: builder.mutation<void, { userId: string; skills: string[] }>({
      query: ({ userId, skills }) => ({
        url: `/users/${userId}/skills`,
        method: "PATCH",
        body: { skills },
      }),
      invalidatesTags: ["Skills"],
    }),

    deleteSkills: builder.mutation<void, { skillId: string }>({
      query: ({ skillId }) => ({
        url: `/users/skills`,
        method: "DELETE",
        body: { id: skillId },
      }),
      invalidatesTags: ["Skills"],
    }),

    deleteUserSkill: builder.mutation<
      { Skill: { id: string; name: string }[] },
      { userId: string; skillId: string }
    >({
      query: ({ userId, skillId }) => ({
        url: `/users/${userId}/skills/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),

    getHackathonsByOrganizer: builder.query<any[], void>({
      query: () => ({
        url: "/users/organizer/hackathons",
        method: "GET",
      }),
      providesTags: ["OrganizerData"],
    }),

    getTeamsByOrganizer: builder.query<any[], void>({
      query: () => ({
        url: "/users/organizer/teams",
        method: "GET",
      }),
      providesTags: ["OrganizerData"],
    }),

    getSubmissionsByOrganizer: builder.query<any[], void>({
      query: () => ({
        url: "/users/organizer/submissions",
        method: "GET",
      }),
      providesTags: ["OrganizerData"],
    }),

    getParticipantsByOrganizer: builder.query<any[], void>({
      query: () => ({
        url: "/users/organizer/participants",
        method: "GET",
      }),
      providesTags: ["OrganizerData"],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
  useRegisterTeamMutation,
  useUpdateSkillsMutation,
  useDeleteSkillsMutation,
  useGetHackathonsByOrganizerQuery,
  useGetTeamsByOrganizerQuery,
  useGetSubmissionsByOrganizerQuery,
  useGetParticipantsByOrganizerQuery,
  useLazyIsRegisteredQuery,
  useDeleteUserSkillMutation,
  useGetTeamRequestByTeamQuery,
  useGetTeamRequestsByUserQuery,
} = userApiSlice;
