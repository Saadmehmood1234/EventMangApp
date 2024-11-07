// "use client";
// import React, { useState, useEffect } from "react";
// import { getUserData } from "@/actions/authActions";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MdEdit } from "react-icons/md";
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   image?: string;
// }

// const Profile = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [edit,setEdit]=useState<boolean>(false);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const fetchedUsers = await getUserData();
//       const formattedUsers: User[] = fetchedUsers.map((userData: any) => ({
//         id: userData._id as string,
//         name: userData.name,
//         email: userData.email?.toString() || "N/A", // Safe access to 'email'
//         image: userData.image || "",
//       }));
//       console.log(formattedUsers);
//       setUsers(formattedUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

  
//   if (loading) {
//     return <p>Loading...</p>; // Show loading state while data is being fetched
//   }

//   if (!users.length) {
//     return <p>No user data available.</p>; // Show if no users are available
//   }

//   const currentUser = users[0]; // Assuming you are dealing with one user, use the first one.

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-gray-950/90 max-sm:mx-4 shadow-md rounded-lg p-8 max-w-md w-full">
//         <div className="flex gap-4 ">
//           <Avatar>
//             <AvatarImage src="https://github.com/shadcn.png" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>

//           <h1 className="text-3xl font-bold text-center text-gray-400 mb-6">
//             {currentUser.name}
//           </h1>
//           <MdEdit className="text-gray-200 text-2xl mt-2"/>
//         </div>

//         {/* Display User Email */}
//         <div className=" flex gap-4">
//           <label className="block text-gray-200 text-lg font-bold mb-2">
//             Email :
//           </label>
//           <p className="text-gray-500 text-lg">{currentUser.email}</p>
//         </div>
//         {/* Display User Name */}
//         {/* <div className="mb-4 flex gap-4">
//           <label className="block text-gray-200 text-sm font-bold mb-2">
//             Name:
//           </label>
//           <p className="text-gray-500 text-lg">{currentUser.name}</p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Profile;
"use client";

import { useState } from "react";
import { User, Camera, Mail, Building, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  company: string;
  avatarUrl: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "Sarah Anderson",
    email: "sarah.anderson@example.com",
    bio: "Senior Software Engineer passionate about building beautiful user interfaces and solving complex problems.",
    location: "San Francisco, CA",
    company: "TechCorp Inc.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop",
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatarUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the profile data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback>
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <Label htmlFor="avatar" className="cursor-pointer">
                        <div className="rounded-full bg-primary p-2 hover:bg-primary/90 transition-colors">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <Input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={profile.name}
                        readOnly={!isEditing}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-9"
                      />
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        readOnly={!isEditing}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-9"
                      />
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Input
                        id="company"
                        value={profile.company}
                        readOnly={!isEditing}
                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="pl-9"
                      />
                      <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <Input
                        id="location"
                        value={profile.location}
                        readOnly={!isEditing}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-9"
                      />
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    readOnly={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                <Separator />

                <div className="flex justify-end space-x-4">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}