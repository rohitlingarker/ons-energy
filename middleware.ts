// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher([
  '/api/client-records/(.*)'
]);

interface CustomSessionClaims {
  metadata?: {
    role?: "admin" | "member";
  };
}

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    const customSessionClaims = sessionClaims as CustomSessionClaims;

    if (customSessionClaims?.metadata?.role !== 'admin') {
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
  }
});

// Optional: matcher if you want to protect only some routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
