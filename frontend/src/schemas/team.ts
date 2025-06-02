import { z } from "zod";
export const createTeamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters"),
  description: z.string().optional(),
  hackathonId: z.string().min(1, "Please select a hackathon"),
  lookingForMembers: z.boolean(),
  requiredSkills: z.string().optional(),
});

export type CreateTeamValues = z.infer<typeof createTeamSchema>;
