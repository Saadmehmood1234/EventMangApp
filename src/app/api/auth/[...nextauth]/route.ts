import { handlers } from "@/auth";

export const { GET, POST } = handlers;



// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { signInSchema } from "@/lib/zod";
// import { MyEventUser } from "@/model/User"; 
// import bcryptjs from "bcryptjs";
// import connectToMongoDb from "@/utils/dbConnect";
// import { NextResponse } from "next/server";

// const publicRoutes = ["/auth/signin", "/auth/signup"];
// const authRoutes = ["/auth/signin", "/auth/signup"];

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//       },
//       async authorize(credentials) {
//         // Ensure DB connection is established
//         await connectToMongoDb();
        
//         // Validate input credentials
//         const parsedCredentials = signInSchema.safeParse(credentials);
//         if (!parsedCredentials.success) {
//           console.error("Invalid credentials:", parsedCredentials.error.errors);
//           return null;
//         }

//         // Fetch user from the database
//         const user = await MyEventUser.findOne({ email: credentials.email }).exec();
//         if (!user || !user.password) {
//           console.log("Invalid email or password");
//           return null;
//         }

//         if (typeof credentials.password !== 'string') {
//           throw new Error("Invalid password type");
//         }
        
//         const isPasswordValid = await bcryptjs.compare(
//           credentials.password,
//           user.password
//         );
        
//         if (!isPasswordValid) {
//           console.log("Password mismatch");
//           return null;
//         }

//         const { password, ...userWithoutPassword } = user.toObject();
//         return userWithoutPassword;
//       },
//     }),
//   ],
//   callbacks: {
//     async authorized({ request: { nextUrl }, auth }) {
//       const isLoggedIn = !!auth?.user;
//       const { pathname } = nextUrl;

//       if (publicRoutes.includes(pathname)) return true;

//       if (!isLoggedIn) {
//         return NextResponse.redirect(new URL("/auth/signin", nextUrl));
//       }
//       const role = auth?.user?.role || 'user';
//       if (authRoutes.includes(pathname)) {
//         if (role === "admin") {
//           return NextResponse.redirect(new URL("/admin", nextUrl)); 
//         } else {
//           return NextResponse.redirect(new URL("/", nextUrl)); 
//         }
//       }

//       return isLoggedIn;
//     },
//     async jwt({ token, user, trigger, session }) {
//       if (user) {
//         token.id = user.id as string;
//         token.role = user.role as string;
//       }

//       if (trigger === "update" && session) {
//         token = { ...token, ...session };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// });
