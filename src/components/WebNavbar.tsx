"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggler from "./ThemeToggler";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type NavbarClientProps = {
  session: any;
  formattedUser: User[];
  showNavbar: boolean;
};

export default function NavbarClient({
  session,
  formattedUser,
  showNavbar,
}: NavbarClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar state
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <header className="w-full flex justify-between items-center h-20 px-6 bg-indigo-400 shadow-md rounded-b-lg">
      <nav className="flex w-full justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <img src="/dbitlogo.png" className="w-16 h-16" alt="" />
          <Link href="/user" className="text-2xl text-gray-200 font-bold">
            Eventify
          </Link>
        </div>

        {/* Mobile Navbar Button */}
        <div className="sm:hidden">
          <Button
            onClick={toggleSidebar} // Call the toggle function to show the sidebar
            variant="default"
            className="bg-gray-700 text-white"
          >
            Menu
          </Button>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden sm:flex gap-4">
          {!session ? (
            <Link href="/signin">
              <Button variant="default">Sign In</Button>
            </Link>
          ) : (
            <div className="flex gap-4">
              <form action="/signout" className="flex items-center gap-5">
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
                              src={formattedUser[0]?.image || "/path/to/default-avatar.png"}
                              alt={formattedUser[0]?.name || "User"}
                            />
                            <AvatarFallback>
                              {formattedUser[0]?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="border-none">
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
        </div>
      </nav>
    </header>
  );
}
