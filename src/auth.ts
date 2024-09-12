// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { signInSchema } from "./lib/zod";
// import { MyEventUser } from "./model/User";
// import { string } from "zod";
// import bcryptjs from "bcryptjs";
// const publicRoutes = ["/auth/signin", "/auth/signup"];
// const authRoutes = ["/auth/signin", "/auth/signup"];
// import connectToMongoDb from "./utils/dbConnect";
    
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
//         await connectToMongoDb();
//         let user = null;
//         const parsedCredentials = signInSchema.safeParse(credentials);
//         if (!parsedCredentials.success) {
//           console.error("Invalid credentials:", parsedCredentials.error.errors);
//           return null;
//         }
      
     
//    user = await MyEventUser.findOne({ email:credentials.email })
//         if (!user) {
//           console.log("Invalid credentials");
//           return null;
//         }

//         if (!user.password) {
//           return null;
//         }

//         const isPasswordValid = await bcryptjs.compare(
//           credentials.password as string,
//           user.password
//         );
//         if (!isPasswordValid) {
//           return null;
//         }
//         const { password, ...userWithoutPassword } = user;
//         return userWithoutPassword;
   
//       },
//     }),
//   ],
//   callbacks: {
//     authorized({ request: { nextUrl }, auth }) {
//       const isLoggedIn = !!auth?.user;
//       const { pathname } = nextUrl;

//       if (publicRoutes.includes(pathname)) {
//         return true;
//       }

//       if (authRoutes.includes(pathname)) {
//         if (isLoggedIn) {
//           return Response.redirect(new URL("/", nextUrl));
//         }
//       }

//       return isLoggedIn;

//       // const role = auth?.user.role || 'user';
//       // if (pathname.startsWith('/auth/signin') && isLoggedIn) {
//       //     return Response.redirect(new URL('/', nextUrl));
//       // }
//       // if (pathname.startsWith("/page2") && role !== "admin") {
//       //     return Response.redirect(new URL('/', nextUrl));
//       // }
//       // return !!auth;
//     },
//     jwt({ token, user, trigger, session }) {
//       if (user) {
//         token.id = user.id as string;
//         token.role = user.role as string;
//       }
//       if (trigger === "update" && session) {
//         token = { ...token, ...session };
//       }
//       return token;
//     },
//     session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// });



import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { MyEventUser } from "./model/User";
import bcryptjs from "bcryptjs";
import connectToMongoDb from "./utils/dbConnect";
import { NextResponse } from "next/server";
const publicRoutes = ["/auth/signin", "/auth/signup"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        await connectToMongoDb(); // Ensure DB connection is established
        let user = null;
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }
      
        user = await MyEventUser.findOne({ email: credentials.email }).exec();
        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        if (!user.password) {
          return null;
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }
        const { password, ...userWithoutPassword } = user.toObject(); // Convert to plain object
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (publicRoutes.includes(pathname)) {
        return true;
      }

      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      // Check user role and redirect if necessary
      const role = auth?.user?.role || 'user';
      if (pathname.startsWith('/admin') && role !== "admin") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      return isLoggedIn;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
