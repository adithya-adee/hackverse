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
      invalidatesTags: (result, error, { teamId }) => [
        { type: "TeamMembers", id: teamId },
        { type: "TeamRequests", id: teamId },
      ],
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

    getTeamByHackathonMember: builder.query({
      query: ({ memberId, hackathonId }) => ({
        url: `team/by-member-hackathon?memberId=${memberId}&hackathonId=${hackathonId}`,
        method: "GET",
      }),
    }),

    deleteTeam: builder.mutation({
      query: (teamId) => ({
        url: `team/${teamId}`,
        method: "DELETE",
      }),
      invalidatesTags: ({ teamId }) => [
        { type: "TeamMembers", id: teamId },
        { type: "TeamRequests", id: teamId },
      ],
    }),

    // Get all members of a specific team
    getTeamMembers: builder.query({
      query: (teamId) => ({
        url: `/team/${teamId}/members`,
        method: "GET",
      }),
      providesTags: (teamId) => [{ type: "TeamMembers", id: teamId }],
    }),

    // Get all pending requests for a team
    getTeamRequestsForATeamByTeam: builder.query({
      query: (teamId) => ({
        url: `/team/${teamId}/requests-by-team`,
        method: "GET",
      }),
      providesTags: (teamId) => [{ type: "TeamRequests", id: teamId }],
    }),

    getTeamRequestsForATeambyParticipants: builder.query({
      query: (teamId) => ({
        url: `/team/${teamId}/requests-by-participants`,
        method: "GET",
      }),
      providesTags: (teamId) => [{ type: "TeamRequests", id: teamId }],
    }),

    // Get all team requests by perticular user
    getUserTeamRequestsByUser: builder.query({
      query: () => ({
        url: "/team/all-team-reqs-by-user",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? result.map((req: any) => ({ type: "TeamRequests", id: req.teamId }))
          : [{ type: "TeamRequests" }],
    }),

    // Get all team Requests for Current User by the teams
    getUserTeamRequestsByTeam: builder.query({
      query: () => ({
        url: "/team/all-team-reqs-by-team",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? result.map((req: any) => ({ type: "TeamRequests", id: req.teamId }))
          : [{ type: "TeamRequests" }],
    }),

    // Create a team request (join a team)
    createTeamRequest: builder.mutation({
      query: (data) => ({
        url: "/team/team-req",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ({ teamId }) => [
        { type: "TeamMembers", id: teamId },
        { type: "TeamRequests", id: teamId },
      ],
    }),

    // Accept a team request
    acceptTeamRequest: builder.mutation({
      query: ({ teamId, userId }) => ({
        url: `/team/${teamId}/accept-request-by-team/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ({ teamId }) => [
        { type: "TeamMembers", id: teamId },
        { type: "TeamRequests", id: teamId },
      ],
    }),

    acceptTeamRequestByPart: builder.mutation({
      query: ({ teamId, userId }) => ({
        url: `/team/${teamId}/accept-request-by-part/${userId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: "TeamMembers", id: teamId },
        { type: "TeamRequests", id: teamId },
      ],
    }),

    // Reject a team request
    rejectTeamRequest: builder.mutation({
      query: ({ teamId, userId }) => ({
        url: `/team/${teamId}/reject-request/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { teamId }) => [
        { type: "TeamMembers", id: teamId },
        { type: "TeamRequests", id: teamId },
      ],
    }),

    isLeader: builder.query({
      query: (teamId) => ({
        url: `team/isLeader/${teamId}`,
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
  useCreateTeamRequestMutation,
  useAcceptTeamRequestMutation,
  useRejectTeamRequestMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useGetTeamRequestsForATeamByTeamQuery,
  useGetTeamRequestsForATeambyParticipantsQuery,
  useAcceptTeamRequestByPartMutation,
  useGetUserTeamRequestsByTeamQuery,
  useGetUserTeamRequestsByUserQuery,
  useGetTeamByHackathonMemberQuery,
  useIsLeaderQuery,
} = teamApiSlice;
