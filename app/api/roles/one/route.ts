import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
console.log(slug)
  try {
    // ✅ SINGLE ROLE
    if (slug) {
      const role = await prisma.role.findUnique({
        where: { slug },
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

      if (!role) {
        return NextResponse.json(
          { success: false, error: "Role not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, role });
    }

    // ✅ ALL ROLES
    const roles = await prisma.role.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, roles });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
