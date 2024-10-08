
import { auth } from "@/auth"
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation"
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  // const email=session?.user.email;
  // const UserData=await getUserData();

  if (!session) {
    redirect("/signin");
    return null;
  }

  return (
    <html lang="en">
    <body>
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
      </div>

      <div className="w-full absolute top-0">
        <Navbar />
      </div>
      <div className="absolute sm:top-[8%] top-[9%] w-full h-[90vh]">
     {children}
      </div>
    </body>
  </html>
  );
}
