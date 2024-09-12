// "use client"
// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";
// import Event from '../../../models/Event';
// interface Event {
//    id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   description:string;
//   image: string;
// }
// const EventHistory = () => {

//   const [events, setEvents] = useState<Event[]>([]);
// events.map((event)=>console.log(event))
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("/api/getevent");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setEvents(data.event);
//         console.log(events)

//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);
//   return (
//     <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
//       <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
//         Event History
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {events.map((event, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
//           >
//             <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//               {event.title}
//             </h2>
//             <p>Start date</p>
//             <p className="text-sm text-gray-500 mb-4">
//               {new Date(event.startDate).toDateString()}
//             </p>
//             <p>{event.id}</p>
//             <p>End date</p>
//             <p className="text-sm text-gray-500 mb-4">
//               {new Date(event.endDate).toDateString()}
//             </p>
//             <p className="text-gray-600 mb-4">{event.description}</p>
//             <div className="text-gray-600">
//               {/* <p className="font-semibold">
//                 Participants:{" "}
//                 <span className="text-purple-600">{event.participants}</span>
//               </p> */}
//               <p className="font-semibold">
//                 {/* Winner: <span className="text-purple-600">{event.winner}</span> */}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventHistory;

"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  imageUrl: string;
}

const EventHistory = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch("/api/getevent");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedEvents = data.event.map((event: any) => ({
          id: event._id,
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          description: event.description,
          imageUrl: event.imageUrl,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
        Event History
      </h1>

      {loading ? ( // Conditionally render loading indicator
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                {event.title}
              </h2>
              <p>Start date</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(event.startDate).toDateString()}
              </p>
              <p>End date</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(event.endDate).toDateString()}
              </p>
              <p className="text-gray-600 mb-4">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventHistory;
