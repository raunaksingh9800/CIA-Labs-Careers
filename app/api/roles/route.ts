import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RoleType } from "@prisma/client";
let cachedRoles: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
export async function GET(req: Request) {
  try {
    const now = Date.now();

    if (cachedRoles && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json({ success: true, roles: cachedRoles });
    }

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.toLowerCase();
    const year = searchParams.get("year");
    const branch = searchParams.get("branch");
    const type = searchParams.get("type");

    const roles = await prisma.role.findMany({
      where: {
        isOpen: true,
        ...(q && {
          title: {
            contains: q,
            mode: "insensitive",
          },
        }),
        ...(year && {
          years: { has: Number(year) },
        }),
        ...(branch && {
          branches: { has: branch },
        }),
        ...(type && {
          type: type as RoleType,
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        years: true,
        branches: true,
        type: true,
        commitment: true,
        questions: true,
        createdAt: true,
      },
    });

    cachedRoles = roles;
    lastFetchTime = now;

    return NextResponse.json({ success: true, roles });
  } catch (error) {
    console.error("GET /api/roles error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
