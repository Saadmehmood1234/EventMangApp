import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggler from "./ThemeToggler";
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
         <div className="flex gap-4">
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
                  <p className=" dark:text-white text-gray-900">Profile</p>
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
                  <p className=" dark:text-white text-gray-900">Log out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
          <ThemeToggler />
         </div>
          
        )}
  
      </nav>
    </header>
  );
}
