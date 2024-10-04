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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-800">
        <div className="text-xl font-semibold">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex justify-center items-center text-gray-800">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <img
          src={event.image || "/eventa1.jpg"}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

        <div className="flex  flex-wrap gap-6 text-gray-700 mb-6">
          <div className="flex items-center mr-6">
            <FaCalendarAlt className="mr-2 text-indigo-600" />
            <span>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>
          <div className="flex items-center mr-6">
            <FaMapMarkerAlt className="mr-2 text-indigo-600" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center mr-6">
            <FaUser className="mr-2 text-indigo-600" />
            <span>{event.members} participants</span>
          </div>
        </div>

        <div className="flex items-center text-gray-700 mb-6">
          <LiaPeopleCarrySolid className="mr-2 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Organised by:</h2>
          <span className="ml-2 text-lg text-gray-700">{event.organiser}</span>
        </div>

        <div className="flex items-center text-gray-700 mb-6">
          <GiReceiveMoney className="mr-2 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Sponsors:</h2>
          <span className="ml-2 text-lg text-gray-700">
            {event.sponsers || "None"}
          </span>
        </div>

        <div className="flex items-center text-gray-700 mb-6">
          <MdCategory className="mr-2 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Category:</h2>
          <span className="ml-2 text-lg text-gray-700">{event.category}</span>
        </div>

        <div className="flex items-center text-gray-700 mb-6">
          <FaTags className="mr-2 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tags:</h2>
          <span className="ml-2 text-lg text-gray-700">
            {event.tags?.join(", ") || "No tags"}
          </span>
        </div>
        <div className="mb-4">
          <div className="flex items-center text-gray-700">
            <MdOutlineDescription className="mr-2 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Description:
            </h2>
          </div>
          <p className="text-lg text-gray-700">{event.description}</p>
        </div>

        <div className="text-center mt-4">
          <Link href={`/user/registration/${id}`}>
            <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
