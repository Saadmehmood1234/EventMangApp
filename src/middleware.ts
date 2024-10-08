// export { auth as middleware } from "@/auth";

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
// /middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
console.log(token)
  const protectedRoutes = ['/user', '/admin']; // Add any other protected routes

  // If the route is protected and there is no token, redirect to sign-in
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'], // Protect routes under /user and /admin
};


// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]"; // Adjust the import path if necessary
// import { NextResponse } from "next/server";

// const publicRoutes = ["/auth/signin", "/auth/signup"];
// const authRoutes = ["/auth/signin", "/auth/signup"];

// export async function middleware(req: any) {
//   const { pathname } = req.nextUrl;

//   // Allow public routes
//   if (publicRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // Get session from NextAuth
//   const session = await getServerSession(authOptions);

//   // If no session is found, redirect to the sign-in page
//   if (!session) {
//     return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
//   }

//   // Role-based access
//   const userRole = session.user.role || "user";

//   if (authRoutes.includes(pathname) && userRole === "admin") {
//     return NextResponse.redirect(new URL("/admin", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
