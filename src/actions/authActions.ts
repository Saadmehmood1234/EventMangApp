"use server";
import { signOut } from "@/auth";
import connectToMongoDb from "@/utils/dbConnect";
import { MyEventUser } from "@/model/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function handleSignOut() {
  await signOut();
}

// export const getUserData = async () => {
//   await connectToMongoDb();
//    const session=await auth();
//    const email=session?.user?.email;
//   const Eventuser = await MyEventUser.findOne({ email });
//   if(!Eventuser){
//     return;
//   }
//   console.log("Saad",Eventuser);
//   return Eventuser;
// };

export const getUserData = async () => {
  await connectToMongoDb();
  const session = await auth();
  const email = session?.user?.email;

  // Ensure you check if the session and email are valid
  if (!email) {
    return []; // Return an empty array if there's no email
  }

  const eventUser = await MyEventUser.findOne({ email });
  if (!eventUser) {
    return []; // Return an empty array if no user found
  }

  console.log("Fetched User Data:", eventUser);

  // Return the user wrapped in an array to allow mapping
  return [eventUser];
};
