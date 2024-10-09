

import AdminSidebar from "@/components/Admin/AdminSidebar";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { getUserData } from "@/actions/authActions";
import { redirect } from "next/navigation"; // Change the import

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const fetchedUser = await getUserData();

  const formattedUser: User[] = fetchedUser.map((userData: any) => ({
    id: userData.id as string,
    name: userData.name,
    email: userData.email.toString(),
    role: userData.role?.toString() || "",
  }));

  console.log("Formatted User Data:", formattedUser);

  // Check for session and admin role
  if (!session || (formattedUser.length > 0 && formattedUser[0].role !== "admin")) {
    // Redirect immediately without rendering the rest of the component
    redirect("/signin");
    return null; // Prevent rendering anything else
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 h-screen overflow-x-auto bg-gray-100">
        {children}
      </div>
    </div>
  );
}
