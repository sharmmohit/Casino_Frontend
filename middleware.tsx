import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for auth token in cookies only (localStorage is not available in middleware)
  const authToken = request.cookies.get('auth_token')
  const isAuthenticated = !!authToken
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')
  
  // Redirect logic
  if (isDashboardPage && !isAuthenticated) {
    // If trying to access dashboard without auth, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (isAuthPage && isAuthenticated) {
    // If already authenticated and trying to access auth pages, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Allow the request to proceed
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}