import { NextRequest, NextResponse } from "next/server";
import { nonAuthenticatedProxy } from "./non-authenticated";

export function baseProxy(request: NextRequest): NextResponse {
  let response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/admin", 6)) return response;

  response = nonAuthenticatedProxy(request);
  if (!response.ok) return response;

  return response;
}
