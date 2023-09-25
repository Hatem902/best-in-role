import { db } from "@/lib/db";
import { userPatchSchema } from "@/lib/validations";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function GET() {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId } = getAuth(request as NextRequest);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await clerkClient.users.getUser(userId);

    const body = userPatchSchema.parse(await request.json());
    const [role] = Object.keys(body);

    const vote = await db.user.upsert({
      where: {
        id: user.id,
      },
      update: body,
      create: {
        id: user.id,
        username: user.username,
        ...body,
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
