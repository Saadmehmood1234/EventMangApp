
//import LoginForm from "@/components/client/Form";
// import Link from "next/link";
// import { signIn } from "@/auth";
// import { CredentialsSignin } from "next-auth";
// const SignIn = () => {

//   return (
//     <div className="flex justify-center items-center w-full h-screen bg-slate-700">
//       <div className="container p-6 max-w-md rounded-lg mx-4 bg-gray-950/90 border-2 border-gray-200">
//         <h1 className="text-4xl font-extrabold text-gray-400  text-center">
//           Sign In to <span className="text-gray-400">Eventify</span>
//         </h1>
//         <div className="sm:p-8 p-2 bg-gray-950/90 rounded-lg shadow-lg">
//<LoginForm/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

"use client"
import Link from "next/link";
import { signIn } from "next-auth/react";
import React from "react";


const SignIn = () => {
  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password) {
      throw new Error("Please provide all fields");
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Don't automatically redirect
        callbackUrl: "/user", // Use this for manual redirection
      });

      if (result?.error) {
        console.log("Error during sign-in:", result.error);
        // Optionally handle the error, show it to the user
      } else {
        // Redirect on success
        window.location.href = "/user";
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-700">
      <div className="container p-6 max-w-md rounded-lg mx-4 bg-gray-950/90 border-2 border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-400 text-center">
          Sign In to <span className="text-gray-400">Eventify</span>
        </h1>
        <div className="sm:p-8 p-2 bg-gray-950/90 rounded-lg shadow-lg">
          <form onSubmit={loginHandler}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <Link
              href="/signup"
              className="text-sm hover:underline hover:opacity-70 text-gray-300 mb-6 block text-center"
            >
              Don't have an account? Sign Up
            </Link>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
