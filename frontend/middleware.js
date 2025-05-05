import { NextResponse } from 'next/server'

const publicRoutes = ['/', '/login', '/signup']

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicRoute = publicRoutes.includes(path)

  const token = request.cookies.get('token')?.value

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/tournament', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 
