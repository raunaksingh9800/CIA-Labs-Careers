import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const { sessionClaims } = await auth();

  // 1. Hard Security Check
  if (sessionClaims?.metadata.role !== 'super-admin') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // 2. Fetch Roles with application counts
    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}