import { apiSlice } from "@/store/apiSlice";
import type { RoleRequest } from "@/types/core_interfaces";

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
    getRoleRequest: builder.query({
      query: () => ({
        url: "/role/getAllReqs",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateRoleRequestMutation, useGetRoleRequestQuery } =
  roleRequestApiSlice;
