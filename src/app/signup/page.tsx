
"use client";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const signUp = async (formData: FormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const name = formData.get("name") as string | undefined;
      const email = formData.get("email") as string | undefined;
      const password = formData.get("password") as string | undefined;

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error in Sign Up");
      }

      router.push("/signin");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await signUp(formData);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-300">
      <div className="container p-6 max-w-md rounded-xl mx-4 bg-gray-200  shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          Welcome to <span className="text-indigo-500">Eventify</span>
        </h1>

        <div className="p-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                required
                className="w-full px-4 py-2 border text-black rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
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
                required
                className="w-full px-4 py-2 border rounded-lg text-black bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 text-lg text-center mb-4">{errorMessage}</p>
            )}

            <Link
              href="/signin"
              className="text-sm hover:underline hover:opacity-70 text-gray-800 mb-6 block text-center"
            >
              Already have an account?
            </Link>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-indigo-500 shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner className="text-white text-center" />
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
