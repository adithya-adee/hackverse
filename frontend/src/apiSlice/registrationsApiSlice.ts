import { apiSlice } from "@/store/apiSlice";

export const registrationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Check if current user is registered
    checkRegistration: builder.query({
      query: (hackathonId) => {
        return {
          url: `/registrations/check/${hackathonId}`,
          method: "GET",
        };
      },
    }),

    //get all registered users for a perticular hacathon
    getAllParticipants: builder.query({
      query: (hackathonId) => ({
        url: `/registrations/all/${hackathonId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCheckRegistrationQuery, useGetAllParticipantsQuery } =
  registrationApiSlice;
