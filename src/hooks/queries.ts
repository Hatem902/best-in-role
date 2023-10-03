"use client";
import { roles } from "@/config";
import { userRolePatchSchema } from "@/lib/validations";
import { Votes } from "@/types/votes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as z from "zod";

export const useVotesQuery = () =>
  useQuery({
    queryKey: ["votes"],
    queryFn: async (): Promise<Votes> => (await axios.get("/api/votes/")).data,
  });

export const useVoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      role,
      playerId,
    }: {
      role: (typeof roles)[number];
      playerId: z.infer<typeof userRolePatchSchema>;
    }) => (await axios.patch(`/api/current-user/${role}`, playerId)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["votes"] }),
  });
};

export const useRemoveVoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (role: (typeof roles)[number]) =>
      (await axios.delete(`/api/current-user/${role}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["votes"] }),
  });
};
