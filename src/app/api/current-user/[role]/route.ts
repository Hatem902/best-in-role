import { roles } from "@/config";
import { db } from "@/lib/db";
import { sortByVoteCountAndName } from "@/lib/utils";
import { userRolePatchSchema } from "@/lib/validations";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

interface Params {
  params: { role: (typeof roles)[number] };
}

export async function GET(request: Request, { params: { role } }: Params) {
  try {
    const { userId } = getAuth(request as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await db.user.findFirst({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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

    const playerIndex = players.findIndex((player) => player.id === user[role]);
    return NextResponse.json(
      playerIndex === -1
        ? null
        : {
            ...players[playerIndex],
            rank: playerIndex + 1,
            votePercentage:
              totalVotes === 0
                ? 0
                : (players[playerIndex].voteCount / totalVotes) * 100,
          },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params: { role } }: Params) {
  try {
    const { userId } = getAuth(request as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await clerkClient.users.getUser(userId);

    const body = await request.json();

    const { playerId } = userRolePatchSchema.parse(body);

    const vote = await db.user.upsert({
      where: {
        id: user.id,
      },
      update: { [role]: playerId },
      create: {
        id: user.id,
        username: user.username,
        [role]: playerId,
      },
      select: {
        id: true,
        username: true,
        [role]: true,
      },
    });

    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: error instanceof z.ZodError ? 422 : 500 },
    );
  }
}

export async function DELETE(request: Request, { params: { role } }: Params) {
  try {
    const { userId } = getAuth(request as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await clerkClient.users.getUser(userId);

    const vote = await db.user.update({
      where: {
        id: user.id,
      },
      data: { [role]: null },
      select: {
        id: true,
        username: true,
        [role]: true,
      },
    });

    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: error instanceof z.ZodError ? 422 : 500 },
    );
  }
}
