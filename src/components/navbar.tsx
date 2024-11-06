// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import { auth } from "@/auth";
// // import { handleSignOut } from "@/actions/authActions";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // import { getUserData } from "@/actions/authActions";

// // interface User {
// //   id: string;
// //   name: string;
// //   email: string;
// //   role: string;
// // }
// // export default async function Navbar() {
// //   const session = await auth();
// //   console.log({ session });
// //   // const pathname = usePathname();
// //   const fetchedUser = await getUserData();
// //   const formattedUser: User[] = fetchedUser.map((userData: any) => ({
// //     id: userData.id as string,
// //     name: userData.name,
// //     email: userData.email.toString(),
// //     role: userData.role?.toString() || "",
// //   }));
// //   const showNavbar = formattedUser[0].role === "admin";
// //   console.log(showNavbar);
// //   //{showNavbar && <Navbar />}
// //   return (
// //     <header className="w-full flex justify-between h-20  items-center px-6 bg-[#377885] rounded-b-lg shadow-lg">
// //       <nav className=" flex w-full  justify-between items-center">
// //         <Link href="/" className="text-xl text-gray-200 font-bold">
// //           Eventify
// //         </Link>
// //         {!session ? (
// //           <Link href="/signin">
// //             <Button variant="default">Sign In</Button>
// //           </Link>
// //         ) : (
// //           <form action={handleSignOut} className="flex gap-3">
// //             <div className="flex justify-center hover:text-gray-200 items-center text-white">
// //               <Link href="/user/profile">
// //                <div>
// //                <Avatar>
// //                   <AvatarImage src="https://github.com/shadcn.png" />
// //                   <AvatarFallback>CN</AvatarFallback>
// //                 </Avatar>
// //                </div>
// //               </Link>
// //             </div>
// //             {showNavbar && (
// //               <div className="flex gap-4 justify-center items-center">
// //                 <Link href="/admin" className="hover:underline text-gray-200">
// //                   Admin
// //                 </Link>

// //                 {/* <Link
// //                 href="/user/history"
// //                 className="hover:underline text-gray-700"
// //               >
// //                 Event History
// //               </Link> */}
// //                 {/* <Button variant="default" type="submit">
// //                 Sign Out
// //               </Button> */}
// //               </div>
// //             )}
// //             <div className="flex gap-4 justify-center items-center">
// //               {/* <Button variant="default" type="submit">
// //                 Sign Out
// //               </Button> */}
// //               <button  type="submit" className="bg-[#da496a] text-gray-200 rounded px-4 py-2">
// //                 Sign Out
// //               </button>
// //             </div>
// //           </form>
// //         )}
// //       </nav>
// //     </header>
// //   );
// // }

// // // <div className="flex  gap-4">
// // //   <div className="sm:w-16 w-12 flex justify-center items-center h-2 sm:h-8">
// // //     <img src="/dbitlogo.png" alt="" />
// // //   </div>
// // //   <div className="text-2xl ml-2  font-bold text-gray-200">Eventify</div>
// // // </div>
// // // <nav className="gap-3 flex  items-center">
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { auth } from "@/auth";
// import { handleSignOut } from "@/actions/authActions";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getUserData } from "@/actions/authActions";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   image: string;
// }

// export default async function Navbar() {
//   const session = await auth();
//   const fetchedUser = await getUserData();

//   const formattedUser: User[] = fetchedUser.map((userData: any) => ({
//     id: userData.id as string,
//     name: userData.name,
//     email: userData.email.toString(),
//     role: userData.role?.toString() || "",
//     image: userData.image
//   }));

//   const showNavbar = formattedUser[0]?.role === "admin";

//   return (
//     <header className="w-full flex justify-between items-center h-20 px-6 bg-indigo-400 shadow-md rounded-b-lg">
//       <nav className="flex w-full justify-between items-center">
//         {/* Logo and Brand Name */}
//         <Link href="/" className="text-2xl text-gray-200 font-bold">
//           Eventify
//         </Link>

//         {/* Authentication Links */}
//         {!session ? (
//           <Link href="/signin">
//             <Button variant="default">Sign In</Button>
//           </Link>
//         ) : (
//           <form action={handleSignOut} className="flex items-center gap-5">
//             {/* User Avatar and Profile Link */}
//             <Link href="/user/profile">
//               <div className="flex items-center justify-center hover:text-gray-200">
//                 <Avatar>
//                   <AvatarImage
//                     src={formattedUser[0]?.image || ""}
//                     alt={formattedUser[0]?.name || "User"}
//                   />
//                   <AvatarFallback>
//                     {formattedUser[0]?.name?.charAt(0) || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//             </Link>

//             {/* Admin Link (Visible for Admins Only) */}
//             {showNavbar && (
//               <Link href="/admin" className="text-gray-200 hover:underline">
//                 Admin
//               </Link>
//             )}

//             {/* Sign Out Button */}
//             <button
//               type="submit"
//               className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition duration-200"
//             >
//               Sign Out
//             </button>
//           </form>
//         )}
//       </nav>
//     </header>
//   );
// }

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/actions/authActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserData } from "@/actions/authActions";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}
export default async function Navbar() {
  const session = await auth();
  const fetchedUser = await getUserData();
  const formattedUser: User[] =
    fetchedUser && Array.isArray(fetchedUser)
      ? fetchedUser.map((userData: any) => ({
          id: userData.id as string,
          name: userData.name,
          email: userData.email.toString(),
          role: userData.role?.toString() || "",
          image: userData.image,
        }))
      : [];
  const showNavbar =
    formattedUser.length > 0 && formattedUser[0]?.role === "admin";
  return (
    <header className="w-full flex justify-between items-center h-20 px-6 bg-indigo-400 shadow-md rounded-b-lg">
      <nav className="flex w-full justify-between items-center">
        <Link href="/" className="text-2xl text-gray-200 font-bold">
          Eventify
        </Link>
        {!session ? (
          <Link href="/signin">
            <Button variant="default">Sign In</Button>
          </Link>
        ) : (
          <form action={handleSignOut} className="flex items-center gap-5">
            {showNavbar && (
              <Link href="/admin" className="text-gray-200 hover:underline">
                Admin
              </Link>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user/profile">
                    <div className="flex items-center justify-center hover:text-gray-700">
                      <Avatar className="bg-white">
                        <AvatarImage
                          src={
                            formattedUser[0]?.image ||
                            "/path/to/default-avatar.png"
                          }
                          alt={formattedUser[0]?.name || "User"}
                        />
                        <AvatarFallback>
                          {formattedUser[0]?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className=" border-none">
                  <p className=" text-white">Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white rounded-full text-2xl px-2 py-2 transition duration-200"
                  >
                    <RiLogoutCircleRLine />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="border-none">
                  <p className=" text-white">Log out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        )}
      </nav>
    </header>
  );
}
