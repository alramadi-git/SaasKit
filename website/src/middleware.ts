import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
};
