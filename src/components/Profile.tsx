"use client";
import React, { useState, useEffect } from "react";
import { getUserData } from "@/actions/authActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdEdit } from "react-icons/md";
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

const Profile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [edit,setEdit]=useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUserData();
      const formattedUsers: User[] = fetchedUsers.map((userData: any) => ({
        id: userData._id as string,
        name: userData.name,
        email: userData.email?.toString() || "N/A", // Safe access to 'email'
        image: userData.image || "",
      }));
      console.log(formattedUsers);
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  if (loading) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  if (!users.length) {
    return <p>No user data available.</p>; // Show if no users are available
  }

  const currentUser = users[0]; // Assuming you are dealing with one user, use the first one.

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-950/90 max-sm:mx-4 shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex gap-4 ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-bold text-center text-gray-400 mb-6">
            {currentUser.name}
          </h1>
          <MdEdit className="text-gray-200 text-2xl mt-2"/>
        </div>

        {/* Display User Email */}
        <div className=" flex gap-4">
          <label className="block text-gray-200 text-lg font-bold mb-2">
            Email :
          </label>
          <p className="text-gray-500 text-lg">{currentUser.email}</p>
        </div>
        {/* Display User Name */}
        {/* <div className="mb-4 flex gap-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Name:
          </label>
          <p className="text-gray-500 text-lg">{currentUser.name}</p>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
