"use client";
import React, { useState, useEffect } from "react";
import { getEvents } from "@/actions/data";
import Link from "next/link";

import { FaLongArrowAltRight } from "react-icons/fa";
interface EventHistory {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image?: string;
  organiser: string;
  description: string;
  location: string;
}
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
const EventHistory = () => {
  const [events, setEvents] = useState<EventHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<Record<string, boolean>>({});

  const fetchEvents = async () => {
    try {
      const eventData = await getEvents();
      const currentDate = new Date();

      const formattedEvents: EventHistory[] = eventData
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
      <div className="mb-4 text-gray-900 dark:text-white">
        <h1 className="text-4xl font-semibold  text-center">Event History</h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-16 h-16 border-4 border-t-4 dark:bg-gray-900 bg-gray-200 border-indigo-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="max-w-5xl grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <div className="dark:bg-gray-700 bg-gray-300 dark:text-white text-black rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer">
                  <img
                    className="w-full h-48 object-cover"
                    src={event.image || "/eventa1.jpg"}
                    alt={event.title}
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="dark:text-gray-300 text-gray-800">
                      <span className="font-semibold text-indigo-400">
                        Start Date:
                      </span>{" "}
                      {formatDate(event.startDate)}
                    </p>
                    <p className="dark:text-gray-300 text-gray-800">
                      <span className="font-semibold text-indigo-400">
                        End Date:
                      </span>{" "}
                      {formatDate(event.endDate)}
                    </p>
                  </div>
                  <Link key={event.id} href={`/user/eventhistory/${event.id}`}>
                    <div className="px-5 pb-4 flex justify-center">
                      <button className="relative py-2 px-4 hover:scale-[1.05] rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out group flex items-center justify-center">
                        more details
                        <FaLongArrowAltRight className="ml-2 text-2xl" />
                      </button>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="dark:text-gray-200 text-gray-600 text-center">
                No past events found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHistory;
