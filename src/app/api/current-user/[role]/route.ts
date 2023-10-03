import { roles } from "@/config";
import { db } from "@/lib/db";
import { userRolePatchSchema } from "@/lib/validations";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

interface Params {
  params: { role: (typeof roles)[number] };
}

export async function PATCH(request: Request, { params: { role } }: Params) {
  try {
    const { userId } = getAuth(request as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await clerkClient.users.getUser(userId);

    const body = await request.json();
    const playerId = userRolePatchSchema.parse(body);

    const vote = await db.user.upsert({
      where: {
        id: user.id,
      },
      update: { [`${role}Id`]: playerId },
      create: {
        id: user.id,
        username: user.username,
        [`${role}Id`]: playerId,
      },
      select: {
        id: true,
        username: true,
        [`${role}Id`]: true,
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

export async function DELETE(
  request: NextRequest,
  { params: { role } }: Params,
) {
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
      data: { [`${role}Id`]: null },
      select: {
        id: true,
        username: true,
        [`${role}Id`]: true,
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
