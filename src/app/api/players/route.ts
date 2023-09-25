import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const players = await db.player.findMany();
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
