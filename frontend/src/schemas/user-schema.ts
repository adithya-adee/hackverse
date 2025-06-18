import { z } from "zod";

export const userDetailsSchema = z.object({
  // Required fields - these must exist
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  biography: z.string().optional(),
  phoneNo: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Phone number must be at least 10 digits if provided",
    }),
  institutionName: z.string().optional(),

  // Enum fields with defaults
  gender: z.enum(["MALE", "FEMALE", "UNSPECIFIED"]).optional(),

  type: z.enum(["STUDENT", "PROFESSIONAL", "OTHERS"]).optional(),

  // URL fields with proper validation that allows empty strings
  githubUrl: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),

  linkedinUrl: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),

  profileImageUrl: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),

  resumeUrl: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),
});

export type UserDetailsFormValues = z.infer<typeof userDetailsSchema>;
