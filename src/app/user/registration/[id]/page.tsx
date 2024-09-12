// "use client"
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import React, { useState, useEffect } from "react";
// interface EventDetailProps {
//   params: {
//     id: string;
//   };
// }

// interface Event {
//   id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   image: string;
//   duration: string;
//   location: string;
//   description: string;
//   organiser: string;
// }
// const formatDate = (dateString: string) => {
//   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// const  EventRegistrationForm: React.FC<EventDetailProps>=async ({ params }) =>{
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<boolean>(false);
//   const { id } = params;
//   const response = await fetch(`http://localhost:3000//api/getevent/${id}`, {
//     cache: "no-store",
//   });
//   console.log(response);
//   if (!response.ok) {
//     return notFound();
//   }

//   const data = await response.json();
//   const event: Event = data.event;

//   if (!event) {
//     return <div>Event not found</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#FEF6EC] to-[#FBEAD1] p-6">
//       {/* Header */}
//       <div className="text-center mb-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
//         <div className="flex flex-col items-center lg:items-start">
//           <Image
//             src="/innovation.png"
//             width={70}
//             height={70}
//             alt="Innovation Logo"
//           />
//           <h3 className="text-lg font-semibold mt-1 lg:mt-2 lg:-ml-6">
//             Creative Events
//           </h3>
//         </div>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-gray-800 text-center lg:text-left">
//           Event Registration Form
//         </h1>
//       </div>

//       {/* Form Card */}
//       <div className="bg-white border-2 border-black rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-4xl">
//         <div className="p-4 rounded-md mb-6 flex flex-row max-sm:flex-col justify-between border-b-4 border-black">
//           <div className="mb-4 lg:mb-0">
//             <h2 className="text-2xl font-bold text-gray-700 mb-6">
//               About This Event
//             </h2>
//             <ul className="text-lg text-gray-600 space-y-2">
//               <li>
//                 <strong>Event Name:</strong> {event.title}
//               </li>
//               <li>
//                 <strong>Start Date:</strong>   {formatDate(event.startDate)}
//               </li>
//               <li>
//                 <strong>End Date:</strong>   {formatDate(event.endDate)}
//               </li>
//               <li>
//                 <strong>Organizer:</strong> {event.organiser}
//               </li>
//             </ul>
//           </div>
//           <div className="flex flex-col items-center lg:items-end">
//             <img
//               src="https://i.pravatar.cc/150?img=5"
//               alt="Speaker Michelle Erica"
//               className="w-30 h-30 rounded-full mb-3"
//             />
//             <span className="text-xl font-extrabold text-gray-700 text-center">
//               Michelle Erica
//             </span>
//           </div>
//         </div>

//         <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[black] sm:text-sm bg-[#fcf5e8]"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Enrollment No
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[black] sm:text-sm bg-[#fcf5e8]"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Course
//             </label>
//             <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[black] sm:text-sm bg-[#fcf5e8]">
//               <option>BCA</option>
//               <option>BBA</option>
//               <option>B.Com</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Semester
//             </label>
//             <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[black] sm:text-sm bg-[#fcf5e8]">
//               <option>First</option>
//               <option>Second</option>
//               <option>Third</option>
//               <option>Fourth</option>
//               <option>Fifth</option>
//               <option>Sixth</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[black] sm:text-sm bg-[#fcf5e8]"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[black] sm:text-sm bg-[#fcf5e8]"
//             />
//           </div>

//           {/* <div className="col-span-1 sm:col-span-2 text-sm text-gray-500 mb-4">
//             <p>
//               I understand that participation in this event may involve some
//               degree of risk. I release WebianPro LLC from any liability for
//               injury, loss, or damage to personal property.
//             </p>
//             <div className="flex items-center mt-4 gap-1">
//               <input
//                 id="agreement"
//                 type="checkbox"
//                 className="form-checkbox text-[#F59E0B] h-6 w-6 rounded-md"
//               />
//               <label htmlFor="agreement" className="ml-2 text-lg text-gray-700">
//                 I agree to the terms and conditions
//               </label>
//             </div>
//           </div> */}

//           {/* <div className="col-span-1 sm:col-span-2 text-right mt-2">
//             <p className="text-sm text-gray-700">Date: August 29, 2030</p>
//             <div className="mt-1 border-t border-gray-300"></div>
//           </div> */}
//           <div className="w-full col-span-2 flex justify-center items-center">
//             <button className="w-full p-2 rounded-md bg-green-600 hover:bg-green-700 text-white" type="submit">Register</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EventRegistrationForm


"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface EventDetailProps {
  params: {
    id: string;
  };
}

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
  duration: string;
  location: string;
  description: string;
  organiser: string;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EventRegistrationForm: React.FC<EventDetailProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/getevent/${id}`, {
          cache: "no-store",
        });
        console.log(response);

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setEvent(data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
   
    return (
      <div className="flex justify-center items-center min-h-[300px]">
      <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
    </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#FEF6EC] to-[#FBEAD1]">
        <div className="text-xl font-semibold">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#FEF6EC] to-[#FBEAD1] p-6">
      {/* Header */}
      <div className="text-center mb-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src="/innovation.png"
            width={70}
            height={70}
            alt="Innovation Logo"
          />
          <h3 className="text-lg font-semibold mt-1 lg:mt-2 lg:-ml-6">
            Creative Events
          </h3>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-gray-800 text-center lg:text-left">
          Event Registration Form
        </h1>
      </div>

      {/* Form Card */}
      <div className="bg-white border-2 border-black rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-4xl">
        <div className="p-4 rounded-md mb-6 flex flex-row max-sm:flex-col justify-between border-b-4 border-black">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              About This Event
            </h2>
            <ul className="text-lg text-gray-600 space-y-2">
              <li>
                <strong>Event Name:</strong> {event.title}
              </li>
              <li>
                <strong>Start Date:</strong> {formatDate(event.startDate)}
              </li>
              <li>
                <strong>End Date:</strong> {formatDate(event.endDate)}
              </li>
              <li>
                <strong>Organizer:</strong> {event.organiser}
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-end">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Speaker Michelle Erica"
              className="w-30 h-30 rounded-full mb-3"
            />
            <span className="text-xl font-extrabold text-gray-700 text-center">
              Michelle Erica
            </span>
          </div>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#fcf5e8]"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Enrollment No
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#fcf5e8]"
              placeholder="Enter your enrollment number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#fcf5e8]"
            >
              <option value="">Select your course</option>
              <option>BCA</option>
              <option>BBA</option>
              <option>B.Com</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Semester
            </label>
            <select
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#fcf5e8]"
            >
              <option value="">Select your semester</option>
              <option>First</option>
              <option>Second</option>
              <option>Third</option>
              <option>Fourth</option>
              <option>Fifth</option>
              <option>Sixth</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#fcf5e8]"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-[#fcf5e8]"
              placeholder="Enter your email address"
            />
          </div>

          <div className="w-full col-span-2 flex justify-center items-center">
            <button
              className="w-full p-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition duration-300"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
