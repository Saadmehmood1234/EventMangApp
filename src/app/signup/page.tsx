// "use client";
// import { MyEventUser } from "@/model/User";
// import Link from "next/link";
// import connectToMongoDb from "@/utils/dbConnect";
// import { Spinner } from "flowbite-react";
// import { useState } from "react"; // Import useState
// import { useRouter } from "next/navigation";
// const SignUp = () => {
//   const [loading, setLoading] = useState<boolean>(false); // State for loading
//   const router = useRouter();
//   const signUp = async (formData: FormData) => {
//     setLoading(true); // Start loading

//     try {
//       await connectToMongoDb();
//       const name = formData.get("name") as string | undefined;
//       const email = formData.get("email") as string | undefined;
//       const password = formData.get("password") as string | undefined;

//       const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Error in Sign Up");
//       }

//       router.push("/signin");
//     } catch (error: any) {
//       console.error(error);
//       alert("Error in Sign Up: " + error.message); // Handle errors appropriately
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   // Update form submission handler
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent default form submission
//     const formData = new FormData(event.currentTarget);
//     await signUp(formData);
//   };

//   return (
//     <div className="flex justify-center items-center w-full bg-gradient-to-r from-blue-200 to-green-200 h-screen">
//       <div className="container p-6 max-w-md rounded-xl mx-4 bg-gradient-to-r from-blue-400 to-green-400 shadow-xl shadow-gray-500">
//         <h1 className="text-4xl font-extrabold text-gray-700 text-center">
//           Welcome to <span className="text-gray-700">Eventify</span>
//         </h1>

//         <div className="sm:p-8 p-2 rounded-lg">
//           <form onSubmit={handleSubmit}>
//             {" "}
//             {/* Use handleSubmit for the form */}
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter Name"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter Email"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter Password"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>
//             <Link
//               href="/signin"
//               className="text-sm hover:underline hover:opacity-70 text-gray-700 mb-6 block text-center"
//             >
//               Already have an account?
//             </Link>
//             <button
//               type="submit"
//               className="w-full py-3 rounded-lg font-semibold text-white bg-[#cc2b50] shadow-md hover:bg-[#e65a7b] focus:outline-none focus:ring-2 focus:ring-[#cc2b50]"
//               disabled={loading} // Disable button during loading
//             >
//            {loading ? (
//                 <div className="flex justify-center items-center">
//                   {" "}
//                   <Spinner className="text-white text-center" />
//                 </div>
//               ) : (
//                 "Sign up"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


"use client";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const router = useRouter();

  const signUp = async (formData: FormData) => {
    setLoading(true);
    setErrorMessage(null); // Reset error message

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

      router.push("/signin"); // Redirect on successful signup
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message); // Set error message on error
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
    <div className="flex justify-center items-center w-full bg-gradient-to-r from-blue-200 to-green-200 h-screen">
      <div className="container p-6 max-w-md rounded-xl mx-4 bg-gradient-to-r from-blue-400 to-green-400 shadow-xl shadow-gray-500">
        <h1 className="text-4xl font-extrabold text-gray-700 text-center">
          Welcome to <span className="text-gray-700">Eventify</span>
        </h1>

        <div className="sm:p-8 p-2 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {errorMessage && ( // Display error message if present
              <p className="text-red-700 text-lg text-center mb-4">{errorMessage}</p>
            )}

            <Link
              href="/signin"
              className="text-sm hover:underline hover:opacity-70 text-gray-700 mb-6 block text-center"
            >
              Already have an account?
            </Link>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-[#cc2b50] shadow-md hover:bg-[#e65a7b] focus:outline-none focus:ring-2 focus:ring-[#cc2b50]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner color="text-white" />
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
