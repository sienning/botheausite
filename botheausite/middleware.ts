import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/home','/home/rendez_vous', '/home/arbre_genealogique', '/home/gallerie', '/home/profil']
const publicRoutes = ['/']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  // 4. Log the session for debugging
  //console.log('Session:', session)
  console.log('Request URL:', req.nextUrl.pathname)

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userName) {
    console.log('Redirecting to /')
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  // 5. Redirect to /home if the user is authenticated
  if (
    isPublicRoute &&
    session?.userName &&
    req.nextUrl.pathname.startsWith('/')
  ) {
    console.log('Redirecting to /home')
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}