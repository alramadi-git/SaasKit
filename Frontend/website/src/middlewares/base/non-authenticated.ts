import { NextRequest, NextResponse } from "next/server";

export function nonAuthenticatedMiddleware(request: NextRequest): NextResponse {
  let response = NextResponse.next();

  if (!request.nextUrl.pathname.startsWith("/authentication", 6))
    return response;

  const account = request.cookies.get("user-account")?.value;
  const token = request.cookies.get("user-token")?.value;

  if (account && token) {
    response = NextResponse.redirect(new URL("/", request.nextUrl.origin));

    return response;
  }

  return response;
}
