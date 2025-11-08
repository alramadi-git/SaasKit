import { NextRequest, NextResponse } from "next/server";

import nextIntlMiddleware from "@/middlewares/next-intl";
import { adminMiddleware } from "./middlewares/admin/admin";
import { baseMiddleware } from "./middlewares/base/base";

export default function middleware(request: NextRequest): NextResponse {
  let response = nextIntlMiddleware(request);
  if (!response.ok) return response;

  response = baseMiddleware(request);
  if (!response.ok) return response;

  response = adminMiddleware(request);
  if (!response.ok) return response;

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
};
