"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { PlayersWithVoteCounts } from "@/functions/data-transformers";
import { db } from "@/lib/db";
import { userPatchSchema } from "@/lib/validations";
import { Player, User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as z from "zod";

export default function Home() {
  const { isLoading: isLoadingUsers, data: users } = useQuery({
    queryKey: ["users_data"],
    queryFn: async () => (await axios.get("/api/users/")).data,
  });
  const { isLoading: isLoadingPlayersRaw, data: players } = useQuery({
    queryKey: ["players_data"],
    queryFn: async () => (await axios.get("/api/players/")).data,
  });
  const { isLoading: isLoadingPlayers, data: playersWithVoteCounts } = useQuery(
    {
      queryKey: ["players_with_vote_counts_data"],
      queryFn: () =>
        PlayersWithVoteCounts(users as User[], players as Player[]),
      enabled: !!(users && players),
      initialData: undefined,
    },
  );

  const { isLoading: isLoadingVote, mutate: Vote } = useMutation({
    mutationFn: async (vote: z.infer<typeof userPatchSchema>) =>
      (await axios.patch("/api/users", vote)).data,
  });

  return (
    <main>
      {/* <button
        onClick={() => {
          Vote({ midId: 1 });
        }}
        className="bg-slate-100 "
      >
        Vote Test
      </button> */}
      <ModeToggle />
    </main>
  );
}
