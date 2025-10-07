import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Protect /admin routes - only accessible to admin users
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
