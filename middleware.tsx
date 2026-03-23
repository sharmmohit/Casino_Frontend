import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;
  
  // Extract subdomain
  let subdomain = '';
  if (hostname.includes('.')) {
    const parts = hostname.split('.');
    if (parts.length > 2 || (parts.length === 2 && !parts[0].includes('localhost'))) {
      subdomain = parts[0];
    }
  }
  
  // Set tenant ID header for API requests
  const response = NextResponse.next();
  
  if (subdomain && !['www', 'app', 'localhost'].includes(subdomain)) {
    response.headers.set('x-tenant-id', subdomain);
  } else {
    // For development, you can set a default tenant ID from cookie or query param
    const tenantFromCookie = request.cookies.get('tenantId');
    if (tenantFromCookie) {
      response.headers.set('x-tenant-id', tenantFromCookie.value);
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};