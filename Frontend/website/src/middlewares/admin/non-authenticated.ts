import { NextRequest, NextResponse } from "next/server";

export function nonAuthenticatedMiddleware(request: NextRequest): NextResponse {
  let response = NextResponse.next();

  if (!request.nextUrl.pathname.startsWith("/admin/authentication", 6))
    return response;

  const account = request.cookies.get("admin-account")?.value;
  const token = request.cookies.get("admin-token")?.value;

  if (account && token) {
    response = NextResponse.redirect(
      new URL("/admin/dashboard", request.nextUrl.origin),
    );

    return response;
  }

  return response;
}
