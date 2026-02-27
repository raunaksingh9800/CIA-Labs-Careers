import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const { sessionClaims } = await auth();

  /* 1️⃣ Auth check */
  if (!sessionClaims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (sessionClaims.metadata?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  /* 2️⃣ Get username reliably */
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
    /* 3️⃣ Get role IDs owned by this admin */
    const roles = await prisma.role.findMany({
      where: {
        byAdmin: username,
      },
      select: {
        id: true,
      },
    });

    const roleIds = roles.map((r) => r.id);

    /* 4️⃣ Get applications for those roles */
    const applications = await prisma.application.findMany({
      where: {
        roleId: {
          in: roleIds,
        },
      },
      select: {
        id: true,
        name: true,
        resumeUrl: true,
        createdAt: true,
        role: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    /* 5️⃣ Shape response for frontend */
    const response = applications.map((app) => ({
      id: app.id,
      name: app.name,
      roleTitle: app.role.title,
      createdAt: app.createdAt,
      resumeUrl: app.resumeUrl,
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
