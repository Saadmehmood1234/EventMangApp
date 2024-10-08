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
//   event: string;
// }

// interface EventDetailProps {
//   params: {
//     id: string;
//   };
// }

// const ParticipantDetailPage: React.FC<EventDetailProps> = ({ params }) => {
//   // const { id } = params; // Fetch participant ID from the route
//   const [participant, setParticipant] = useState<Participant | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const participantData = await fetchParticipantsById(params.id); // Call the server action

//         // Ensure participantData is properly formatted
//         if (participantData) {
//           const formattedParticipants: Participant = {
//             id: participantData.id as string,
//             fullname: participantData.fullname,
//             enrollment: participantData.enrollment,
//             semester: participantData.semester,
//             course: participantData.course,
//             eventId: participantData.eventId,
//             phone: participantData.phone,
//             email: participantData.email,
//             event: participantData.event,
//           };
//           setParticipant(formattedParticipants);
//         }
//       } catch (err) {
//         console.error("Error fetching event:", err);
//         // setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-200">
//         Loading...
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
//     <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 h-[100vh]  flex items-center justify-center">
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="text-4xl font-extrabold text-gray-800">
//             {participant.fullname}
//           </h1>
//           <p className="text-xl text-gray-600 mt-2">{participant.event}</p>
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-700 mb-2">
//                 Details
//               </h2>
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
//             <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-700 mb-2">
//                 Contact Information
//               </h2>
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
import { fetchParticipantsById } from "@/actions/data";

interface Participant {
  id: string;
  fullname: string;
  enrollment: string;
  semester: string;
  course: string;
  eventId: string;
  phone: string;
  email: string;
  event: string | { name: string }; // Assuming `event` might be an object
}

interface EventDetailProps {
  params: {
    id: string;
  };
}

const ParticipantDetailPage: React.FC<EventDetailProps> = ({ params }) => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const participantData = await fetchParticipantsById(params.id);
        console.log("Fetched Participant Data:", participantData); // Log participant data

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
            event: participantData.event, // Check if this is an object
          };
          setParticipant(formattedParticipant);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch participant data."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200 text-red-500">
        {error}
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200 text-red-500">
        No participant found
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-700 h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-4xl bg-gray-950/90 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-300">
            {participant.fullname}
          </h1>
          {/* <p className="text-xl text-gray-600 mt-2">
            {typeof participant.event === "string"
              ? participant.event
              : participant.event.name}
          </p> */}
        </div>
        <div className="p-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Details
              </h2>
              <p className="text-gray-600">
                <strong>Enrollment:</strong> {participant.enrollment}
              </p>
              <p className="text-gray-600">
                <strong>Semester:</strong> {participant.semester}
              </p>
              <p className="text-gray-600">
                <strong>Course:</strong> {participant.course}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Contact Information
              </h2>
              <p className="text-gray-600">
                <strong>Phone:</strong> {participant.phone}
              </p>
              <p className="text-gray-600">
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
