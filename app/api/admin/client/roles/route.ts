import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (sessionClaims.metadata?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 🔑 THIS is how you reliably get username
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const username =
    user.username ??
    user.primaryEmailAddress?.emailAddress;

  if (!username) {
    return NextResponse.json(
      { error: "Username missing on Clerk user" },
      { status: 400 }
    );
  }

  try {
    const roles = await prisma.role.findMany({
      where: {
        byAdmin: username, // ✅ what you asked for
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(roles);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
