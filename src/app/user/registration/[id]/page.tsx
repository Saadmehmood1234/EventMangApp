// "use client";

// import { z } from "zod";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect, FormEvent } from "react";
// import SuccessModal from "@/components/SuccessModal";
// import { getUserData } from "@/actions/authActions";
// import useRegistration from "@/hooks/useRegistration";
// import { fetchEventById } from "@/actions/data"; // Import the server action
// import { Spinner } from "@nextui-org/react";
// // Define your Zod schema
// const registrationSchema = z.object({
//   // fullname: z.string().min(4, "Full Name should be at least 4 characters"),
//   enrollment: z
//   .string()
//   .min(8, "Enrollment number must be at least 8 characters")
//   .max(12, "Enrollment number cannot exceed 12 characters"),
//   semester: z.string().min(1, "Please select a semester"),
//   course: z.string().min(1, "Please select a course"),
//   // email: z.string().email("Invalid email address"),
//   phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
//   eventId: z.string(),
// });

// interface EventDetailProps {
//   params: {
//     id: string;
//   };
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role?: string;
//   image?: string;
// }
// interface Event {
//   id: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   image: string;
//   location: string;
//   description: string;
//   organiser: string;
// }

// const formatDate = (dateString: string) => {
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// const EventRegistrationForm: React.FC<EventDetailProps> = ({ params }) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<boolean>(false);
//   const [event, setEvent] = useState<Event | null>(null);
//   const [users, setUsers] = useState<User[]>([]);
//   const [inputs, setInputs] = useState({
//     fullname: "",
//     enrollment: "",
//     semester: "",
//     course: "",
//     email: "",
//     phone: "",
//     eventId: params.id,
//   });
//   const fetchUsers = async () => {
//     try {
//       const fetchedUsers = await getUserData();
//       const formattedUsers: User[] = fetchedUsers.map((userData: any) => ({
//         id: userData._id as string,
//         name: userData.name,
//         email: userData.email?.toString() || "N/A", // Safe access to 'email'
//         role: userData.role?.toString() || "No Role", // Safe access to 'role'
//         image: userData.image || "",
//       }));
//       console.log(formattedUsers)
//       setUsers(formattedUsers);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentUser = users[0];
//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const router = useRouter();
//   const { registration } = useRegistration();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//   //     setInputs({ ...inputs, fullname: currentUser.name
//   //      })
//   //  setInputs({ ...inputs, email: currentUser.email })
//       registrationSchema.parse(inputs);
//       setFormErrors({});
//       const data = await registration(inputs);
//       if (data) {
//         setIsModalOpen(true);
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const errors = error.errors.reduce(
//           (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
//           {}
//         );
//         setFormErrors(errors);
//       }
//       console.error("Registration failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const participantData = await fetchEventById(params.id);

//         if (participantData) {
//           const formattedEvent: Event = {
//             id: participantData.id as string,
//             title: participantData.title,
//             startDate: participantData.startDate.toString(),
//             endDate: participantData.endDate?.toString() || "",
//             image: participantData.image || "",
//             organiser: participantData.organiser,
//             description: participantData.description,
//             location: participantData.location,
//           };
//           setEvent(formattedEvent);
//         }
//       } catch (err) {
//         console.error("Error fetching event:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[300px]">
//         <Spinner className="text-blue-700"/>
//       </div>
//     );
//   }

//   if (error || !event) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e6b0cd] to-[#9fc2f0]">
//         <div className="text-xl font-semibold">Event not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-black p-6">
//       {/* Header */}
//       <div className="text-center mb-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
//         {/* <div className="flex flex-col items-center lg:items-start">
//           <Image
//             src="/innovation.png"
//             width={70}
//             height={70}
//             alt="Innovation Logo"
//           />
//           <h3 className="text-lg font-semibold mt-1 text-gray-200 lg:mt-2 lg:-ml-6">
//             Creative Events
//           </h3>
//         </div> */}
//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-gray-200 text-center lg:text-left">
//           Event Registration Form
//         </h1>
//       </div>

//       {/* Form Card */}
//       <div className="bg-gray-800/50 border-2 border-gray-200/50 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-4xl">
//         <div className="p-4 rounded-md mb-6 flex flex-row max-sm:flex-col justify-between border-b-4 border-black">
//           <div className="mb-4 lg:mb-0">
//             <h2 className="text-2xl font-bold text-gray-200 mb-6">
//               About This Event
//             </h2>
//             <ul className="text-lg text-gray-400 space-y-2">
//               <li>
//                 <strong>Event Name:</strong> {event.title}
//               </li>
//               <li>
//                 <strong>Start Date:</strong> {formatDate(event.startDate)}
//               </li>
//               <li>
//                 <strong>End Date:</strong> {formatDate(event.endDate)}
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
//             <span className="text-xl font-extrabold text-gray-200 text-center">
//            {currentUser.name}

//             </span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//           <div className="mb-2 max-sm:col-span-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Full Name
//             </label>
//             <input
//               type="text"
//               // value={currentUser.name}
//               value={inputs.fullname}
//               onChange={(e) =>
//                 setInputs({ ...inputs, fullname: e.target.value })
//               }
//               required
//               className="mt-1  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
//               placeholder="Enter your full name"
//             />
//             {formErrors.fullname && (
//               <p className="text-red-600 text-sm">{formErrors.fullname}</p>
//             )}
//           </div>

//           <div className="mb-2 max-sm:col-span-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Enrollment No
//             </label>
//             <input
//               type="number"
//               value={inputs.enrollment}
//               onChange={(e) =>
//                 setInputs({ ...inputs, enrollment: e.target.value })
//               }
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
//               placeholder="Enter your enrollment number"
//             />
//             {formErrors.enrollment && (
//               <p className="text-red-600 text-sm">{formErrors.enrollment}</p>
//             )}
//           </div>

//           <div className="mb-2 max-sm:col-span-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Course
//             </label>
//             <select
//               required
//               value={inputs.course}
//               onChange={(e) => setInputs({ ...inputs, course: e.target.value })}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
//             >
//               <option value="">Select your course</option>
//               <option>BCA</option>
//               <option>BBA</option>
//               <option>MCA</option>
//               <option>MBA</option>
//               {/* Add other options as needed */}
//             </select>
//             {formErrors.course && (
//               <p className="text-red-600 text-sm">{formErrors.course}</p>
//             )}
//           </div>

//           <div className="mb-2 max-sm:col-span-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Semester
//             </label>
//             <select
//               value={inputs.semester}
//               onChange={(e) =>
//                 setInputs({ ...inputs, semester: e.target.value })
//               }
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
//             >
//               <option value="">Select your semester</option>
//               <option>First</option>
//               <option>Second</option>
//               <option>Third</option>
//               <option>Fourth</option>
//               <option>Fifth</option>
//               <option>Sixth</option>
//             </select>
//             {formErrors.semester && (
//               <p className="text-red-600 text-sm">{formErrors.semester}</p>
//             )}
//           </div>

//           <div className="mb-2 max-sm:col-span-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Email
//             </label>
//             <input
//               type="email"
//               // value={currentUser.email}
//               value={inputs.email}
//               onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
//               placeholder="Enter your email"
//             />
//             {formErrors.email && (
//               <p className="text-red-600 text-sm">{formErrors.email}</p>
//             )}
//           </div>

//           <div className="mb-2 max-sm:col-span-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Phone No
//             </label>
//             <input
//               type="tel"
//               value={inputs.phone}
//               onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
//               placeholder="Enter your phone number"
//             />
//             {formErrors.phone && (
//               <p className="text-red-600 text-sm">{formErrors.phone}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="col-span-2 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none "
//           >
//            { loading ? <Spinner className="text-white"/>:"Register"}

//           </button>
//         </form>
//       </div>

//       {/* Success Modal */}
//       <SuccessModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           router.push("/user"); // Redirect after closing the modal
//         }}
//       />
//     </div>
//   );
// };

// export default EventRegistrationForm;

"use client";

import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";
import SuccessModal from "@/components/SuccessModal";
import { getUserData } from "@/actions/authActions";
import useRegistration from "@/hooks/useRegistration";
import { fetchEventById } from "@/actions/data"; // Import the server action
import { Spinner } from "@nextui-org/react";

// Define your Zod schema
const registrationSchema = z.object({
  enrollment: z
    .string()
    .min(8, "Enrollment number must be at least 8 characters")
    .max(12, "Enrollment number cannot exceed 12 characters"),
  semester: z.string().min(1, "Please select a semester"),
  course: z.string().min(1, "Please select a course"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  eventId: z.string(),
});

interface EventDetailProps {
  params: {
    id: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
}
interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
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
  const [apiResponseMessage, setApiResponseMessage] = useState<string | null>(
    null
  );
  const [users, setUsers] = useState<User[]>([]);
  const [inputs, setInputs] = useState({
    fullname: "",
    enrollment: "",
    semester: "",
    course: "",
    email: "",
    phone: "",
    eventId: params.id,
  });
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUserData();
      const formattedUsers: User[] = fetchedUsers.map((userData: any) => ({
        id: userData._id as string,
        name: userData.name,
        email: userData.email?.toString() || "N/A", // Safe access to 'email'
        role: userData.role?.toString() || "No Role", // Safe access to 'role'
        image: userData.image || "",
      }));
      console.log(formattedUsers);
      setUsers(formattedUsers);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const currentUser = users[0];
  useEffect(() => {
    fetchUsers();
  }, []);

  // Set the name and email from currentUser into inputs once fetched
  useEffect(() => {
    if (currentUser) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        fullname: currentUser.name,
        email: currentUser.email,
      }));
    }
  }, [currentUser]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { registration } = useRegistration();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});
    try {
      registrationSchema.parse(inputs);
      setFormErrors({});
      const data = await registration(inputs);
      if (data) {
        setApiResponseMessage("Registration successful!");
        setIsModalOpen(true); // Open modal if needed
      }
      else{
        setApiResponseMessage("User Already Registered")
      }
      
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
          {}
        );
        setFormErrors(errors); 
      } else if (error.response && error.response.data) {
      const statusCode = error.response.status;
      const apiErrors = error.response.data.errors || {};
      setFormErrors(apiErrors); 
      if (statusCode === 400) {
        setApiResponseMessage("User already registered.");
      } else {
        setApiResponseMessage(
          "An error occurred during registration."
        );
      }
      } else {
        console.error("Unexpected Error:", error);
        setApiResponseMessage(
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const participantData = await fetchEventById(params.id);

        if (participantData) {
          const formattedEvent: Event = {
            id: participantData.id as string,
            title: participantData.title,
            startDate: participantData.startDate.toString(),
            endDate: participantData.endDate?.toString() || "",
            image: participantData.image || "",
            organiser: participantData.organiser,
            description: participantData.description,
            location: participantData.location,
          };
          setEvent(formattedEvent);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);
console.log(apiResponseMessage)

  if (error || !event) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="text-xl font-semibold text-gray-200">
          Event not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-black p-6">
      {/* Header */}
      <div className="text-center mb-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-gray-200 text-center lg:text-left">
          Event Registration Form
        </h1>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800/50 border-2 border-gray-200/50 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-4xl">
        <div className="p-4 rounded-md mb-6 flex flex-row max-sm:flex-col justify-between border-b-4 border-black">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold text-gray-200 mb-6">
              About This Event
            </h2>
            <ul className="text-lg text-gray-400 space-y-2">
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
              src={currentUser.image || "https://i.pravatar.cc/150?img=5"}
              alt="User"
              className="w-30 h-30 rounded-full mb-3"
            />
            <span className="text-xl font-extrabold text-gray-200 text-center">
              {currentUser.name}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="mb-2 max-sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              Course
            </label>
            <select
              value={inputs.course}
              onChange={(e) => setInputs({ ...inputs, course: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
            >
              <option value="">Select a course</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BBA">BBA</option>
              <option value="MBA">MBA</option>
            </select>
            {formErrors.course && (
              <p className="text-red-600 text-sm">{formErrors.course}</p>
            )}
          </div>

          <div className="mb-2 max-sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              Semester
            </label>
            <select
              value={inputs.semester}
              onChange={(e) =>
                setInputs({ ...inputs, semester: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
            >
              <option value="">Select semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
            {formErrors.semester && (
              <p className="text-red-600 text-sm">{formErrors.semester}</p>
            )}
          </div>

          <div className="mb-2 max-sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              value={inputs.phone}
              onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
              placeholder="Enter your phone number"
            />
            {formErrors.phone && (
              <p className="text-red-600 text-sm">{formErrors.phone}</p>
            )}
          </div>
          <div className="mb-2 max-sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              Enrollment No
            </label>
            <input
              type="number"
              value={inputs.enrollment}
              onChange={(e) =>
                setInputs({ ...inputs, enrollment: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
              placeholder="Enter your enrollment number"
            />
            {formErrors.enrollment && (
              <p className="text-red-600 text-sm">{formErrors.enrollment}</p>
            )}
          </div>
          <div className="col-span-2 mt-4">
            {apiResponseMessage && (
              <p
                className={`text-sm ${
                  apiResponseMessage.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {apiResponseMessage}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Register"}
              {error}
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            router.push("/user"); // Redirect after closing the modal
          }}
        />
      )}
    </div>
  );
};

export default EventRegistrationForm;
