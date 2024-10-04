

// "use client";
// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";

// interface Event {
//   id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   image: string;
// }

// interface EventsCardProps {
//   searchQuery: string;
// }

// const formatDate = (dateString: string) => {
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// const EventsCard: React.FC<EventsCardProps> = ({ searchQuery }) => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("/api/getevent");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const formattedEvents = data.event.map((event: any) => ({
//           id: event._id,
//           title: event.title,
//           startDate: event.startDate,
//           endDate: event.endDate,
//           description: event.description,
//           imageUrl: event.imageUrl,
//         }));

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const filteredEvents = events.filter((event) =>
//     event.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);

//   return (
//     <div className="p-6">
//       <div className="mb-8 text-3xl font-semibold text-orange-600">
//         <h1>Upcoming Events</h1>
//       </div>
//       {loading ? (
//         <div className="flex justify-center items-center min-h-[300px]">
//           <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
//         </div>
//       ) : filteredEvents.length > 0 ? (
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {visibleEvents.map((event) => (
//               <Link key={event.id} href={`/user/events/${event.id}`}>
//                 <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 cursor-pointer">
//                   <img
//                     className="w-full h-48 object-cover"
//                     src={event.image || "eventa1.jpg"}
//                     alt={event.title}
//                   />
//                   <div className="px-6 py-4">
//                     <div className="font-bold text-xl mb-2 text-gray-900">
//                       {event.title}
//                     </div>
//                     <p className="text-gray-700 text-base">
//                       <span className="font-semibold">Start Date:</span>{" "}
//                       {formatDate(event.startDate)}
//                     </p>
//                     <p className="text-gray-700 text-base">
//                       <span className="font-semibold">End Date:</span>{" "}
//                       {formatDate(event.endDate)}
//                     </p>
//                   </div>
//                   <div className="px-6 pb-4">
//                     <button className="bg-green-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out">
//                       Join Event
//                     </button>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//           {filteredEvents.length > 6 && (
//             <div className="mt-6 text-center">
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
//               >
//                 {showAll ? "Show Less" : "Show More"}
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="text-center text-gray-700 text-2xl">
//           No upcoming events
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventsCard;


"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
}

interface EventsCardProps {
  events: Event[];
  searchQuery: string;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  // Use a fixed locale (e.g., 'en-US' or 'en-GB') to ensure the same format
  return new Date(dateString).toLocaleDateString("en-US", options);
};


const EventsCard: React.FC<EventsCardProps> = ({ events, searchQuery }) => {
  const [showAll, setShowAll] = useState(false);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);

  return (
    <div className="p-6">
      <div className="mb-8 text-3xl font-semibold text-orange-600">
        <h1>Upcoming Events</h1>
      </div>
      {filteredEvents.length > 0 ? (
        <div>
          <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* <div className="flex justify-center items-center gap-10 flex-wrap max-w-6xl"> */}
            {visibleEvents.map((event) => (
              <Link key={event.id} href={`/user/events/${event.id}`}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 cursor-pointer">
                  <img
                    className="w-full h-48 object-cover"
                    src={event.image || "eventa1.jpg"}
                    alt={event.title}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-gray-900">
                      {event.title}
                    </div>
                    <p className="text-gray-700 text-base">
                      <span className="font-semibold">Start Date:</span>{" "}
                      {formatDate(event.startDate)}
                    </p>
                    <p className="text-gray-700 text-base">
                      <span className="font-semibold">End Date:</span>{" "}
                      {formatDate(event.endDate)}
                    </p>
                  </div>
                  <div className="px-6 pb-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out">
                      Join Event
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filteredEvents.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-700 text-2xl">
          No upcoming events
        </div>
      )}
    </div>
  );
};

export default EventsCard;
