
"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Spinner } from "flowbite-react";

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // State for error messages

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null); // Reset error state

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password) {
      setError("Please provide all fields");
      setLoading(false);
      return; // Exit if fields are not filled
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
        // Custom error handling
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password."); // Set a user-friendly error message
        } else {
          setError("An unexpected error occurred. Please try again."); // Handle any other error
        }
      } else {
        // Redirect on success
        window.location.href = "/user";
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please try again."); // Set a general error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-300">
      <div className="container p-6 max-w-md rounded-xl mx-4 bg-gray-200  shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          Sign In to <span className="text-indigo-500">Eventify</span>
        </h1>
     
        <div className="p-6 rounded-lg">
          <form onSubmit={loginHandler}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full px-4 py-2 border rounded-lg text-black bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 text-black bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {error && <p className="text-red-600 text-lg text-center mb-4">{error}</p>} {/* Show error message */}
            <Link
              href="/signup"
              className="text-sm hover:underline hover:opacity-70 text-gray-800 mb-6 block text-center"
            >
              Don't have an account? Sign Up
            </Link>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-indigo-500 shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner className="text-white text-center" />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;