import { db } from "@/lib/db";
import { userPatchSchema } from "@/lib/validations";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export async function GET(request: Request) {
  try {
    const { userId } = getAuth(request as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await db.user.findFirst({ where: { id: userId } });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const operation = userPatchSchema.parse(searchParams.get("operation"));
    if (!operation) {
      return NextResponse.json(
        { error: "Query Param 'Operation' is required" },
        { status: 500 },
      );
    }

    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = await clerkClient.users.getUser(userId);

    const body = userPatchSchema.parse(await request.json());
    const [role] = Object.keys(body);

    let vote;
    if (operation === "vote") {
      vote = await db.user.upsert({
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
    } else if (operation === "remove_vote") {
      vote = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...body,
        },
        select: {
          id: true,
          username: true,
          [role]: true,
        },
      });
    }

    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: error instanceof z.ZodError ? 422 : 500 },
    );
  }
}
