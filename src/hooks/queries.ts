// @ts-nocheck
//TODO: make the onMutation functions typesafe then remove @ts-nocheck. (Everything else in this file is already typesafe.)
"use client";
import { roles } from "@/config";
import { updatePlayers, updatePlayersRemoveVote } from "@/lib/utils";
import { userRolePatchSchema } from "@/lib/validations";
import { PlayerWithVoteStats } from "@/types/player";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const usePlayersQuery = (role: (typeof roles)[number]) =>
  useQuery({
    queryKey: [role, "players"],
    queryFn: async (): Promise<PlayerWithVoteStats[]> =>
      (await axios.get(`/api/${role}`)).data,
    //TODO: when we're at a point where we can afford more DB Data transfer costs, we can turn refetchInterval on for live updates.
    /* refetchInterval: 5000, */
  });

export const useUserVoteQuery = (role: (typeof roles)[number]) =>
  useQuery({
    queryKey: [role, "user_vote"],
    queryFn: async (): Promise<PlayerWithVoteStats> =>
      (await axios.get(`/api/current-user/${role}`)).data,
  });

export const useVoteMutation = (role: (typeof roles)[number]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      playerId: z.infer<typeof userRolePatchSchema>["playerId"],
    ) => (await axios.patch(`/api/current-user/${role}`, { playerId })).data,

    onMutate: async (
      playerId: z.infer<typeof userRolePatchSchema>["playerId"],
    ) => {
      await queryClient.cancelQueries({ queryKey: [role] });
      const oldPlayers = queryClient.getQueryData([role, "players"]);
      const oldUserVote = queryClient.getQueryData([role, "user_vote"]);

      const { updatedPlayers, updatedVotedPlayer } = updatePlayers(
        oldPlayers,
        playerId,
        oldUserVote?.id,
      );

      queryClient.setQueryData([role, "players"], () => updatedPlayers);
      queryClient.setQueryData([role, "user_vote"], () => updatedVotedPlayer);

      // Return a context object with the snapshotted value
      return { oldPlayers, oldUserVote };
    },

    onError: (context) => {
      queryClient.setQueryData([role, "players"], context.oldPlayers);
      queryClient.setQueryData([role, "user_vote"], context.oldUserVote);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [role] }),
  });
};

export const useRemoveVoteMutation = (role: (typeof roles)[number]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      (await axios.delete(`/api/current-user/${role}`)).data,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [role] });
      const oldPlayers = queryClient.getQueryData([role, "players"]);
      const oldUserVote = queryClient.getQueryData([role, "user_vote"]);

      const { updatedPlayers, updatedVotedPlayer } = updatePlayersRemoveVote(
        oldPlayers,
        oldUserVote?.id,
      );

      queryClient.setQueryData([role, "players"], () => updatedPlayers);
      queryClient.setQueryData([role, "user_vote"], () => updatedVotedPlayer);

      // Return a context object with the snapshotted value
      return { oldPlayers, oldUserVote };
    },

    onError: (context) => {
      queryClient.setQueryData([role, "players"], context.oldPlayers);
      queryClient.setQueryData([role, "user_vote"], context.oldUserVote);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [role] }),
  });
};
