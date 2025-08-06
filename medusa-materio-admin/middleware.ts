// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/medusa-dashboard')) {
    
    // Check for auth token in cookies or headers
    const token = request.cookies.get('medusa_auth_token')?.value ||
                  request.headers.get('authorization')
    
    // If no token and trying to access protected route, redirect to login
    if (!token && request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If user is logged in and trying to access login page, redirect to dashboard
  if (request.nextUrl.pathname === '/login') {
    const token = request.cookies.get('medusa_auth_token')?.value
    if (token) {
      return NextResponse.redirect(new URL('/medusa-dashboard', request.url))
    }
  }

  // Redirect root to dashboard
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/medusa-dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
