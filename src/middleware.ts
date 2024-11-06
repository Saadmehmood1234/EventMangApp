// export { auth as middleware } from "@/auth";

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
// /middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
 console.log(process.env.NEXTAUTH_SECRET );

//   const protectedRoutes = ['/user', '/admin']; // Add any other protected routes
  // const protectedRoutes = ['/'];
  // // If the route is protected and there is no token, redirect to sign-in
  // if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'], // Protect routes under /user and /admin
};

