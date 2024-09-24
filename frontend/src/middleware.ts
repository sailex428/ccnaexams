import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const backendUri = process.env.BACKEND_URI;
  if (!backendUri) {
    throw new Error("BACKEND_URI is not set");
  }

  const requestUrl = request.nextUrl.pathname;
  const destUrl = requestUrl.slice(requestUrl.indexOf("/api"));
  return NextResponse.redirect(new URL(backendUri + destUrl));
}

export const config = {
  matcher: ["/:path*/api/:path*"],
};
