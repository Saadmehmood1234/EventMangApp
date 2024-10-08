"use client";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchEventById } from "@/actions/data";
import { GiReceiveMoney } from "react-icons/gi";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { MdOutlineDescription } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

interface EventDetailProps {
  params: {
    id: string;
  };
}

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
  image?: string;
  tags?: string[];
  category: string;
}

const EventDetail: React.FC<EventDetailProps> = ({ params }) => {
  const { id } = params;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
            members: participantData.members,
            sponsers: participantData.sponsers,
            category: participantData.category,
            tags: participantData.tags,
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

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[300px]">
  //       <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  if (error || !event) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-800">
        <div className="text-xl font-semibold">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-gray-200">
      <div className="max-w-4xl w-full bg-gray-700/30 rounded-lg shadow-md sm:shadow-gray-100/40 p-8">
        <img
          src={event.image || "/eventa1.jpg"} 
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-200 mb-4">{event.title}</h1>
        <div className="flex max-sm:flex-col mb-2">
          <div className="flex items-center text-gray-200 mb-1 w-full sm:w-1/2">
            <FaUser className="mr-2 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-200">
              {event.members} participants
            </span>
          </div>
          <div className="flex items-center text-gray-200 mb-2 w-full sm:w-1/2">
            <MdCategory className="mr-2 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-200">Category:</h2>
            <span className="ml-2 text-lg text-gray-200">{event.category}</span>
          </div>
        </div>

        <div className="flex max-sm:flex-col  mb-2">
          <div className="flex items-center text-gray-200 mb-2 sm:w-1/2 w-full ">
            <LiaPeopleCarrySolid className="mr-2 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-200">
              Organised by:
            </h2>
            <span className="ml-2 text-lg text-gray-200 ">
              {event.organiser}
            </span>
          </div>

          <div className="flex items-center text-gray-200 mb-2 sm:w-1/2 w-full">
            <GiReceiveMoney className="mr-2 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-200">Sponsors:</h2>
            <span className="ml-2 text-lg text-gray-200">
              {event.sponsers || "None"}
            </span>
          </div>
        </div>
        <div className="flex max-sm:flex-col text-gray-200  mb-2">
          <div className="flex items-center sm:w-1/2 w-full  mb-2 mr-6 ">
            <FaCalendarAlt className="mr-2 text-indigo-600" />
            <span>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>
          <div className="flex items-center mr-6 sm:w-1/2 w-full  ">
            <FaMapMarkerAlt className="mr-2 text-indigo-600" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-200  mb-2 ">
          <FaTags className="mr-2 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Tags:</h2>
          <span className="ml-2 text-lg text-gray-200">
            {event.tags?.join(", ") || "No tags"}
          </span>
        </div>
        <div className="mb-4">
          <div className="flex items-center text-gray-200">
            <MdOutlineDescription className="mr-2 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              Description:
            </h2>
          </div>
          <p className="text-lg text-gray-200">{event.description}</p>
        </div>

        <div className="text-center mt-4">
          <Link href={`/user/registration/${id}`}>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-700 transition duration-300 ease-in-out">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
