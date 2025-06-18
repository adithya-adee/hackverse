import { apiSlice } from "@/store/apiSlice";
import type { RoleRequest, UserRole } from "@/types/core_interfaces";

export interface CreateRoleRequestDto {
  roleType: "MODERATOR" | "ORGANIZER" | "ADMIN";
  reason: string;
  supportingUrl?: string;
}

export const roleRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoleRequest: builder.mutation<RoleRequest, CreateRoleRequestDto>({
      query: (data) => ({
        url: "/role/request-role",
        method: "POST",
        body: data,
      }),
    }),

    getRoleRequest: builder.query<RoleRequest[], void>({
      query: () => ({
        url: "/role/getAllReqs",
        method: "GET",
      }),
    }),

    acceptRoleRequest: builder.mutation<UserRole, string>({
      query: (id) => ({
        url: `/role/requests/${id}/accept`,
        method: "POST",
      }),
    }),

    rejectRoleRequest: builder.mutation<RoleRequest, string>({
      query: (id) => ({
        url: `/role/requests/${id}/reject`,
        method: "POST",
      }),
    }),

    updateRoleRequestNotes: builder.mutation<
      RoleRequest,
      { id: string; notes: string }
    >({
      query: ({ id, notes }) => ({
        url: `/role/requests/${id}/notes`,
        method: "PATCH",
        body: { notes },
      }),
    }),
  }),
});

export const {
  useCreateRoleRequestMutation,
  useGetRoleRequestQuery,
  useAcceptRoleRequestMutation,
  useRejectRoleRequestMutation,
  useUpdateRoleRequestNotesMutation,
} = roleRequestApiSlice;
