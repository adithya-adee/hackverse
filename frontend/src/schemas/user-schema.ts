import { z } from "zod";

export const userDetailsSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  gender: z.string(),
  phoneNo: z.string().min(10).max(10),
  type: z.string(),
  institutionName: z.string(),
  biography: z.string().max(500, "Biography too long"),
  githubUrl: z.string().url("Invalid GitHub URL"),
  linkedinUrl: z.string().url("Invalid LinkedIn URL"),
  profileImageUrl: z.string().url("Invalid image URL"),
  resumeUrl: z.string().url("Invalid resume URL"),
});

export type UserDetailsFormValues = z.infer<typeof userDetailsSchema>;
