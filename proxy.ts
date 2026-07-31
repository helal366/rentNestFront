import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtTokens } from "./services/jwtTokens";
import { JwtPayload } from "jsonwebtoken";
import { generateAccessToken } from "./services/generateAccessToken";

const PRIVATE_ROUTES = [
  "/tenant_dashboard",
  "/landlord_dashboard",
  "/admin_dashboard",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivate = PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtTokens.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      )
    : null;
  const decodedRefreshToken = refreshToken
    ? jwtTokens.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  let userRole = null;
  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  const finalResponse = NextResponse.next();

  if (isPrivate) {
    if (
      (!decodedAccessToken || !decodedAccessToken.success) &&
      (!decodedRefreshToken || !decodedRefreshToken.success)
    ) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (
      (!decodedAccessToken || !decodedAccessToken.success) &&
      decodedRefreshToken &&
      decodedRefreshToken.success
    ) {
      cookieStore.delete("accessToken");
      const result = await generateAccessToken();

      try {
        if (result?.success && result?.data?.accessToken) {
          const newAccessToken = result?.data?.accessToken;

          cookieStore.set("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          finalResponse.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });

          accessToken = newAccessToken;
          decodedAccessToken = jwtTokens.verifyToken(
            accessToken!,
            process.env.JWT_ACCESS_SECRET as string,
          );
        } else {
          cookieStore.delete("refreshToken");
          const failResponse = NextResponse.redirect(
            new URL("/login", request.url),
          );
          failResponse.cookies.delete("accessToken");
          failResponse.cookies.delete("refreshToken");
          return failResponse;
        }
      } catch (error) {
        console.error("Token refreshing error:", error);
        const errorResponse = NextResponse.redirect(
          new URL("/login", request.url),
        );
        errorResponse.cookies.delete("accessToken");
        errorResponse.cookies.delete("refreshToken");
        return errorResponse;
      }
    }

    if (pathname.startsWith("/tenant_dashboard") && userRole !== "TENANT") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/landlord_dashboard") && userRole !== "LANDLORD") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/admin_dashboard") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (
    decodedAccessToken &&
    decodedAccessToken.success &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    if (userRole === "TENANT")
      return NextResponse.redirect(new URL("/tenant_dashboard", request.url));
    if (userRole === "LANDLORD")
      return NextResponse.redirect(new URL("/landlord_dashboard", request.url));
    if (userRole === "ADMIN")
      return NextResponse.redirect(new URL("/admin_dashboard", request.url));
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
