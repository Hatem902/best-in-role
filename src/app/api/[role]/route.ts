import { roles } from "@/config";
import { db } from "@/lib/db";
import { rankPlayersByVoteCount, sortByVoteCountAndName } from "@/lib/utils";
import { PlayerWithVoteStats } from "@/types/player";
import { NextResponse } from "next/server";

interface Params {
  params: { role: (typeof roles)[number] };
}

export async function GET(request: Request, { params: { role } }: Params) {
  let players =
    //TODO:db[param] not supported by ts/prisma?
    /* @ts-ignore */ sortByVoteCountAndName(
      (
        await db[role as "mid"].findMany({
          include: {
            _count: {
              select: { users: true },
            },
          },
        })
      ).map(({ _count, ...player }) => ({
        ...player,
        voteCount: _count.users,
      })),
    );

  const totalVotes = players.reduce((acc, curr) => acc + curr.voteCount, 0);

  players.forEach((player) => {
    player.votePercentage =
      totalVotes === 0 ? 0 : (player.voteCount / totalVotes) * 100;
  });

  rankPlayersByVoteCount(players);

  return NextResponse.json(players as PlayerWithVoteStats[]);
}
