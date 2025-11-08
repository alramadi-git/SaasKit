import { NextRequest, NextResponse } from "next/server";
import { nonAuthenticatedMiddleware } from "./non-authenticated";

export function baseMiddleware(request: NextRequest): NextResponse {
  let response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/admin", 6)) return response;

  response = nonAuthenticatedMiddleware(request);
  if (!response.ok) return response;

  return response;
}
