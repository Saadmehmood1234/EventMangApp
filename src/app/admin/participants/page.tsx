// // // "use client";
// // // import Link from "next/link";
// // // import { useEffect, useState } from "react";
// // // import { BiSolidUserDetail } from "react-icons/bi";
// // // import { getParticipants, getEvents } from "@/actions/data";

// // // interface Event {
// // //   id: string;
// // //   title: string;
// // //   startDate: string;
// // //   endDate: string;
// // //   image: string;
// // //   organiser: string;
// // // }

// // // interface Participant {
// // //   id: string;
// // //   fullname: string;
// // //   enrollment: string;
// // //   semester: string;
// // //   course: string;
// // //   eventId: string;
// // //   phone: string;
// // //   email: string;
// // //   event: string;
// // // }

// // // const ParticipantPage = () => {
// // //   const [events, setEvents] = useState<Event[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [participants, setParticipants] = useState<Participant[]>([]);
// // //   const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

// // //   const fetchEvents = async () => {
// // //     try {
// // //       const fetchedEvents = await getEvents();
// // //       const currentDate = new Date(); // Get the current date
  
// // //       const formattedEvents: Event[] = fetchedEvents
// // //         .map((eventData: any) => ({
// // //           id: eventData.id as string,
// // //           title: eventData.title,
// // //           startDate: eventData.startDate.toString(),
// // //           endDate: eventData.endDate?.toString() || "",
// // //           image: eventData.image || "",
// // //           organiser: eventData.organiser,
// // //         }))
// // //         .filter((event) => {
// // //           const eventEndDate = new Date(event.endDate);
// // //           // Include events with an end date >= current date
// // //           return eventEndDate >= currentDate;
// // //         });
  
// // //       setEvents(formattedEvents);
// // //     } catch (error) {
// // //       console.error("Error fetching events:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
  

// // //   useEffect(() => {
// // //     fetchEvents();
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchParticipant = async () => {
// // //       try {
// // //         const participantsData = await getParticipants();
// // //         const formattedParticipants: Participant[] = participantsData.map(
// // //           (participant: any) => ({
// // //             id: participant.id as string, // Ensure id is treated as a string
// // //             fullname: participant.fullname,
// // //             enrollment: participant.enrollment,
// // //             semester: participant.semester,
// // //             course: participant.course,
// // //             eventId: participant.eventId,
// // //             phone: participant.phone,
// // //             email: participant.email,
// // //             event: participant.event,
// // //           })
// // //         );

// // //         setParticipants(formattedParticipants);
// // //       } catch (err) {
// // //         console.error("Error fetching participants:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchParticipant();
// // //   }, []);

// // //   // Toggle the expanded state of an event
// // //   const toggleExpand = (eventId: string) => {
// // //     setExpandedEvents((prev) => {
// // //       const newSet = new Set(prev);
// // //       if (newSet.has(eventId)) {
// // //         newSet.delete(eventId);
// // //       } else {
// // //         newSet.add(eventId);
// // //       }
// // //       return newSet;
// // //     });
// // //   };

// // //   return (
// // //     <>
// // //       <div className="flex justify-between items-center pt-6 py-4 lg:px-8 px-3 bg-indigo-400">
// // //         <div className="flex w-full gap-4 items-center max-md:flex-col max-md:justify-center max-md:items-center">
// // //           <h1 className="text-3xl font-bold text-gray-200">Participants</h1>
// // //           <div className="text-xl font-semibold text-gray-200">
// // //             Total Participants:{" "}
// // //             <span className="text-white">
// // //               {
// // //                 participants.filter((participant) =>
// // //                   events.some((event) => event.id === participant.eventId)
// // //                 ).length
// // //               }
// // //             </span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="p-8 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen">
// // //         {events.map((event, index) => {
// // //           // Filter participants for the current event
// // //           const eventParticipants = participants.filter(
// // //             (participant) => participant.eventId === event.id
// // //           );

// // //           const shouldShowButton = eventParticipants.length > 5;
// // //           const displayedParticipants = expandedEvents.has(event.id)
// // //             ? eventParticipants
// // //             : eventParticipants.slice(0, 5);

// // //           return (
// // //             <div
// // //               key={index}
// // //               className="mb-8 p-6 bg-gray-950/90 rounded-xl hover:bg-slate-900 hover:scale-[1.03] transition-all duration-500  shadow-lg"
// // //             >
// // //               <div className="flex max-md:flex-col justify-between">
// // //                 <div className="flex items-center mb-4">
// // //                   <h2 className="text-3xl max-lg:text-2xl font-semibold text-[#cc2b50]">
// // //                     {event.title}
// // //                   </h2>
// // //                 </div>
// // //                 <div className="font-semibold text-gray-200 max-md:mb-4">
// // //                   Participants:{" "}
// // //                   <span className="text-[#cc2b50]">
// // //                     {eventParticipants.length}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               {/* List of participants */}
// // //               <ul className="list-disc ml-6 mt-4">
// // //                 {displayedParticipants.length > 0 ? (
// // //                   displayedParticipants.map((participant, index) => (
// // //                     <div key={participant.id} className="flex justify-between">
// // //                       <Link href={`/admin/participants/${participant.id}`}>
// // //                         <li className="text-gray-200 hover:text-[#cc4564]">
// // //                           {participant.fullname}
// // //                         </li>
// // //                       </Link>
// // //                       <Link href={`/admin/participants/${participant.id}`}>
// // //                         <BiSolidUserDetail className="text-gray-400 hover:text-[#cc2b50]" />
// // //                       </Link>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <li className="text-gray-500">
// // //                     No participants for this event
// // //                   </li>
// // //                 )}
// // //               </ul>

// // //               {/* Show "View All" button if needed */}
// // //               {shouldShowButton && (
// // //                 <div className="flex justify-start items-center">
// // //                   <button
// // //                     onClick={() => toggleExpand(event.id)}
// // //                     className="mt-4 bg-[#db3d62] text-white px-4 py-2 rounded-lg hover:bg-[#cc2b50] transition duration-150"
// // //                   >
// // //                     {expandedEvents.has(event.id) ? "Show Less" : "View All"}
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default ParticipantPage;


// // "use client";
// // import Link from "next/link";
// // import { useEffect, useState } from "react";
// // import { BiSolidUserDetail } from "react-icons/bi";
// // import { getParticipants, getEvents } from "@/actions/data";

// // interface Event {
// //   id: string;
// //   title: string;
// //   startDate: string;
// //   endDate: string;
// //   image: string;
// //   organiser: string;
// // }
// // interface Participant {
// //   id: string;
// //   fullname: string;
// //   enrollment: string;
// //   semester: string;
// //   course: string;
// //   eventId: string;
// //   phone: string;
// //   email: string;
// //   event: string;
// // }
// // const ParticipantPage = () => {
// //   const [events, setEvents] = useState<Event[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [participants, setParticipants] = useState<Participant[]>([]);
// //   const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
// //   const fetchEvents = async () => {
// //     try {
// //       const fetchedEvents = await getEvents();
// //       const currentDate = new Date(); 
// //       const formattedEvents: Event[] = fetchedEvents
// //         .map((eventData: any) => ({
// //           id: eventData.id as string,
// //           title: eventData.title,
// //           startDate: eventData.startDate.toString(),
// //           endDate: eventData.endDate?.toString() || "",
// //           image: eventData.image || "",
// //           organiser: eventData.organiser,
// //         }))
// //         .filter((event) => {
// //           const eventEndDate = new Date(event.endDate);
// //           // Include events with an end date >= current date
// //           return eventEndDate >= currentDate;
// //         });

// //       setEvents(formattedEvents);
// //     } catch (error) {
// //       console.error("Error fetching events:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   useEffect(() => {
// //     const fetchParticipant = async () => {
// //       try {
// //         const participantsData = await getParticipants();
// //         const formattedParticipants: Participant[] = participantsData.map(
// //           (participant: any) => ({
// //             id: participant.id as string, 
// //             fullname: participant.fullname,
// //             enrollment: participant.enrollment,
// //             semester: participant.semester,
// //             course: participant.course,
// //             eventId: participant.eventId,
// //             phone: participant.phone,
// //             email: participant.email,
// //             event: participant.event,
// //           })
// //         );

// //         setParticipants(formattedParticipants);
// //       } catch (err) {
// //         console.error("Error fetching participants:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchParticipant();
// //   }, []);
// //   const toggleExpand = (eventId: string) => {
// //     setExpandedEvents((prev) => {
// //       const newSet = new Set(prev);
// //       if (newSet.has(eventId)) {
// //         newSet.delete(eventId);
// //       } else {
// //         newSet.add(eventId);
// //       }
// //       return newSet;
// //     });
// //   };
// //   return (
// //     <>
// //       <div className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-indigo-400 to-indigo-500 text-gray-100 shadow-md rounded-lg">
// //         <div className="flex w-full gap-4 items-center justify-between md:flex-col md:items-center">
// //           <h1 className="text-4xl font-extrabold">Event Participants</h1>
// //           <div className="text-lg font-medium">
// //             Total Participants:{" "}
// //             <span className="text-white">
// //               {participants.filter((participant) =>
// //                 events.some((event) => event.id === participant.eventId)
// //               ).length}
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="p-8 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen">
// //         {events.map((event) => {
// //           const eventParticipants = participants.filter(
// //             (participant) => participant.eventId === event.id
// //           );
// //           const shouldShowButton = eventParticipants.length > 5;
// //           const displayedParticipants = expandedEvents.has(event.id)
// //             ? eventParticipants
// //             : eventParticipants.slice(0, 5);
// //           return (
// //             <div
// //               key={event.id}
// //               className="mb-8 p-6 bg-indigo-400 rounded-xl shadow-lg hover:bg-indigo-500 transition-transform duration-300 transform hover:scale-[1.01]"
// //             >
// //               <div className="flex justify-between items-center mb-4">
// //                 <div>
// //                   <h2 className="text-2xl font-semibold text-indigo-600">{event.title}</h2>
// //                   <p className="text-gray-100">{event.organiser}</p>
// //                 </div>
// //                 <div className="text-lg text-gray-200">
// //                   Participants:{" "}
// //                   <span className="font-semibold text-indigo-500">
// //                     {eventParticipants.length}
// //                   </span>
// //                 </div>
// //               </div>
// //               <ul className="list-disc ml-6 mt-4 space-y-2">
// //                 {displayedParticipants.length > 0 ? (
// //                   displayedParticipants.map((participant) => (
// //                     <div key={participant.id} className="flex justify-between items-center">
// //                       <Link href={`/admin/participants/${participant.id}`}>
// //                         <li className="text-gray-200 hover:text-indigo-500">{participant.fullname}</li>
// //                       </Link>
// //                       <Link href={`/admin/participants/${participant.id}`}>
// //                         <BiSolidUserDetail className="text-gray-100 hover:text-indigo-600 transition duration-300" />
// //                       </Link>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <li className="text-gray-500">No participants for this event</li>
// //                 )}
// //               </ul>
// //               {shouldShowButton && (
// //                 <div className="flex justify-start mt-4">
// //                   <button
// //                     onClick={() => toggleExpand(event.id)}
// //                     className="bg-[#db3d62] text-white px-5 py-2 rounded-lg hover:bg-[#cc2b50] transition duration-300"
// //                   >
// //                     {expandedEvents.has(event.id) ? "Show Less" : "View All"}
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </>
// //   );
// // };

// // export default ParticipantPage;



// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { BiSolidUserDetail } from "react-icons/bi";
// import { getParticipants, getEvents } from "@/actions/data";

// interface Event {
//   id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   image: string;
//   organiser: string;
// }

// interface Participant {
//   id: string;
//   fullname: string;
//   enrollment: string;
//   semester: string;
//   course: string;
//   eventId: string;
//   phone: string;
//   email: string;
//   event: string;
// }

// const ParticipantPage = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [participants, setParticipants] = useState<Participant[]>([]);
//   const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

//   const fetchEvents = async () => {
//     try {
//       const fetchedEvents = await getEvents();
//       const currentDate = new Date(); // Get the current date
//       const formattedEvents: Event[] = fetchedEvents
//         .map((eventData: any) => ({
//           id: eventData.id as string,
//           title: eventData.title,
//           startDate: eventData.startDate.toString(),
//           endDate: eventData.endDate?.toString() || "",
//           image: eventData.image || "",
//           organiser: eventData.organiser,
//         }))
//         .filter((event) => {
//           const eventEndDate = new Date(event.endDate);
//           return eventEndDate >= currentDate;
//         });

//       setEvents(formattedEvents);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     const fetchParticipants = async () => {
//       try {
//         const participantsData = await getParticipants();
//         const formattedParticipants: Participant[] = participantsData.map(
//           (participant: any) => ({
//             id: participant.id as string,
//             fullname: participant.fullname,
//             enrollment: participant.enrollment,
//             semester: participant.semester,
//             course: participant.course,
//             eventId: participant.eventId,
//             phone: participant.phone,
//             email: participant.email,
//             event: participant.event,
//           })
//         );

//         setParticipants(formattedParticipants);
//       } catch (err) {
//         console.error("Error fetching participants:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchParticipants();
//   }, []);

//   const toggleExpand = (eventId: string) => {
//     setExpandedEvents((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(eventId)) {
//         newSet.delete(eventId);
//       } else {
//         newSet.add(eventId);
//       }
//       return newSet;
//     });
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-indigo-400 to-indigo-500 text-gray-100 shadow-md rounded-lg">
//         <div className="flex w-full gap-4 items-center justify-between md:flex-col md:items-center">
//           <h1 className="text-4xl font-extrabold">Event Participants</h1>
//           <div className="text-lg font-medium">
//             Total Participants:{" "}
//             <span className="text-white">
//               {participants.filter((participant) =>
//                 events.some((event) => event.id === participant.eventId)
//               ).length}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="p-8 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen">
//         {events.map((event) => {
//           const eventParticipants = participants.filter(
//             (participant) => participant.eventId === event.id
//           );
//           const shouldShowButton = eventParticipants.length > 5;
//           const displayedParticipants = expandedEvents.has(event.id)
//             ? eventParticipants
//             : eventParticipants.slice(0, 5);

//           return (
//             <div
//               key={event.id}
//               className="mb-8 p-6 bg-indigo-400 rounded-xl shadow-lg hover:bg-indigo-500 transition-transform duration-300 transform hover:scale-[1.01]"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h2 className="text-2xl font-semibold text-indigo-600">{event.title}</h2>
//                   <p className="text-gray-100">{event.organiser}</p>
//                 </div>
//                 <div className="text-lg text-gray-200">
//                   Participants:{" "}
//                   <span className="font-semibold text-indigo-500">
//                     {eventParticipants.length}
//                   </span>
//                 </div>
//               </div>

//               {/* Participants List */}
//               <ul className="list-disc ml-6 mt-4 space-y-2">
//                 {displayedParticipants.length > 0 ? (
//                   displayedParticipants.map((participant) => (
//                     <div key={participant.id} className="flex justify-between items-center">
//                       <Link href={`/admin/participants/${participant.id}`}>
//                         <li className="text-gray-200 hover:text-indigo-500 transition duration-300">{participant.fullname}</li>
//                       </Link>
//                       <Link href={`/admin/participants/${participant.id}`}>
//                         <BiSolidUserDetail className="text-gray-100 hover:text-indigo-600 transition duration-300" />
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <li className="text-gray-500">No participants for this event</li>
//                 )}
//               </ul>

//               {/* Show View All Button if needed */}
//               {shouldShowButton && (
//                 <div className="flex justify-start mt-4">
//                   <button
//                     onClick={() => toggleExpand(event.id)}
//                     className="bg-[#db3d62] text-white px-5 py-2 rounded-lg hover:bg-[#cc2b50] transition duration-300"
//                   >
//                     {expandedEvents.has(event.id) ? "Show Less" : "View All"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default ParticipantPage;
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { getParticipants, getEvents } from "@/actions/data";
import { Event } from "@/lib/types";
interface Participant {
  id: string;
  fullname: string;
  enrollment: string;
  semester: string;
  course: string;
  eventId: string;
  phone: string;
  email: string;
  event: string;
}
const ParticipantPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      const currentDate = new Date();
      const formattedEvents: Event[] = fetchedEvents
        .map((eventData: any) => ({
          id: eventData.id as string,
          title: eventData.title,
          startDate: eventData.startDate.toString(),
          endDate: eventData.endDate?.toString() || "",
          image: eventData.image || "",
          organiser: eventData.organiser,
          location:eventData.location,
          description:eventData. description,
        }))
        .filter((event) => {
          const eventEndDate = new Date(event.endDate);
          return eventEndDate >= currentDate;
        });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantsData = await getParticipants();
        const formattedParticipants: Participant[] = participantsData.map(
          (participant: any) => ({
            id: participant.id as string,
            fullname: participant.fullname,
            enrollment: participant.enrollment,
            semester: participant.semester,
            course: participant.course,
            eventId: participant.eventId,
            phone: participant.phone,
            email: participant.email,
            event: participant.event,
          })
        );

        setParticipants(formattedParticipants);
      } catch (err) {
        console.error("Error fetching participants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const toggleExpand = (eventId: string) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen dark:bg-gradient-to-r from-gray-900 to-gray-800 bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-500 text-white shadow-md p-6 rounded-b-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-bold">Event Participants</h1>
          <div className="mt-2 md:mt-0 text-lg">
            <span className="font-medium">Total Participants: </span>
            <span>
              {participants.filter((participant) =>
                events.some((event) => event.id === participant.eventId)
              ).length}
            </span>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const eventParticipants = participants.filter(
            (participant) => participant.eventId === event.id
          );
          const shouldShowButton = eventParticipants.length > 5;
          const displayedParticipants = expandedEvents.has(event.id)
            ? eventParticipants
            : eventParticipants.slice(0, 5);

          return (
            <div
              key={event.id}
              className="dark:bg-gradient-to-r from-gray-700 to-gray-600 bg-white p-6 rounded-lg shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-500">{event.title}</h2>
                  <p className="dark:text-gray-200 text-gray-600">{event.organiser}</p>
                </div>
                <div className="text-lg dark:text-gray-100 text-gray-500">
                  Participants:{" "}
                  <span className="font-semibold text-indigo-500">
                    {eventParticipants.length}
                  </span>
                </div>
              </div>

              {/* Participants List */}
              <ul className="space-y-3">
                {displayedParticipants.length > 0 ? (
                  displayedParticipants.map((participant) => (
                    <li key={participant.id} className="flex justify-between items-center">
                      <Link href={`/admin/participants/${participant.id}`}>
                        <span className="dark:text-gray-300 text-gray-700 hover:text-indigo-600 transition-all duration-300">
                          {participant.fullname}
                        </span>
                      </Link>
                      <Link href={`/admin/participants/${participant.id}`}>
                        <BiSolidUserDetail className="dark:text-white text-gray-500 hover:text-indigo-600 transition-all duration-300" />
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No participants for this event</li>
                )}
              </ul>
              {shouldShowButton && (
                <div className="flex justify-start mt-4">
                  <button
                    onClick={() => toggleExpand(event.id)}
                    className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
                  >
                    {expandedEvents.has(event.id) ? "Show Less" : "View All"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantPage;

