import { apiSlice } from "@/store/apiSlice";

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new team
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/team",
        method: "POST",
        body: data,
      }),
    }),

    updateTeam: builder.mutation({
      query: (data) => ({
        url: "/team",
        method: "PATCH",
        body: data,
      }),
    }),

    // Get all teams looking for members for a specific hackathon
    getTeamsLookingForMembers: builder.query({
      query: (hackathonId) => ({
        url: `/team/hackathon/${hackathonId}/looking-for-members`,
        method: "GET",
      }),
    }),

    // Get a specific team's details
    getTeamById: builder.query({
      query: (teamId) => ({
        url: `/team/${teamId}`,
        method: "GET",
      }),
    }),

    // Get all members of a specific team
    getTeamMembers: builder.query({
      query: (teamId) => ({
        url: `/team/${teamId}/members`,
        method: "GET",
      }),
    }),

    // Get all pending requests for a team
    getTeamRequests: builder.query({
      query: (teamId) => ({
        url: `/team/${teamId}/requests`,
        method: "GET",
      }),
    }),

    // Get all team requests for current user
    getUserTeamRequests: builder.query({
      query: () => ({
        url: "/team/all-team-reqs",
        method: "GET",
      }),
    }),

    // Create a team request (join a team)
    createTeamRequest: builder.mutation({
      query: (data) => ({
        url: "/team/team-req",
        method: "POST",
        body: data,
      }),
    }),

    // Accept a team request
    acceptTeamRequest: builder.mutation({
      query: ({ teamId, userId }) => ({
        url: `/team/${teamId}/accept-request/${userId}`,
        method: "POST",
      }),
    }),

    // Reject a team request
    rejectTeamRequest: builder.mutation({
      query: ({ teamId, userId }) => ({
        url: `/team/${teamId}/reject-request/${userId}`,
        method: "DELETE",
      }),
    }),

    // Check registration status
    checkRegistration: builder.query({
      query: (hackathonId) => ({
        url: `/team/${hackathonId}/registration`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamsLookingForMembersQuery,
  useGetTeamByIdQuery,
  useGetTeamMembersQuery,
  useGetTeamRequestsQuery,
  useGetUserTeamRequestsQuery,
  useCreateTeamRequestMutation,
  useAcceptTeamRequestMutation,
  useRejectTeamRequestMutation,
  useCheckRegistrationQuery,
  useUpdateTeamMutation,
} = teamApiSlice;
