import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For testing: Allow all requests to proceed without authentication checks
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

