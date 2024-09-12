import { FaUserGraduate } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineTrophy } from "react-icons/ai";
import Link from "next/link";

const ParticipantPage = () => {
  const events = [
    {
      name: "Hackathon",
      participants: [
        { name: "John Doe", role: "Participant" },
        { name: "Jane Smith", role: "Mentor" },
      ],
      total:"30",
      icon: <AiOutlineTrophy className="text-4xl text-yellow-500" />,
    },
    {
      name: "Coding Challenge",
      participants: [
        { name: "Alice Brown", role: "Participant" },
        { name: "Bob White", role: "Judge" },
      ],
      total:"40",
      icon: <FaUserGraduate className="text-4xl text-blue-500" />,
    },
    {
      name: "Robotics Workshop",
      participants: [
        { name: "Charlie Black", role: "Participant" },
        { name: "Dave Green", role: "Speaker" },
      ],
      total:"50",
      icon: <IoIosPeople className="text-4xl text-green-500" />,
    },
  ];

  // const totalParticipants = events.reduce((total, event) => total + event.participants.length, 0);

  return (
    <>
      <div className="flex justify-between items-center pt-6 py-4 lg:px-8 px-3 bg-slate-50">
        <h1 className="text-3xl font-bold text-purple-600 lg:ml-0 max-sm:ml-8 sm:ml-8">
          Participants
        </h1>
        <div className="text-xl font-semibold text-gray-600">
          All Participants: <span className="text-purple-600">160</span>
        </div>
        {/* <Link href={"admin/createEvents"}>
          <button className="bg-purple-300 hover:bg-purple-400 rounded-full px-4 py-2">
            <span className="block lg:hidden text-xl font-bold">+</span>
            <span className="hidden lg:block font-semibold">+ Add Event</span>
          </button>
        </Link> */}
      </div>

      <div className="p-8 bg-gray-100 min-h-screen">
        {events.map((event, index) => (
          <div
            key={index}
            className="mb-8 p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="flex justify-between">
            <div className="flex items-center mb-4">
              <div className="mr-4">{event.icon}</div>
              <h2 className="text-3xl font-semibold text-gray-700">{event.name}</h2>
            </div>
            <div className="font-semibold">
            Participants: <span className="text-purple-600">{event.total}</span>
            </div>
            </div>
            <ul>
              {event.participants.map((participant, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center p-4 mb-2 bg-gray-50 rounded-md border"
                >
                  <span className="text-lg font-medium text-gray-600">
                    {participant.name}
                  </span>
                  <span className="text-sm text-gray-500">{participant.role}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default ParticipantPage;
