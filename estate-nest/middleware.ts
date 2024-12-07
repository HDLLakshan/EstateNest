import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('middleware');
  const token = req.cookies.get('token');
  const isAuthPage = req.nextUrl.pathname === '';
  console.log(token);
  // Redirect logged-in users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protect routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile'];
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
// Apply middleware only to specific paths
export const config = {
  matcher: ['', '/dashboard/:path*'], // Match specific routes
};
