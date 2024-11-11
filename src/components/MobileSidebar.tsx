"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/types";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SidebarClientProps = {
  session: any;
  formattedUser: User[];
  showNavbar: boolean;
};

export default function SidebarClient({
  session,
  formattedUser,
  showNavbar,
}: SidebarClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false); // Close the sidebar

  return (
    <div
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } fixed inset-0 z-50 bg-black bg-opacity-50`} // Overlay when sidebar is open
    >
      <div
        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-60"
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <div className="flex justify-between items-center p-4">
          <button
            onClick={closeSidebar} // Close sidebar when button is clicked
            className="text-2xl font-semibold text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="flex flex-col p-4">
          <Link href="/user/profile" className="text-lg py-2">
            Profile
          </Link>
          {showNavbar && (
            <Link href="/admin" className="text-lg py-2">
              Admin Dashboard
            </Link>
          )}
          <Link href="/signin" className="text-lg py-2">
            Sign In
          </Link>
          <form action="/signout" className="py-2">
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
