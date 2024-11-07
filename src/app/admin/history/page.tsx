// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { getEvents } from "@/actions/data";

// // interface Event {
// //   id: string;
// //   title: string;
// //   startDate: string;
// //   endDate: string;
// //   description: string;
// //   image: string;
// //   organiser: string;
// //   location: string;
// // }
// // const EventHistory = () => {
// //   const [events, setEvents] = useState<Event[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [showMore, setShowMore] = useState<Record<string, boolean>>({}); 
// //   const fetchEvents = async () => {
// //     try {
// //       const eventData = await getEvents();
// //       const currentDate = new Date();

// //       const formattedEvents: Event[] = eventData
// //         .map((eventData: any) => ({
// //           id: eventData.id as string,
// //           title: eventData.title,
// //           startDate: eventData.startDate.toString(),
// //           endDate: eventData.endDate?.toString() || "",
// //           image: eventData.image || "",
// //           organiser: eventData.organiser,
// //           description: eventData.description,
// //           location: eventData.location,
// //         }))
// //         .filter((event) => new Date(event.endDate) < currentDate); 
// //       setEvents(formattedEvents);
// //     } catch (err) {
// //       console.error("Error fetching events:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);
// //   const toggleShowMore = (id: string) => {
// //     setShowMore((prev) => ({
// //       ...prev,
// //       [id]: !prev[id],
// //     }));
// //   };
// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-4 lg:p-8">
// //       <h1 className="text-4xl font-bold text-[#e04368] mb-8 text-center">
// //         Event History
// //       </h1>
// //       {loading ? (
// //         <div className="flex justify-center items-center min-h-[300px]">
// //           <div className="w-16 h-16 border-4 border-t-4 border-[#cc2b50] border-solid rounded-full animate-spin"></div>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {events.length > 0 ? (
// //             events.map((event) => (
// //               <div
// //                 key={event.id}
// //                 className="bg-gray-900/90  shadow-md p-6 transition-transform transform hover:bg-slate-900 rounded-xl hover:scale-105 duration-700"
// //               >
// //                 <h2 className="text-2xl font-semibold text-[#cc2b50] mb-2">
// //                   {event.title}
// //                 </h2>
// //                 <p className="text-gray-200">Start Date</p>
// //                 <p className="text-sm text-gray-300 mb-4">
// //                   {new Date(event.startDate).toDateString()}
// //                 </p>
// //                 <p className="text-gray-200">End Date</p>
// //                 <p className="text-sm text-gray-300 mb-4">
// //                   {new Date(event.endDate).toDateString()}
// //                 </p>
// //                 {showMore[event.id] && (
// //                   <>
// //                     <p className="text-gray-200">Description</p>
// //                     <p className="text-gray-300 mb-4">{event.description}</p>
// //                     <p className="text-gray-200">Location</p>
// //                     <p className="text-gray-300 mb-4">{event.location}</p>
// //                     <p className="text-gray-200">Organiser</p>
// //                     <p className="text-gray-300 mb-4">{event.organiser}</p>
// //                   </>
// //                 )}
// //                 <button
// //                   onClick={() => toggleShowMore(event.id)}
// //                   className="mt-4 px-4 py-2 bg-[#cc2b50] text-white rounded-xl hover:[#cc2b50] transition duration-200"
// //                 >
// //                   {showMore[event.id] ? "Show Less" : "Show More"}
// //                 </button>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-200 text-center">No past events found.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventHistory;


// "use client";
// import React, { useState, useEffect } from "react";
// import { getEvents } from "@/actions/data";
// interface Event {
//   id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   image: string;
//   organiser: string;
//   location: string;
// }
// const EventHistory = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [showMore, setShowMore] = useState<Record<string, boolean>>({});
//   const fetchEvents = async () => {
//     try {
//       const eventData = await getEvents();
//       const currentDate = new Date();
//       const formattedEvents: Event[] = eventData
//         .map((eventData: any) => ({
//           id: eventData.id as string,
//           title: eventData.title,
//           startDate: eventData.startDate.toString(),
//           endDate: eventData.endDate?.toString() || "",
//           image: eventData.image || "",
//           organiser: eventData.organiser,
//           description: eventData.description,
//           location: eventData.location,
//         }))
//         .filter((event) => new Date(event.endDate) < currentDate); 
//       setEvents(formattedEvents);
//     } catch (err) {
//       console.error("Error fetching events:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchEvents();
//   }, []);
//   const toggleShowMore = (id: string) => {
//     setShowMore((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-4 lg:p-8">
//       <h1 className="text-4xl font-extrabold text-[#e04368] mb-8 text-center">
//         Event History
//       </h1>
//       {loading ? (
//         <div className="flex justify-center items-center min-h-[300px]">
//           <div className="w-16 h-16 border-4 border-t-4 border-[#cc2b50] border-solid rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.length > 0 ? (
//             events.map((event) => (
//               <div
//                 key={event.id}
//                 className="bg-gray-900/80 shadow-lg p-6 rounded-xl transition-transform transform hover:bg-gray-800 hover:scale-105 duration-500"
//               >
//                 <h2 className="text-2xl font-semibold text-[#cc2b50] mb-2">
//                   {event.title}
//                 </h2>
//                 <p className="text-gray-200 text-sm">Start Date</p>
//                 <p className="text-sm text-gray-300 mb-4">
//                   {new Date(event.startDate).toDateString()}
//                 </p>
//                 <p className="text-gray-200 text-sm">End Date</p>
//                 <p className="text-sm text-gray-300 mb-4">
//                   {new Date(event.endDate).toDateString()}
//                 </p>
//                 {showMore[event.id] && (
//                   <>
//                     <p className="text-gray-200 text-sm">Description</p>
//                     <p className="text-gray-300 mb-4">{event.description}</p>
//                     <p className="text-gray-200 text-sm">Location</p>
//                     <p className="text-gray-300 mb-4">{event.location}</p>
//                     <p className="text-gray-200 text-sm">Organiser</p>
//                     <p className="text-gray-300 mb-4">{event.organiser}</p>
//                   </>
//                 )}
//                 <button
//                   onClick={() => toggleShowMore(event.id)}
//                   className="mt-4 px-6 py-2 bg-[#cc2b50] text-white rounded-xl hover:bg-[#a02b48] transition duration-300"
//                 >
//                   {showMore[event.id] ? "Show Less" : "Show More"}
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-200 text-center">No past events found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventHistory;
"use client";
import React, { useState, useEffect } from "react";
import { getEvents } from "@/actions/data";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  organiser: string;
  location: string;
}

const EventHistory = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<Record<string, boolean>>({});

  const fetchEvents = async () => {
    try {
      const eventData = await getEvents();
      const currentDate = new Date();

      const formattedEvents: Event[] = eventData
        .map((eventData: any) => ({
          id: eventData.id as string,
          title: eventData.title,
          startDate: eventData.startDate.toString(),
          endDate: eventData.endDate?.toString() || "",
          image: eventData.image || "",
          organiser: eventData.organiser,
          description: eventData.description,
          location: eventData.location,
        }))
        .filter((event) => new Date(event.endDate) < currentDate); 
      setEvents(formattedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleShowMore = (id: string) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen dark:bg-gradient-to-r from-gray-900 to-gray-800 bg-gray-200 p-4">
      {/* Header Section */}
      <div className="mb-4 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-semibold  text-center">
        Event History
      </h1>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-16 h-16 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event Cards */}
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="dark:bg-gradient-to-r from-gray-700 to-gray-600 bg-white shadow-md p-6 rounded-lg transition-transform transform hover:bg-gray-50 hover:scale-[1.02] duration-500"
              >
                {/* Event Title and Date */}
                <h2 className="text-xl font-semibold dark:text-gray-300 text-gray-800 mb-2">
                  {event.title}
                </h2>
                <p className="dark:text-gray-200 text-gray-500 text-sm">Start Date</p>
                <p className="text-sm dark:text-gray-300 text-gray-600 mb-4">
                  {new Date(event.startDate).toDateString()}
                </p>
                <p className="dark:text-gray-200 text-gray-500 text-sm">End Date</p>
                <p className="text-sm dark:text-gray-300 text-gray-600 mb-4">
                  {new Date(event.endDate).toDateString()}
                </p>

                {/* Show More Details */}
                {showMore[event.id] && (
                  <>
                    <p className="dark:text-gray-200 text-gray-500 text-sm">Description</p>
                    <p className="dark:text-gray-200 text-gray-600 mb-4">{event.description}</p>
                    <p className="dark:text-gray-200 text-gray-500 text-sm">Location</p>
                    <p className="dark:text-gray-200 text-gray-600 mb-4">{event.location}</p>
                    <p className="dark:text-gray-200 text-gray-500 text-sm">Organiser</p>
                    <p className="dark:text-gray-200 text-gray-600 mb-4">{event.organiser}</p>
                  </>
                )}

                {/* Show More / Less Button */}
                <button
                  onClick={() => toggleShowMore(event.id)}
                  className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400 transition duration-300"
                >
                  {showMore[event.id] ? "Show Less" : "Show More"}
                </button>
              </div>
            ))
          ) : (
            <p className="dark:text-gray-200 text-gray-600 text-center">No past events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventHistory;
