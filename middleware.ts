import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define which routes are public (login, signup, etc.)
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);
export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();

  if (userId) {
    // Cast sessionClaims to your custom type
    const claims = sessionClaims as unknown as CustomJwtSessionClaims;
    const role = claims?.metadata?.role;

    // Now 'role' will work without errors
    if (isPublicRoute(request)) {
      if (role === "super-admin") {
        return NextResponse.redirect(new URL("/super-admin", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/super-admin") &&
      role !== "super-admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
