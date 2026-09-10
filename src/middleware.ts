import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Prevent MIME-type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 2. Strict Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 3. Restrict unnecessary browser device sensors & APIs
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // 4. Enforce HSTS (Strict-Transport-Security) in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (static reference assets)
     * - blueprints/ (static catalog PNGs)
     * - templates/ (static template thumbnails)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|blueprints/|templates/).*)',
  ],
};
