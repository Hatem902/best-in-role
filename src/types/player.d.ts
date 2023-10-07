import { Mid as Player } from "@prisma/client";

type PlayerWithVoteStats = Player & {
  voteCount: number;
  votePercentage: number;
  rank: number;
};
