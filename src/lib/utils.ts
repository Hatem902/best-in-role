import { PlayerWithVoteStats } from "@/types/player";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { userRolePatchSchema } from "./validations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export function sortByVoteCountAndName(players: PlayerWithVoteStats[]) {
  return players.sort((a, b) => {
    const voteCountDifference = b.voteCount - a.voteCount;
    if (voteCountDifference === 0) {
      return a.name.localeCompare(b.name);
    }
    return voteCountDifference;
  });
}

export function rankPlayersByVoteCount(players: PlayerWithVoteStats[]) {
  let rank = 1;
  let prevVoteCount = players[0].voteCount;

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (i > 0 && player.voteCount !== prevVoteCount) {
      rank = i + 1;
    }

    player.rank = rank;
    prevVoteCount = player.voteCount;
  }
}

//TODO: Move the updatePlayer functions directly into the onMutate functions in the queries.ts file. Utils is not the right place for this.
export function updatePlayers(
  oldPlayers: PlayerWithVoteStats[],
  playerId: z.infer<typeof userRolePatchSchema>["playerId"],
  oldPlayerId: z.infer<typeof userRolePatchSchema>["playerId"] | null,
) {
  if (oldPlayerId) {
    let votedPlayer = oldPlayers.find((player) => player.id === playerId);
    let oldPlayer = oldPlayers.find((player) => player.id === oldPlayerId);
    if (!votedPlayer || !oldPlayer) {
      return null;
    }
    votedPlayer.voteCount++;
    oldPlayer.voteCount--;
    const players = sortByVoteCountAndName([
      ...oldPlayers.filter(
        (player) => player.id !== playerId && player.id !== oldPlayerId,
      ),
      votedPlayer,
      oldPlayer,
    ]);
    const totalVotes = players.reduce((acc, curr) => acc + curr.voteCount, 0);

    players.forEach((player) => {
      player.votePercentage =
        totalVotes === 0 ? 0 : (player.voteCount / totalVotes) * 100;
    });
    rankPlayersByVoteCount(players);
    return { updatedPlayers: players, updatedVotedPlayer: votedPlayer };
  } else {
    let votedPlayer = oldPlayers.find((player) => player.id === playerId);
    if (!votedPlayer) {
      return null;
    }
    votedPlayer.voteCount++;
    const players = sortByVoteCountAndName([
      ...oldPlayers.filter((player) => player.id !== playerId),
      votedPlayer,
    ]);
    const totalVotes = players.reduce((acc, curr) => acc + curr.voteCount, 0);

    players.forEach((player) => {
      player.votePercentage =
        totalVotes === 0 ? 0 : (player.voteCount / totalVotes) * 100;
    });
    rankPlayersByVoteCount(players);
    return { updatedPlayers: players, updatedVotedPlayer: votedPlayer };
  }
}

export function updatePlayersRemoveVote(
  oldPlayers: PlayerWithVoteStats[],
  oldPlayerId: z.infer<typeof userRolePatchSchema>["playerId"] | null,
) {
  if (oldPlayerId) {
    let oldPlayer = oldPlayers.find((player) => player.id === oldPlayerId);
    if (!oldPlayer) {
      return null;
    }
    oldPlayer.voteCount--;
    const players = sortByVoteCountAndName([
      ...oldPlayers.filter((player) => player.id !== oldPlayerId),
      oldPlayer,
    ]);
    const totalVotes = players.reduce((acc, curr) => acc + curr.voteCount, 0);

    players.forEach((player) => {
      player.votePercentage =
        totalVotes === 0 ? 0 : (player.voteCount / totalVotes) * 100;
    });
    rankPlayersByVoteCount(players);
    return { updatedPlayers: players, updatedVotedPlayer: { id: null } };
  } else {
    return null;
  }
}
