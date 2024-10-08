import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { signInSchema } from "./lib/zod";
import { MyEventUser } from "./model/User";
import bcryptjs from "bcryptjs";
import connectToMongoDb from "./utils/dbConnect";
import { NextResponse } from "next/server";
const authRoutes: string[] = [
  '/admin',
  '/user',
];

// const publicRoutes = ["/auth/signin", "/auth/signup"];
// const authRoutes = ["/auth/signin", "/auth/signup"];

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
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Credential is missing");
        }

        await connectToMongoDb();
        const user = await MyEventUser.findOne({ email }).select("+password");
        console.log(user)
        if (!user) {
          throw new CredentialsSignin({ cause: "User not found" });
        }

        if (!user.password) {
          throw new CredentialsSignin({ cause: "Invalid Email or Password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin("Password does not match");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const email=auth?.user.email;
      await connectToMongoDb();
      const UserDatabase = await MyEventUser.findOne({ email }).select("+password");
      if(!UserDatabase){
        return NextResponse.redirect(new URL("/auth/signin", nextUrl));
      }
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/signin", nextUrl));
      }
  
      const role = UserDatabase?.user?.role || "user";

      if (authRoutes.includes(nextUrl.pathname)) {
        if (role === "admin") {
          return NextResponse.redirect(new URL("/admin", nextUrl));
        } else {
          return NextResponse.redirect(new URL("/user", nextUrl));
        }
      }
      return true;
    },
  }
  
});