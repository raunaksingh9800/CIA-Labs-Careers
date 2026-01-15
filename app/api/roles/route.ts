import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
    import { RoleType } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.toLowerCase();
    const year = searchParams.get("year");
    const branch = searchParams.get("branch");
    const type = searchParams.get("type");

    // Import RoleType enum from Prisma client

    const roles = await prisma.role.findMany({
      where: {
        isOpen: true,

        // TEXT SEARCH (title)
        ...(q && {
          title: {
            contains: q,
            mode: "insensitive",
          },
        }),

        // YEAR FILTER (array contains)
        ...(year && {
          years: {
            has: Number(year),
          },
        }),

        // BRANCH FILTER (array contains)
        ...(branch && {
          branches: {
            has: branch,
          },
        }),

        // TYPE FILTER
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

    return NextResponse.json({ success: true, roles });
  } catch (error) {
    console.error("GET /api/roles error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
