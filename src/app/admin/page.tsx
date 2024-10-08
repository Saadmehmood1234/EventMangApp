// "use client"
// import { IoIosDocument } from "react-icons/io";
// import { FaCircleArrowRight } from "react-icons/fa6";
// import { CgDatabase } from "react-icons/cg";
// import { IoCalendar } from "react-icons/io5";
// import { HiMiniUsers } from "react-icons/hi2";
// import { BiSolidBook } from "react-icons/bi";
// import { getEvents } from "@/actions/data";
// import Link from "next/link";
// import { useState,useEffect } from "react";

// interface Event {
//   id: string;
//   title: string;
//   members: number;
//   description: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   organiser: string;
//   sponsers: string;
//   category: string;
// }
// const Dashboard = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<boolean>(false);
//   const fetchEvents = async () => {
//     try {
//       const fetchedEvents = await getEvents();
//       const formattedEvents: Event[] = fetchedEvents.map((eventData: any) => ({
//         id: eventData.id as string,
//         title: eventData.title,
//         startDate: eventData.startDate.toString(),
//         endDate: eventData.endDate?.toString() || "",
//         organiser: eventData.organiser,
//         description: eventData.description,
//         location: eventData.location,
//         members:eventData.members,
//         sponsers:eventData.sponsers,
//         category:eventData.category

//       }));
//       setEvents(formattedEvents);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div className="flex justify-between pt-6 py-4 lg:px-8 px-3 bg-slate-50">
//         <h1 className="text-3xl font-bold text-purple-600 lg:ml-0 max-sm:ml-8 sm:ml-8">
//           Dashboard
//         </h1>
//         <Link href={"admin/createEvents"}>
//           <button className="bg-purple-300 hover:bg-purple-400 rounded-full px-4 py-2">
//             <span className="block lg:hidden text-xl font-bold">+</span>
//             <span className="hidden lg:block font-semibold">+ Add Event</span>
//           </button>
//         </Link>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
//         <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
//           <div className="flex justify-between items-center">
//             <IoIosDocument className="h-16 w-16" />
//             <div>
//               <h2 className="text-2xl mb-2 flex justify-end">3</h2>
//               <p>Categories</p>
//             </div>
//           </div>
//           <div className="bg-white text-blue-500 p-2 mt-4 rounded-lg flex justify-between items-center">
//             <p className="text-sm">View Details</p>
//             <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-blue-700" />
//           </div>
//         </div>
//         <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
//           <div className="flex justify-between items-center">
//             <CgDatabase className="h-16 w-16" />
//             <div>
//               <h2 className="text-2xl mb-2 flex justify-end">1</h2>
//               <p>Sponsors</p>
//             </div>
//           </div>
//           <div className="bg-white text-green-500 p-2 mt-4 rounded-lg flex justify-between items-center">
//             <p className="text-sm">View Details</p>
//             <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-green-700" />
//           </div>
//         </div>
//         <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
//           <div className="flex justify-between items-center">
//             <IoCalendar className="h-16 w-16" />
//             <div>
//               <h2 className="text-2xl mb-2 flex justify-end">2</h2>
//               <p>Total Events</p>
//             </div>
//           </div>
//           <div className="bg-white text-orange-500 p-2 mt-4 rounded-lg flex justify-between items-center">
//             <p className="text-sm">View Details</p>
//             <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-orange-700" />
//           </div>
//         </div>
//         <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
//           <div className="flex justify-between items-center">
//             <HiMiniUsers className="h-16 w-16" />
//             <div>
//               <h2 className="text-2xl mb-2 flex justify-end">2</h2>
//               <p>Total Users</p>
//             </div>
//           </div>
//           <div className="bg-white text-orange-400 p-2 mt-4 rounded-lg flex justify-between items-center">
//             <p className="text-sm">View Details</p>
//             <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-orange-600" />
//           </div>
//         </div>
//         <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
//           <div className="flex justify-between items-center">
//             <BiSolidBook className="h-16 w-16" />
//             <div>
//               <h2 className="text-2xl mb-2 flex justify-end">2</h2>
//               {/* <p>Cancelled Bookings</p> */}
//               <p>Total Reg. Users</p>
//             </div>
//           </div>
//           <div className="bg-white text-red-500 p-2 mt-4 rounded-lg flex justify-between items-center">
//             <p className="text-sm">View Details</p>
//             <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-red-700" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


"use client";
import { IoIosDocument } from "react-icons/io";
import { FaCircleArrowRight } from "react-icons/fa6";
import { CgDatabase } from "react-icons/cg";
import { IoCalendar } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { BiSolidBook } from "react-icons/bi";
import { getEvents } from "@/actions/data";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  members: number;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organiser: string;
  sponsers: string;
  category: string;
}

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      const formattedEvents: Event[] = fetchedEvents.map((eventData: any) => ({
        id: eventData.id as string,
        title: eventData.title,
        startDate: eventData.startDate.toString(),
        endDate: eventData.endDate?.toString() || "",
        organiser: eventData.organiser,
        description: eventData.description,
        location: eventData.location,
        members: eventData.members,
        sponsers: eventData.sponsers,
        category: eventData.category,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Count categories and sponsors
  const uniqueCategories = new Set(events.map(event => event.category));
  const uniqueSponsors = new Set(events.map(event => event.sponsers));
  const totalMembers = events.reduce((acc, event) => acc + event.members, 0);
  const totalUsers = 2; // Replace with your logic for total users
  const totalRegisteredUsers = events.length; 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching events.</div>;
  }

  return (
    <div className="bg-slate-700 sm:h-[100vh]">
      <div className="flex justify-between pt-6 py-4 lg:px-8 px-3 bg-slate-900/80">
        <h1 className="text-3xl font-bold text-purple-600 lg:ml-0 max-sm:ml-8 sm:ml-8">
          Dashboard
        </h1>
        <Link href={"/admin/createEvents"}>
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
              <h2 className="text-2xl mb-2 flex justify-end">{uniqueCategories.size}</h2>
              <p>Categories</p>
            </div>
          </div>

          <div className="bg-white text-blue-500 p-2 mt-4 rounded-lg flex justify-between items-center">
          <Link href={"/admin"}>
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-blue-700" />
            </Link>
          </div>
        </div>
       
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <CgDatabase className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">{uniqueSponsors.size}</h2>
              <p>Sponsors</p>
            </div>
          </div>
          <div className="bg-white text-green-500 p-2 mt-4 rounded-lg flex justify-between items-center">
          <Link href={"/admin"}>
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-green-700" />
            </Link>
          </div>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <IoCalendar className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">{events.length}</h2>
              <p>Total Events</p>
            </div>
          </div>
          <div className="bg-white text-orange-500 p-2 mt-4 rounded-lg flex justify-between items-center">
          <Link href={"/admin"}>
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-orange-700" />
            </Link>
          </div>
        </div>
        <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <HiMiniUsers className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">{totalUsers}</h2>
              <p>Total Users</p>
            </div>
          </div>
          <div className="bg-white text-orange-400 p-2 mt-4 rounded-lg flex justify-between items-center">
          <Link href={"/admin"}>
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-orange-600" />
            </Link>
          </div>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <BiSolidBook className="h-16 w-16" />
            <div>
              <h2 className="text-2xl mb-2 flex justify-end">{totalRegisteredUsers}</h2>
              <p>Total Reg. Users</p>
            </div>
          </div>
          <div className="bg-white text-red-500 p-2 mt-4 rounded-lg flex justify-between items-center">
          <Link href={"/admin"}>
            <p className="text-sm">View Details</p>
            <FaCircleArrowRight className="h-6 w-6 cursor-pointer hover:text-red-700" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
