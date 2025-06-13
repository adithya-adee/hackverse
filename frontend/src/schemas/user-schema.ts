import { z } from "zod";

export const userDetailsSchema = z.object({
  // Required fields - these must exist
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),

  // Optional fields with proper null/undefined handling
  biography: z
    .string()
    .nullish() // handles both null and undefined
    .transform((val) => val ?? ""),

  phoneNo: z
    .string()
    .nullish()
    .transform((val) => val ?? "")
    .refine((val) => val === "" || val.length >= 10, {
      message: "Phone number must be at least 10 digits if provided",
    }),

  institutionName: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),

  // Enum fields with defaults
  gender: z
    .enum(["MALE", "FEMALE", "UNSPECIFIED"])
    .nullish()
    .transform((val) => val ?? "UNSPECIFIED"),

  type: z
    .enum(["STUDENT", "PROFESSIONAL", "OTHERS"])
    .nullish()
    .transform((val) => val ?? "STUDENT"),

  // URL fields with proper validation that allows empty strings
  githubUrl: z
    .string()
    .nullish()
    .transform((val) => val ?? "")
    .refine((val) => val === "" || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),

  linkedinUrl: z
    .string()
    .nullish()
    .transform((val) => val ?? "")
    .refine((val) => val === "" || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),

  profileImageUrl: z
    .string()
    .nullish()
    .transform((val) => val ?? "")
    .refine((val) => val === "" || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),

  resumeUrl: z
    .string()
    .nullish()
    .transform((val) => val ?? "")
    .refine((val) => val === "" || val.startsWith("http"), {
      message: "Please enter a valid URL or leave blank",
    }),
});

export type UserDetailsFormValues = z.infer<typeof userDetailsSchema>;
