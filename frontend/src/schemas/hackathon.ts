// lib/schemas/hackathon.ts
import { z } from "zod";

export const hackathonStep1Schema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be less than 100 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(1000, "Description must be less than 1000 characters"),
    mode: z.enum(["ONLINE", "OFFLINE", "HYBRID"]),
    location: z.string().optional(),
    maxTeamSize: z.number().min(1, "Team size must be at least 1"),
    registrationDate: z.string().min(1, "Registration deadline is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    bannerImageUrl: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      const regDate = new Date(data.registrationDate);
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      return regDate < startDate;
    },
    {
      message: "Registration deadline must be before start date",
      path: ["registrationDate"],
    },
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      return startDate < endDate;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      if (data.mode === "OFFLINE" || data.mode === "HYBRID") {
        return data.location && data.location.trim().length > 0;
      }
      return true;
    },
    {
      message: "Location is required for offline/hybrid events",
      path: ["location"],
    },
  );

export const hackathonStep2Schema = z.object({
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  tabs: z
    .array(
      z.object({
        title: z.string().min(1, "Tab title is required"),
        content: z.string().min(1, "Tab content is required"),
        order: z.number(),
        isVisible: z.boolean(),
      }),
    )
    .min(1, "At least one tab is required"),
  moderatorEmails: z
    .array(z.string().email("Please enter valid email addresses"))
    .optional(),
});

export const hackathonCompleteSchema = z.intersection(
  hackathonStep1Schema,
  hackathonStep2Schema,
);

export type HackathonStep1Data = z.infer<typeof hackathonStep1Schema>;
export type HackathonStep2Data = z.infer<typeof hackathonStep2Schema>;
export type HackathonCompleteData = z.infer<typeof hackathonCompleteSchema>;
