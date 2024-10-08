// import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// // import GoogleProvider from "next-auth/providers/google";
// // import { signInSchema } from "./lib/zod";
// import { MyEventUser } from "./model/User";
// import bcryptjs from "bcryptjs";
// import connectToMongoDb from "./utils/dbConnect";
// import { NextResponse } from "next/server";

// const authRoutes: string[] = [
//   '/admin',
//   '/user',
// ];

// // const publicRoutes = ["/auth/signin", "/auth/signup"];
// // const authRoutes = ["/auth/signin", "/auth/signup"];

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
//       authorize: async (credentials) => {
//         const email = credentials?.email as string | undefined;
//         const password = credentials?.password as string | undefined;

//         if (!email || !password) {
//           throw new CredentialsSignin("Credential is missing");
//         }

//         await connectToMongoDb();
//         const user = await MyEventUser.findOne({ email }).select("+password");
//         console.log(user)
//         if (!user) {
//           throw new CredentialsSignin({ cause: "User not found" });
//         }

//         if (!user.password) {
//           throw new CredentialsSignin({ cause: "Invalid Email or Password" });
//         }

//         const isMatch = await bcryptjs.compare(password, user.password);

//         if (!isMatch) {
//           throw new CredentialsSignin("Password does not match");
//         }

//         return user;
//       },
//     }),
//   ],

// });


import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MyEventUser } from "./model/User";
import bcryptjs from "bcryptjs";
import connectToMongoDb from "./utils/dbConnect";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Credential is missing");
        }

        await connectToMongoDb();
        const user = await MyEventUser.findOne({ email }).select("+password");

        if (!user) {
          throw new CredentialsSignin({ cause: "User not found" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin("Password does not match");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use this instead of `jwt: true`
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for both JWT and session
});
