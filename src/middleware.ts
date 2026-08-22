import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Simple client-friendly middleware for Next.js path passes
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
