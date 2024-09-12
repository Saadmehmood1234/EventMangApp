import { IoIosDocument } from "react-icons/io";
import { FaCircleArrowRight } from "react-icons/fa6";
import { CgDatabase } from "react-icons/cg";
import { IoCalendar } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { BiSolidBook } from "react-icons/bi";

import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-between pt-6 py-4 lg:px-8 px-3 bg-slate-50">
        <h1 className="text-3xl font-bold text-purple-600 lg:ml-0 max-sm:ml-8 sm:ml-8">
          Dashboard
        </h1>
        <Link href={"admin/createEvents"}>
          <button className="bg-purple-300 hover:bg-purple-400 rounded-full px-4 py-2">
            <span className="block lg:hidden text-xl font-bold">+</span>
            <span className="hidden lg:block font-semibold">+ Add Event</span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <IoIosDocument className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">3</h2>
              <p>Categories</p>
            </div>
          </div>
          <div className="bg-white text-blue-500 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-blue-700" />
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <CgDatabase className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">1</h2>
              <p>Sponsors</p>
            </div>
          </div>
          <div className="bg-white text-green-500 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-green-700" />
          </div>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <IoCalendar className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">2</h2>
              <p>Total Events</p>
            </div>
          </div>
          <div className="bg-white text-orange-500 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-orange-700" />
          </div>
        </div>
        <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <HiMiniUsers className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">2</h2>
              <p>Total Users</p>
            </div>
          </div>
          <div className="bg-white text-orange-400 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-orange-600" />
          </div>
        </div>
        {/* <div className="bg-blue-400 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <BiSolidBook className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">1</h2>
              <p>New Booking</p>
            </div>
          </div>
          <div className="bg-white text-blue-400 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-blue-600" />
          </div>
        </div>
        <div className="bg-green-400 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <BiSolidBook className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">1</h2>
              <p>Confirmed Booking</p>
            </div>
          </div>
          <div className="bg-white text-green-400 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-green-600" />
          </div>
        </div>
        <div className="bg-red-400 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <BiSolidBook className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">0</h2>
              <p>Total Reg. Users</p>
            </div>
          </div>
          <div className="bg-white text-red-400 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-red-600" />
          </div>
        </div> */}
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <BiSolidBook className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">2</h2>
              {/* <p>Cancelled Bookings</p> */}
              <p>Total Reg. Users</p>
            </div>
          </div>
          <div className="bg-white text-red-500 p-2 mt-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-red-700" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
