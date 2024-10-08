import Link from "next/link";

const Header = () => {
  // const { userId } = auth();

  return (
    <header className="w-full flex justify-between items-center p-6 bg-orange-500 rounded-b-lg shadow-lg">
      <div className="flex  gap-4">
        <div className="sm:w-16 w-12 flex justify-center items-center h-2 sm:h-8">
          <img src="/dbitlogo.png" alt="" />
        </div>
        <div className="text-2xl ml-2  font-bold text-gray-200">Eventify</div>
      </div>
      <nav className="gap-3 flex  items-center">
    
            <Link href="/signin" className="hover:underline text-gray-200">
              Login
            </Link>
            <Link href="/signup" className="hover:underline text-gray-200">
              SignUp
            </Link>
        
            {/* <Link href="/" className="hover:underline text-gray-200">
              Events
            </Link> 
            <Link href="/admin" className="hover:underline text-gray-200">
              Admin
            </Link> 

             <Link
              href="/user/history"
              className="hover:underline text-gray-200"
            >
              History
            </Link> */}
          
             <button className="hover:underline text-gray-200">Logout</button>
          
  
      </nav>
    </header>
  );
};

export default Header;
