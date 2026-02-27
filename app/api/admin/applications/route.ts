import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// 👇 IMPORT FROM YOUR LIB FOLDER, DO NOT NEW IT HERE
import { prisma } from "@/lib/prisma"; 

export async function GET() {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata.role !== 'super-admin') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const applications = await prisma.application.findMany({
      include: {
        role: {
          select: { title: true, type: true } // Fetches Role info
        }
      },
      // answers field is fetched automatically!
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}