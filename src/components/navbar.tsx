import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/actions/authActions";
export default async function Navbar() {
  const session = await auth();
  console.log({ session });
  // const pathname = usePathname();
  const showNavbar = session?.user.role == "admin";
  //{showNavbar && <Navbar />}
  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>
      {!session ? (
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          {!showNavbar && (
           
            <div className="flex gap-4 justify-center items-center">
             
              {/* <Link href="/" className="hover:underline text-gray-700">
                Events
              </Link> */}
              <Link href="/user/profile">profile</Link>
              <Link
                href="/user/history"
                className="hover:underline text-gray-700"
              >
                Event History
              </Link>
              <Button variant="default" type="submit">
                Sign Out
              </Button>
            </div>
           )} 
        </form>
      )}
    </nav>
  );
}
