import z from "zod";

export const userRolePatchSchema = z.object({
  playerId: z.string(),
});
