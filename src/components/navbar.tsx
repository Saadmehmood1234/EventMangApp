import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggler from "./ThemeToggler";
import { auth } from "@/auth";
import { handleSignOut } from "@/actions/authActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserData } from "@/actions/authActions";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {User} from "@/lib/types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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
        <div className="flex max-sm:gap-1 gap-2 justify-center items-center">
          <img src="/dbitlogo.png" className="w-16 h-16" alt="" />
        <Link href="/user" className="text-2xl max-sm:text-xl text-gray-200 font-bold">
          Eventify
        </Link>
        </div>
        {!session ? (
          <Link href="/signin">
            <Button variant="default">Sign In</Button>
          </Link>
        ) : (
         <div className="flex max-sm:gap-1 gap-4">
           <form action={handleSignOut} className="flex items-center max-sm:gap-1 gap-5">
            {showNavbar && (
              <Link href="/admin" className="text-gray-200 hover:underline">
                Admin
              </Link>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/user/profile">
                    <div className="flex items-center justify-center  hover:text-gray-700">
                      <Avatar className="bg-white max-sm:w-8 max-sm:h-8">
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
                    className="bg-gray-800 hover:bg-gray-900 text-white rounded-full max-sm:text-lg max-sm:p-2 text-2xl p-2 transition duration-200"
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
