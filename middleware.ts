// middleware.ts (Place in project root or /src directory)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Extract authentication token and user role from cookies
  const token = request.cookies.get("auth_token")?.value;
  const userRole = request.cookies.get("user_role")?.value; // "TENANT", "LANDLORD", or "ADMIN"

  const { pathname } = request.nextUrl;

  // 2. Protect Dashboards: Redirect to login if unauthenticated
  if (
    pathname.startsWith("/tenant_dashboard") ||
    pathname.startsWith("/landlord_dashboard") ||
    pathname.startsWith("/admin_dashboard")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. Enforce Role Isolation
    if (pathname.startsWith("/tenant_dashboard") && userRole !== "TENANT") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
    if (pathname.startsWith("/landlord_dashboard") && userRole !== "LANDLORD") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
    if (pathname.startsWith("/admin_dashboard") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  // 4. Protect Auth Group: Redirect logged-in users away from login/register pages
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    if (userRole === "TENANT") return NextResponse.redirect(new URL("/tenant_dashboard", request.url));
    if (userRole === "LANDLORD") return NextResponse.redirect(new URL("/landlord_dashboard", request.url));
    if (userRole === "ADMIN") return NextResponse.redirect(new URL("/admin_dashboard", request.url));
  }

  return NextResponse.next();
}

// Optimized matcher configuration
export const config = {
  matcher: [
    "/tenant_dashboard/:path*",
    "/landlord_dashboard/:path*",
    "/admin_dashboard/:path*",
    "/login",
    "/register",
  ],
};
