import { roles } from "@/config";
import { db } from "@/lib/db";
import { DeepPartial } from "@/lib/utils";
import {
  PlayersByRoleSorted,
  UserWithVotedPlayers,
  Votes,
} from "@/types/votes";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const { userId } = getAuth(request as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await db.user.findFirst({ where: { id: userId } });
    const players = await db.player.findMany();
    const playersByRoleSorted: DeepPartial<PlayersByRoleSorted> = {};
    const playersVotedByUser: Partial<UserWithVotedPlayers> = {};
    await Promise.all(
      roles.map(async (role) => {
        const totalVotes = await db.user.count({
          where: { [`${role}Id`]: { not: undefined } },
        });

        const roleArray = await Promise.all(
          players.map(async (player) => {
            const voteCount = await db.user.count({
              where: { [`${role}Id`]: player.id },
            });
            const playerWithVoteStats = {
              ...player,
              voteCount,
              votePercentage:
                totalVotes === 0 ? 0 : (voteCount / totalVotes) * 100,
            };

            user?.[`${role}Id`] === player.id &&
              //TODO Why is DeepPartial for the prop 'rank' not working here?
              // @ts-ignore
              (playersVotedByUser[role] = playerWithVoteStats);

            return playerWithVoteStats;
          }),
        );

        playersByRoleSorted[role] = roleArray.sort(
          (a, b) => b.voteCount - a.voteCount,
        );

        playersByRoleSorted[role]?.forEach(
          (player, index) => (player!.rank = index + 1),
        );
      }),
    );

    return NextResponse.json({
      players: playersByRoleSorted,
      user: { id: userId, ...playersVotedByUser },
    } as Votes);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
