import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const players = await db.player.findMany({
      select: {
        id: true,
        name: true,
        team: true,
      },
    });

    players.map(async (player) => ({
      ...player,
      topVotesCount: await db.user.count({
        where: { topId: player.id },
      }),
      jglVotesCount: await db.user.count({
        where: { jglId: player.id },
      }),
      midVotesCount: await db.user.count({
        where: { midId: player.id },
      }),
      adcVotesCount: await db.user.count({
        where: { adcId: player.id },
      }),
      suppVotesCount: await db.user.count({
        where: { suppId: player.id },
      }),
    }));

    /*  player.topVotesCount = await db.user.count({
        where: { topId: player.id },
      });
      player.jglVotesCount = await db.user.count({
        where: { jglId: player.id },
      });
      player.midVotesCount = await db.user.count({
        where: { midId: player.id },
      });
      player.adcVotesCount = await db.user.count({
        where: { adcId: player.id },
      });
      player.suppVotesCount = await db.user.count({
        where: { suppId: player.id },
      } );
    })*/
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
