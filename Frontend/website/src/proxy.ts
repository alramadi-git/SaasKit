import { NextRequest, NextResponse } from "next/server";

import nextIntlProxy from "@/proxies/next-intl";
import { adminProxy } from "./proxies/admin/admin";
import { baseProxy } from "./proxies/base/base";

export default function proxy(request: NextRequest): NextResponse {
  let response = nextIntlProxy(request);
  if (!response.ok) return response;

  response = adminProxy(request);
  if (!response.ok) return response;

  response = baseProxy(request);
  if (!response.ok) return response;

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
};
