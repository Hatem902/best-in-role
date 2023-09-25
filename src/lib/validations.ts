import z from "zod";

export const userPatchSchema = z.object({
  topId: z.number().optional(),
  jglId: z.number().optional(),
  midId: z.number().optional(),
  adcId: z.number().optional(),
  suppId: z.number().optional(),
});
