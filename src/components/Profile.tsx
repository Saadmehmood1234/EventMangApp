// // "use client";
// // import { useState,useEffect } from "react";
// // import { User, Camera, Mail, Building, MapPin, Phone, NotepadText,FileDigit} from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// // import { getUserData } from "@/actions/authActions";
// // import { User as MyUser} from "@/lib/types"
// // interface ProfileData {
// //   id:string
// //   name: string;
// //   email: string;
// //   semester: string;
// //   course: string;
// //   enrollment: string;
// //   avatarUrl: string;
// //   phone?:string
// // }
// // export default function ProfilePage() {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [users, setUsers] = useState<MyUser[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [profile, setProfile] = useState<ProfileData>({
// //     id:"",
// //     name: "",
// //     email: "",
// //     semester: "",
// //     course: "",
// //     phone:"",
// //     enrollment: "",
// //     avatarUrl: "",
// //   });
// //   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setProfile(prev => ({
// //           ...prev,
// //           avatarUrl: reader.result as string
// //         }));
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };
// //   const fetchUsers = async () => {
// //     try {
// //       const fetchedUsers = await getUserData();
// //       const formattedUsers: MyUser[] = fetchedUsers.map((userData: any) => ({
// //         id: userData._id as string,
// //         name: userData.name,
// //         email: userData.email?.toString() || "N/A",
// //         image: userData.image || "",
// //       }));
// //       console.log(formattedUsers);
// //       setUsers(formattedUsers);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);
// //  console.log(profile)
// //   useEffect(()=>{
// //     const EditUser = async () => {
// //       try {
// //         const response = await fetch(`/api/profile`, {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(profile),
// //         });

// //         if (!response.ok) {
// //           throw new Error('Failed to update user profile');
// //         }

// //         return await response.json();
// //       } catch (error) {
// //         console.error('Error updating user:', error);
// //         throw error;
// //       }
// //     };
// //   },[profile])
// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

// //   if (!users.length) {
// //     return <p>No user data available.</p>;
// //   }

// //   const currentUser = users[0];
// //   const handleSave = () => {
// //     setIsEditing(false);
// //   };
// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-3xl mx-auto">
// //         <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl">
// //           <CardHeader className="text-center">
// //             <CardTitle className="text-3xl font-bold">Profile Settings</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-8">
// //               <div className="flex flex-col items-center space-y-4">
// //                 <div className="relative">
// //                   <Avatar className="w-32 h-32">
// //                     <AvatarImage src={currentUser.image || profile.avatarUrl} alt={profile.name} />
// //                     <AvatarFallback>
// //                       <User className="w-12 h-12" />
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   {isEditing && (
// //                     <div className="absolute bottom-0 right-0">
// //                       <Label htmlFor="avatar" className="cursor-pointer">
// //                         <div className="rounded-full bg-primary p-2 hover:bg-primary/90 transition-colors">
// //                           <Camera className="w-4 h-4 text-white" />
// //                         </div>
// //                         <Input
// //                           id="avatar"
// //                           type="file"
// //                           accept="image/*"
// //                           className="hidden"
// //                           onChange={handleAvatarChange}
// //                         />
// //                       </Label>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //               {/* Profile Information */}
// //               <div className="space-y-6">
// //                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="name">Full Name</Label>
// //                     <div className="relative">
// //                       <Input
// //                         id="name"
// //                         value={currentUser.name}
// //                         readOnly={!isEditing}
// //                         onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
// //                         className="pl-9"
// //                       />
// //                       <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
// //                     </div>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="email">Email</Label>
// //                     <div className="relative">
// //                       <Input
// //                         id="email"
// //                         type="email"
// //                         value={currentUser.email}
// //                         readOnly={!isEditing}
// //                         onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
// //                         className="pl-9"
// //                       />
// //                       <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
// //                     </div>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="enrollment">Enrollment</Label>
// //                     <div className="relative">
// //                       <Input
// //                         id="enrollment"
// //                         value={currentUser.enrollment}
// //                         readOnly={!isEditing}
// //                         onChange={(e) => setProfile(prev => ({ ...prev, enrollment: e.target.value }))}
// //                         className="pl-9"
// //                       />
// //                       <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
// //                     </div>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="course">Course</Label>
// //                     <div className="relative">
// //                       <Input
// //                         id="location"
// //                         value={currentUser.course}
// //                         readOnly={!isEditing}
// //                         onChange={(e) => setProfile(prev => ({ ...prev, course: e.target.value }))}
// //                         className="pl-9"
// //                       />
// //                       < NotepadText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
// //                     </div>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="semester">Semester</Label>
// //                     <div className="relative">
// //                       <Input
// //                         id="semester"
// //                         value={currentUser.semester}
// //                         readOnly={!isEditing}
// //                         onChange={(e) => setProfile(prev => ({ ...prev, semester: e.target.value }))}
// //                         className="pl-9"
// //                       />
// //                       <FileDigit className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
// //                     </div>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="phone">Phone No.</Label>
// //                     <div className="relative">
// //                       <Input
// //                         id="phone"
// //                         value={currentUser.phone}
// //                         readOnly={!isEditing}
// //                         onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
// //                         className="pl-9"
// //                       />
// //                       <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <Separator />
// //                 <div className="flex justify-end space-x-4">
// //                   {isEditing ? (
// //                     <>
// //                       <Button variant="outline" onClick={() => setIsEditing(false)}>
// //                         Cancel
// //                       </Button>
// //                       <Button onClick={handleSave}>
// //                         Save Changes
// //                       </Button>
// //                     </>
// //                   ) : (
// //                     <Button onClick={() => setIsEditing(true)}>
// //                       Edit Profile
// //                     </Button>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useState, useEffect } from "react";
// import {
//   User,
//   Camera,
//   Mail,
//   Building,
//   Phone,
//   NotepadText,
//   FileDigit,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { getUserData } from "@/actions/authActions";
// import { User as MyUser } from "@/lib/types";

// // ProfileData interface ensures type safety for profile details
// interface ProfileData {
//   id: string;
//   name: string;
//   email: string;
//   semester: string;
//   course: string;
//   enrollment: string;
//   avatarUrl: string;

//   phone?: string;
// }
// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [users, setUsers] = useState<MyUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<ProfileData>({
//     id: "",
//     name: "",
//     email: "",
//     semester: "",
//     course: "",
//     phone: "",
//     enrollment: "",
//     avatarUrl: "",
//   });

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfile((prev) => ({
//         ...prev,
//         avatarUrl: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const fetchedUsers = await getUserData();
//       const formattedUsers: MyUser[] = fetchedUsers.map((userData: any) => ({
//         id: userData._id as string,
//         name: userData.name,
//         email: userData.email?.toString() || "N/A",
//         image: userData.image || "",
//       }));
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
//   useEffect(() => {
//     const handleSave = async () => {
//       try {
//         const formData = new FormData();
//         formData.append("id", profile.id);
//         formData.append("name", profile.name);
//         formData.append("email", profile.email);
//         formData.append("semester", profile.semester);
//         formData.append("course", profile.course);
//         formData.append("enrollment", profile.enrollment);
//         formData.append("phone", profile.phone || "");
//         const avatarInput = document.getElementById(
//           "avatar"
//         ) as HTMLInputElement;
//         if (avatarInput && avatarInput.files?.[0]) {
//           formData.append("avatar", avatarInput.files[0]);
//         }
//         const response = await fetch("your-api-endpoint", {
//           method: "POST", 
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to save profile");
//         }
//         console.log("Profile updated successfully");
//         setIsEditing(false);
//       } catch (error) {
//         console.error("Error saving profile:", error);
//       }
//     };
//   });
//   const handleSave = () => {
//     setIsEditing(false);
//   };
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (!users.length) {
//     return <p>No user data available.</p>;
//   }
//   const currentUser = users[0];
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-3xl font-bold">
//               Profile Settings
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-8">
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="relative">
//                   <Avatar className="w-32 h-32">
//                     <AvatarImage
//                       src={currentUser.image || profile.avatarUrl}
//                       alt={profile.name}
//                     />
//                     <AvatarFallback>
//                       <User className="w-12 h-12" />
//                     </AvatarFallback>
//                   </Avatar>
//                   {isEditing && (
//                     <div className="absolute bottom-0 right-0">
//                       <Label htmlFor="avatar" className="cursor-pointer">
//                         <div className="rounded-full bg-primary p-2 hover:bg-primary/90 transition-colors">
//                           <Camera className="w-4 h-4 text-white" />
//                         </div>
//                         <Input
//                           id="avatar"
//                           type="file"
//                           accept="image/*"
//                           className="hidden"
//                           onChange={handleAvatarChange}
//                         />
//                       </Label>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {/* Profile Information */}
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <div className="relative">
//                       <Input
//                         id="name"
//                         value={profile.name || currentUser.name}
//                         readOnly={!isEditing}
//                         onChange={(e) =>
//                           setProfile((prev) => ({
//                             ...prev,
//                             name: e.target.value,
//                           }))
//                         }
//                         className="pl-9"
//                       />
//                       <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <div className="relative">
//                       <Input
//                         id="email"
//                         type="email"
//                         value={currentUser.email}
//                         readOnly={!isEditing}
//                         onChange={(e) =>
//                           setProfile((prev) => ({
//                             ...prev,
//                             email: e.target.value,
//                           }))
//                         }
//                         className="pl-9"
//                       />
//                       <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="enrollment">Enrollment</Label>
//                     <div className="relative">
//                       <Input
//                         id="enrollment"
//                         value={currentUser.enrollment}
//                         readOnly={!isEditing}
//                         onChange={(e) =>
//                           setProfile((prev) => ({
//                             ...prev,
//                             enrollment: e.target.value,
//                           }))
//                         }
//                         className="pl-9"
//                       />
//                       <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="course">Course</Label>
//                     <div className="relative">
//                       <Input
//                         id="location"
//                         value={currentUser.course}
//                         readOnly={!isEditing}
//                         onChange={(e) =>
//                           setProfile((prev) => ({
//                             ...prev,
//                             course: e.target.value,
//                           }))
//                         }
//                         className="pl-9"
//                       />
//                       <NotepadText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="semester">Semester</Label>
//                     <div className="relative">
//                       <Input
//                         id="semester"
//                         value={currentUser.semester}
//                         readOnly={!isEditing}
//                         onChange={(e) =>
//                           setProfile((prev) => ({
//                             ...prev,
//                             semester: e.target.value,
//                           }))
//                         }
//                         className="pl-9"
//                       />
//                       <FileDigit className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone No.</Label>
//                     <div className="relative">
//                       <Input
//                         id="phone"
//                         value={currentUser.phone}
//                         readOnly={!isEditing}
//                         onChange={(e) =>
//                           setProfile((prev) => ({
//                             ...prev,
//                             phone: e.target.value,
//                           }))
//                         }
//                         className="pl-9"
//                       />
//                       <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                     </div>
//                   </div>
//                 </div>
//                 <Separator />
//                 <div className="flex justify-end space-x-4">
//                   {isEditing ? (
//                     <>
//                       <Button
//                         variant="outline"
//                         onClick={() => setIsEditing(false)}
//                       >
//                         Cancel
//                       </Button>
//                       <Button onClick={handleSave}>Save Changes</Button>
//                     </>
//                   ) : (
//                     <Button onClick={() => setIsEditing(true)}>
//                       Edit Profile
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import {
  User,
  Camera,
  Mail,
  Building,
  Phone,
  NotepadText,
  FileDigit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserData } from "@/actions/authActions";
import { User as MyUser } from "@/lib/types";
interface ProfileData {
  id: string;
  name: string;
  email: string;
  semester?: string;
  course?: string;
  enrollment?: string;
  image?: string;
  phone?: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState<MyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    id: "",
    name: "",
    email: "",
    semester: "",
    course: "",
    phone: "",
    enrollment: "",
    image: "",
  });
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUserData();
      const formattedUsers: MyUser[] = fetchedUsers.map((userData: any) => ({
        id: userData._id as string,
        name: userData.name,
        email: userData.email?.toString() || "N/A",
        image: userData.image || "",
        semester:userData.semester,
        course:userData.course,
        enrollment:userData.enrollment,
        phone:userData.phone
      }));
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

  useEffect(() => {
    if (users.length > 0) {
      const currentUser = users[0];
      setProfile((prev) => ({
        ...prev,
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        image: currentUser.image,
        semester:currentUser.semester,
        phone:currentUser.phone,
        course:currentUser.course,
        enrollment:currentUser.enrollment
      }));
    }
  }, [users]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("id", profile.id);
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("semester", profile.semester || "");
      formData.append("course", profile.course || "");
      formData.append("enrollment", profile.enrollment || "");
      formData.append("phone", profile.phone || "");
      formData.append("phone", profile.image || "");
      const avatarInput = document.getElementById(
        "avatar"
      ) as HTMLInputElement;
      if (avatarInput && avatarInput.files?.[0]) {
        formData.append("avatar", avatarInput.files[0]);
      }
      const response = await fetch("/api/profile", {
        method: "PUT", 
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }
      console.log("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[100vh] dark:bg-gray-900 dark:text-white text-gray-900 bg-gray-200 justify-center items-center w-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (!users.length) {
    return <p>No user data available.</p>;
  }
console.log("profile",profile)
  const currentUser = users[0];
console.log("currentUser:",currentUser)
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={profile.image || currentUser.image}
                      alt={profile.name}
                    />
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={profile.name || currentUser.name}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
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
                        value={profile.email || currentUser.email}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="pl-9"
                      />
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enrollment">Enrollment</Label>
                    <div className="relative">
                      <Input
                        id="enrollment"
                        value={profile.enrollment || currentUser.enrollment}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            enrollment: e.target.value,
                          }))
                        }
                        className="pl-9"
                      />
                      <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <div className="relative">
                      <Input
                        id="course"
                        value={profile.course || currentUser.course}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            course: e.target.value,
                          }))
                        }
                        className="pl-9"
                      />
                      <NotepadText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <div className="relative">
                      <Input
                        id="semester"
                        value={profile.semester || currentUser.semester}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            semester: e.target.value,
                          }))
                        }
                        className="pl-9"
                      />
                      <FileDigit className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone No.</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        value={profile.phone || currentUser.phone}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="pl-9"
                      />
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="space-x-4">
                  <Button
                    // variant="secondary"
                    className="bg-indigo-500  text-gray-200"
                    onClick={() => setIsEditing((prev) => !prev)}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleSave} className="bg-indigo-500">
                      Save
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
