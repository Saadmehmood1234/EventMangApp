import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/actions/authActions";

import { getUserData } from "@/actions/authActions";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
export default async function Navbar() {
  const session = await auth();
  console.log({ session });
  // const pathname = usePathname();
  const fetchedUser = await getUserData();
  const formattedUser: User[] = fetchedUser.map((userData: any) => ({
    id: userData.id as string,
    name: userData.name,
    email: userData.email.toString(),
    role: userData.role?.toString() || "",
  }));
  const showNavbar = formattedUser[0].role === "admin";
  console.log(showNavbar)
  //{showNavbar && <Navbar />}
  return (
    <header className="w-full flex justify-between max-sm:h-24 items-center p-6 bg-slate-700 rounded-b-lg shadow-lg">
      <nav className=" flex w-full max-md:mb-4` justify-between items-center">
        <Link href="/" className="text-xl text-orange-600 font-bold">
          Eventify
        </Link>
        {!session ? (
          <Link href="/signin">
            <Button variant="default">Sign In</Button>
          </Link>
        ) : (
          <form action={handleSignOut} className="flex gap-3">
              {showNavbar && (
              <div className="flex gap-4 justify-center items-center">
                <Link href="/admin" className="hover:underline text-gray-200">
                Admin
              </Link>
                {/* <Link href="/user/profile">profile</Link> */}
                {/* <Link
                href="/user/history"
                className="hover:underline text-gray-700"
              >
                Event History
              </Link> */}
                {/* <Button variant="default" type="submit">
                Sign Out
              </Button> */}
              </div>
            )}
            <div className="flex gap-4 justify-center items-center">
              <Button variant="default" type="submit">
                Sign Out
              </Button>
            </div>
          
          </form>
        )}
      </nav>
    </header>
  );
}

// <div className="flex  gap-4">
//   <div className="sm:w-16 w-12 flex justify-center items-center h-2 sm:h-8">
//     <img src="/dbitlogo.png" alt="" />
//   </div>
//   <div className="text-2xl ml-2  font-bold text-gray-200">Eventify</div>
// </div>
// <nav className="gap-3 flex  items-center">
