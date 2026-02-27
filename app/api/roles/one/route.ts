import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/*
  SINGLE ROLE CACHE
*/

type CachedRole = {
  data: any;
  time: number;
};

const roleCache = new Map<string, CachedRole>();

const ROLE_TTL = 30 * 1000; // 30 seconds


/*
  ALL ROLES CACHE
*/

let rolesCache: any = null;
let rolesCacheTime = 0;

const ROLES_CACHE_TIME = 1000 * 60 * 5; // 5 minutes


export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {

    /*
      ✅ SINGLE ROLE
    */

    if (slug) {

      const cached = roleCache.get(slug);

      if (cached && Date.now() - cached.time < ROLE_TTL) {

        return NextResponse.json({
          success: true,
          role: cached.data,
        });

      }

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

      roleCache.set(slug, {
        data: role,
        time: Date.now(),
      });

      return NextResponse.json({
        success: true,
        role,
      });

    }


    /*
      ✅ ALL ROLES
    */

    const now = Date.now();

    if (rolesCache && now - rolesCacheTime < ROLES_CACHE_TIME) {

      return NextResponse.json({
        success: true,
        roles: rolesCache,
      });

    }

    const roles = await prisma.role.findMany({

      where: {
        isOpen: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
      },

    });

    rolesCache = roles;
    rolesCacheTime = now;

    return NextResponse.json({
      success: true,
      roles,
    });

  } catch (err) {

    console.error("GET /api/roles error", err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );

  }

}