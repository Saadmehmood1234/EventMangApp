

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
import { Event } from "@/lib/types";
import { TfiTime } from "react-icons/tfi";
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
            sponsors: participantData.sponsors,
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
      <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="w-16 h-16 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <div className="text-xl font-semibold">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 dark:bg-gradient-to-b from-gray-900 to-gray-800 flex justify-center items-center dark:text-gray-100">
      <div className="max-w-4xl  w-full bg-white dark:bg-gray-700 rounded-lg shadow-md p-8">
        <img
          src={event.image || "/eventa1.jpg"}
          alt={event.title}
          className="w-full h-96 object-cover rounded-lg mb-6 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {event.title}
        </h1>
        <div className="flex max-sm:flex-col mb-2">
          <div className="flex items-center text-gray-900 dark:text-white mb-1 w-full sm:w-1/2">
            <FaUser className="mr-2 text-indigo-400" />
            <span className="text-xl font-semibold">
              {event.members} participants
            </span>
          </div>
          <div className="flex items-center text-gray-900 dark:text-white mb-2 w-full sm:w-1/2">
            <MdCategory className="mr-2 text-indigo-400" />
            <h2 className="text-xl font-semibold">Category:</h2>
            <span className="ml-2 text-lg">{event.category}</span>
          </div>
        </div>

        <div className="flex max-sm:flex-col mb-2">
          <div className="flex items-center text-gray-900 dark:text-white mb-2 sm:w-1/2 w-full ">
            <LiaPeopleCarrySolid className="mr-2 text-indigo-400" />
            <h2 className="text-xl font-semibold">Organised by:</h2>
            <span className="ml-2 text-lg">{event.organiser}</span>
          </div>

          <div className="flex items-center text-gray-900 dark:text-white mb-2 sm:w-1/2 w-full">
            <GiReceiveMoney className="mr-2 text-indigo-400" />
            <h2 className="text-xl font-semibold">Sponsors:</h2>
            <span className="ml-2 text-lg">{event.sponsors || "None"}</span>
          </div>
        </div>

        <div className="flex max-sm:flex-col text-gray-900 dark:text-white mb-2">
          <div className="flex items-center sm:w-1/2 w-full mb-2 mr-6 ">
            <FaCalendarAlt className="mr-2 text-indigo-400" />
            <span>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>
          <div className="flex items-center mr-6 sm:w-1/2 w-full ">
            <FaMapMarkerAlt className="mr-2 text-indigo-400" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex max-sm:flex-col mb-2">
          <div className="flex items-center text-gray-900 dark:text-white mb-2 sm:w-1/2 w-full ">
            <TfiTime className="mr-2 text-indigo-400" />
            <h2 className="text-lg font-semibold">Time:</h2>
            <span className="ml-2 text-lg">{event.time}</span>
          </div>

          <div className="flex items-center text-gray-900 dark:text-white mb-2 sm:w-1/2 w-full">
            <FaTags className="mr-2 text-indigo-400" />
            <h2 className="text-lg font-semibold">Tags:</h2>
            <span className="ml-2 text-lg">  {event.tags?.join(", ") || "No tags"}</span>
          </div>
        </div>


        <div className="mb-4">
          <div className="flex items-center text-gray-900 dark:text-white">
            <MdOutlineDescription className="mr-2 text-indigo-400" />
            <h2 className="text-xl font-semibold mb-2">Description:</h2>
          </div>
          <p className="text-lg">{event.description}</p>
        </div>

      </div>
    </div>
  );
};

export default EventDetail;
