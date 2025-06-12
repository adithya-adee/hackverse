import { z } from "zod";

export const userDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  biography: z.string().optional(),
  phoneNo: z.string().min(10, "Invalid phone number").optional(),
  gender: z.enum(["MALE", "FEMALE", "UNSPECIFIED"] as const),
  institutionName: z.string().optional(),
  type: z.enum(["STUDENT", "PROFESSIONAL", "OTHERS"] as const),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  profileImageUrl: z.string().url().optional().or(z.literal("")),
  resumeUrl: z.string().url().optional().or(z.literal("")),
});

export type UserDetailsFormValues = z.infer<typeof userDetailsSchema>;
