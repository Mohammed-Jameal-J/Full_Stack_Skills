import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isAuthenticated = !!req.auth;
  const { pathname } = req.nextUrl;

  const publicRoutes =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  if (!isAuthenticated && !publicRoutes) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    isAuthenticated &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.icon).*)"],
};
