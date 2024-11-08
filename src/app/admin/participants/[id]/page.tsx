
// // // // "use client";
// // // // import { useEffect, useState } from "react";
// // // // import { fetchParticipantsById } from "@/actions/data";
// // // // interface Participant {
// // // //   id: string;
// // // //   fullname: string;
// // // //   enrollment: string;
// // // //   semester: string;
// // // //   course: string;
// // // //   eventId: string;
// // // //   phone: string;
// // // //   email: string;
// // // //   event: string | { name: string }; 
// // // // }
// // // // interface EventDetailProps {
// // // //   params: {
// // // //     id: string;
// // // //   };
// // // // }
// // // // const ParticipantDetailPage: React.FC<EventDetailProps> = ({ params }) => {
// // // //   const [participant, setParticipant] = useState<Participant | null>(null);
// // // //   const [loading, setLoading] = useState<boolean>(true);
// // // //   const [error, setError] = useState<string | null>(null); 
// // // //   useEffect(() => {
// // // //     const fetchEvent = async () => {
// // // //       try {
// // // //         const participantData = await fetchParticipantsById(params.id);
// // // //         console.log("Fetched Participant Data:", participantData); 
// // // //         if (participantData) {
// // // //           const formattedParticipant: Participant = {
// // // //             id: participantData.id as string,
// // // //             fullname: participantData.fullname,
// // // //             enrollment: participantData.enrollment,
// // // //             semester: participantData.semester,
// // // //             course: participantData.course,
// // // //             eventId: participantData.eventId,
// // // //             phone: participantData.phone,
// // // //             email: participantData.email,
// // // //             event: participantData.event, 
// // // //           };
// // // //           setParticipant(formattedParticipant);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Error fetching event:", err);
// // // //         setError("Failed to fetch participant data.");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchEvent();
// // // //   }, [params.id]);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center min-h-screen bg-gray-900">
// // // //         <div className="w-16 h-16 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gray-200 text-red-500">
// // // //         {error}
// // // //       </div>
// // // //     );
// // // //   }
// // // //   if (!participant) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gray-200 text-red-500">
// // // //         No participant found
// // // //       </div>
// // // //     );
// // // //   }
// // // //   return (
// // // //     <div className="p-8 bg-white h-[100vh] flex items-center justify-center">
// // // //       <div className="w-full max-w-4xl bg-gray-950/90 rounded-xl shadow-lg overflow-hidden">
// // // //         <div className="p-6 border-b border-gray-200">
// // // //           <h1 className="text-4xl font-extrabold text-gray-300">
// // // //             {participant.fullname}
// // // //           </h1>
// // // //           {/* <p className="text-xl text-gray-600 mt-2">
// // // //             {typeof participant.event === "string"
// // // //               ? participant.event
// // // //               : participant.event.name}
// // // //           </p> */}
// // // //         </div>
// // // //         <div className="p-6 ">
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //             <div className="bg-gray-50 hover:scale-[1.05] transition-all duration-700 p-4 rounded-lg shadow-sm">
// // // //               <h2 className="text-lg font-semibold text-gray-700 mb-2">
// // // //                 Details
// // // //               </h2>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Enrollment:</strong> {participant.enrollment}
// // // //               </p>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Semester:</strong> {participant.semester}
// // // //               </p>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Course:</strong> {participant.course}
// // // //               </p>
// // // //             </div>
// // // //             <div className="bg-gray-50 hover:scale-[1.05] transition-all duration-700 p-4 rounded-lg shadow-sm">
// // // //               <h2 className="text-lg font-semibold text-gray-700 mb-2">
// // // //                 Contact Information
// // // //               </h2>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Phone:</strong> {participant.phone}
// // // //               </p>
// // // //               <p className="text-gray-600">
// // // //                 <strong>Email:</strong> {participant.email}
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ParticipantDetailPage;


// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import { fetchParticipantsById } from "@/actions/data";
// // // interface Participant {
// // //   id: string;
// // //   fullname: string;
// // //   enrollment: string;
// // //   semester: string;
// // //   course: string;
// // //   eventId: string;
// // //   phone: string;
// // //   email: string;
// // //   event: string | { name: string };
// // // }
// // // interface EventDetailProps {
// // //   params: {
// // //     id: string;
// // //   };
// // // }
// // // const ParticipantDetailPage: React.FC<EventDetailProps> = ({ params }) => {
// // //   const [participant, setParticipant] = useState<Participant | null>(null);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const fetchEvent = async () => {
// // //       try {
// // //         const participantData = await fetchParticipantsById(params.id);
// // //         console.log("Fetched Participant Data:", participantData);
// // //         if (participantData) {
// // //           const formattedParticipant: Participant = {
// // //             id: participantData.id as string,
// // //             fullname: participantData.fullname,
// // //             enrollment: participantData.enrollment,
// // //             semester: participantData.semester,
// // //             course: participantData.course,
// // //             eventId: participantData.eventId,
// // //             phone: participantData.phone,
// // //             email: participantData.email,
// // //             event: participantData.event,
// // //           };
// // //           setParticipant(formattedParticipant);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching participant:", err);
// // //         setError("Failed to fetch participant data.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchEvent();
// // //   }, [params.id]);

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
// // //         <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">
// // //         {error}
// // //       </div>
// // //     );
// // //   }

// // //   if (!participant) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">
// // //         No participant found
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
// // //       <div className="w-full max-w-4xl bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden">
// // //         <div className="p-6 border-b border-gray-200 bg-gray-900 rounded-t-xl">
// // //           <h1 className="text-4xl font-extrabold text-white">
// // //             {participant.fullname}
// // //           </h1>
// // //           {/* <p className="text-xl text-gray-400 mt-2">
// // //             {typeof participant.event === "string"
// // //               ? participant.event
// // //               : participant.event.name}
// // //           </p> */}
// // //         </div>
// // //         <div className="p-6 bg-gray-50 rounded-b-xl">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //             <div className="bg-white p-6 rounded-lg shadow-md hover:scale-[1.05] transition-all duration-500">
// // //               <h2 className="text-xl font-semibold text-gray-700 mb-4">
// // //                 Personal Information
// // //               </h2>
// // //               <p className="text-gray-600">
// // //                 <strong>Enrollment:</strong> {participant.enrollment}
// // //               </p>
// // //               <p className="text-gray-600">
// // //                 <strong>Semester:</strong> {participant.semester}
// // //               </p>
// // //               <p className="text-gray-600">
// // //                 <strong>Course:</strong> {participant.course}
// // //               </p>
// // //             </div>
// // //             <div className="bg-white p-6 rounded-lg shadow-md hover:scale-[1.05] transition-all duration-500">
// // //               <h2 className="text-xl font-semibold text-gray-700 mb-4">
// // //                 Contact Information
// // //               </h2>
// // //               <p className="text-gray-600">
// // //                 <strong>Phone:</strong> {participant.phone}
// // //               </p>
// // //               <p className="text-gray-600">
// // //                 <strong>Email:</strong> {participant.email}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ParticipantDetailPage;


// "use client";
// import { useEffect, useState } from "react";
// import { fetchParticipantsById } from "@/actions/data";
// interface Participant {
//   id: string;
//   fullname: string;
//   enrollment: string;
//   semester: string;
//   course: string;
//   eventId: string;
//   phone: string;
//   email: string;
//   event: string | { name: string };
// }
// interface EventDetailProps {
//   params: {
//     id: string;
//   };
// }
// const ParticipantDetailPage: React.FC<EventDetailProps> = ({ params }) => {
//   const [participant, setParticipant] = useState<Participant | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     try {
  //       const participantData = await fetchParticipantsById(params.id);
  //       console.log("Fetched Participant Data:", participantData);
  //       if (participantData) {
  //         const formattedParticipant: Participant = {
  //           id: participantData.id as string,
  //           fullname: participantData.fullname,
  //           enrollment: participantData.enrollment,
  //           semester: participantData.semester,
  //           course: participantData.course,
  //           eventId: participantData.eventId,
  //           phone: participantData.phone,
  //           email: participantData.email,
  //           event: participantData.event,
  //         };
  //         setParticipant(formattedParticipant);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching participant:", err);
  //       setError("Failed to fetch participant data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchEvent();
  // }, [params.id]);
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-900">
//         <div className="w-16 h-16 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-200 text-red-500">
//         {error}
//       </div>
//     );
//   }
//   if (!participant) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-200 text-red-500">
//         No participant found
//       </div>
//     );
//   }
//   return (
//     <div className="p-8 bg-gray-200 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="text-4xl font-extrabold text-gray-700">{participant.fullname}</h1>
//           {/* <p className="text-xl text-gray-600 mt-2">
//             {typeof participant.event === "string"
//               ? participant.event
//               : participant.event.name}
//           </p> */}
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:scale-[1.05] transition-all duration-500">
//               <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
//               <p className="text-gray-600">
//                 <strong>Enrollment:</strong> {participant.enrollment}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Semester:</strong> {participant.semester}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Course:</strong> {participant.course}
//               </p>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:scale-[1.05] transition-all duration-500">
//               <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h2>
//               <p className="text-gray-600">
//                 <strong>Phone:</strong> {participant.phone}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Email:</strong> {participant.email}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParticipantDetailPage;


"use client";
import { useEffect, useState } from "react";
import { fetchParticipantsById, updateParticipant } from "@/actions/data";
import { Participant } from "@/lib/types";

interface EventDetailProps {
  params: {
    id: string;
  };
}

const ParticipantDetailPage: React.FC<EventDetailProps> = ({ params }) => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Participant | null>(null);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const participantData = await fetchParticipantsById(params.id);
        console.log("Fetched Participant Data:", participantData);
        if (participantData) {
          const formattedParticipant: Participant = {
            id: participantData.id as string,
            fullname: participantData.fullname,
            enrollment: participantData.enrollment,
            semester: participantData.semester,
            course: participantData.course,
            eventId: participantData.eventId,
            phone: participantData.phone,
            email: participantData.email,
            event: participantData.event,
          };
          setParticipant(formattedParticipant);
        }
      } catch (err) {
        console.error("Error fetching participant:", err);
        setError("Failed to fetch participant data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [params.id]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-16 h-16 border-4 border-t-4 dark:bg-gray-900 bg-gray-200 border-indigo-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-200 text-red-500">
        {error}
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-200 text-red-500">
        No participant found
      </div>
    );
  }
  return (
    <div className="p-8 dark:bg-gradient-to-r from-gray-900 to-gray-800 bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl dark:bg-gradient-to-r from-gray-700 to-gray-600 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={participant.image || "https://i.pravatar.cc/150?img=5"}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-4"
            />
            <h1 className="text-4xl font-extrabold dark:text-gray-200 text-gray-700">{participant.fullname}</h1>
            
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold dark:text-gray-300 text-gray-700 mb-4">Personal Information</h2>
              <p className="dark:text-gray-300 text-gray-600">
                <strong>Enrollment:</strong> {participant.enrollment}
              </p>
              <p className="dark:text-gray-300 text-gray-600">
                <strong>Semester:</strong> {participant.semester}
              </p>
              <p className="dark:text-gray-300 text-gray-600">
                <strong>Course:</strong> {participant.course}
              </p>
              {/* <p className="text-gray-600">
                <strong>Gender:</strong> {participant.gender}
              </p> */}
            </div>
            <div className="bg-gray-50 dark:bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold dark:text-gray-300 text-gray-700 mb-4">Contact Information</h2>
              <p className="dark:text-gray-300 text-gray-600">
                <strong>Phone:</strong> {participant.phone}
              </p>
              <p className="dark:text-gray-300 text-gray-600">
                <strong>Email:</strong> {participant.email}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ParticipantDetailPage;
