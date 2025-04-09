// /app/api/update-metadata/route.ts (or pages/api if not using App Router)

import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const client = await clerkClient();
    const { userId } = await req.json();

    await client.users.updateUser(userId, {
      publicMetadata: {
        onboarded: true,
      },
    });

    return NextResponse.json({ msg: "Metadata updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Error updating metadata" }, { status: 500 });
  }
}
