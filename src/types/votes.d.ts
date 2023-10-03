import { roles } from "@/config";
import { Player } from "@prisma/client";

type PlayerWithVoteStats = Player & {
  voteCount: number;
  votePercentage: number;
  rank: number;
};

type PlayersByRoleSorted = {
  [Role in (typeof roles)[number]]: PlayerWithVoteStats[];
};

type UserWithVotedPlayers = {
  [Role in (typeof roles)[number]]: PlayerWithVoteStats;
  id: string;
};

type Votes = {
  players: PlayersByRoleSorted;
  user: UserWithVotedPlayers;
};
