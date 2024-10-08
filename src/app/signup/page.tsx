// "use client";
// import React, { useState } from "react";
// import { MyEventUser } from "@/model/User";
// import Link from "next/link";
// import bcryptjs from 'bcryptjs';
// import { redirect } from "next/navigation";
// import connectToMongoDb from "@/utils/dbConnect";
// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const signUp=async (formData: FormData) => {
//     "use server";
//     await connectToMongoDb();
//     const name = formData.get("name") as string | undefined;
//     const email = formData.get("email") as string | undefined;
//     const password = formData.get("password") as string | undefined;

//     if (!email || !name || !password) {
//       throw new Error("Please provide all fields");
//     }

//     const user = await MyEventUser.findOne({ email });

//     if (user) {
//       throw new Error("User Already exists");
//     }

//    const hashedPassword=await bcryptjs.hash(password,10);

//    await  MyEventUser.create({
//       name,
//       email,
//       password:hashedPassword,
//     });
//     redirect("/signup");
//   }
//   return (
//     <div className="flex justify-center items-center w-full bg-slate-700 h-screen">
//       <div className="container  p-6 max-w-md rounded-lg mx-4 bg-gray-950/90 border-2 border-gray-200">
//         <h1 className="text-4xl font-extrabold text-gray-400 text-center">
//           Welcome to <span className="text-gray-400">Eventify</span>
//         </h1>

//         <div className="sm:p-8 p-2 bg-gray-950/90 rounded-lg shadow-lg">
//           <form
//             action={signUp}
//           >
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 name={name}
//                 // onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter Name"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 name={email}
//                 // onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter Email"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 name={password}
//                 // onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter Password"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <Link
//               href="/signin"
//               className="text-sm hover:underline hover:opacity-70 text-gray-300 mb-6 block text-center"
//             >
//               Already have an account?
//             </Link>

//             <button
//               type="submit"
//               className="w-full py-3 rounded-lg font-semibold text-white  bg-blue-600 shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {/* {loading ? (
//                 <span className="animate-spin inline-block w-5 h-5 border-4 border-t-4 border-white border-opacity-30 rounded-full"></span>
//               ) : (
//                 "Sign Up"
//               )} */}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import { MyEventUser } from "@/model/User";
import Link from "next/link";
import bcryptjs from 'bcryptjs';
import { redirect } from "next/navigation";
import connectToMongoDb from "@/utils/dbConnect";

const SignUp = () => {
  const signUp = async (formData: FormData) => {
    "use server";
    await connectToMongoDb();
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !name || !password) {
      throw new Error("Please provide all fields");
    }

    const user = await MyEventUser.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await MyEventUser.create({
      name,
      email,
      password: hashedPassword,
    });

    redirect("/signin"); // Redirect to signin after successful signup
  };

  return (
    <div className="flex justify-center items-center w-full bg-slate-700 h-screen">
      <div className="container p-6 max-w-md rounded-lg mx-4 bg-gray-950/90 border-2 border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-400 text-center">
          Welcome to <span className="text-gray-400">Eventify</span>
        </h1>

        <div className="sm:p-8 p-2 bg-gray-950/90 rounded-lg shadow-lg">
          <form action={signUp}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <Link
              href="/signin"
              className="text-sm hover:underline hover:opacity-70 text-gray-300 mb-6 block text-center"
            >
              Already have an account?
            </Link>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
