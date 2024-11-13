
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Event } from "@/lib/types";

interface EventsCardProps {
  events: Event[];
  searchQuery: string;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const EventsCard: React.FC<EventsCardProps> = ({ events, searchQuery }) => {
  const [showAll, setShowAll] = useState(false);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);

  return (
    <div className="p-8 dark:bg-gradient-to-b from-gray-800 to-gray-900 bg-gray-200 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="mb-8 text-3xl font-bold text-indigo-400 text-center">
        <h1>Upcoming Events</h1>
      </div>
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleEvents.map((event) => (
            <Link key={event.id} href={`/user/events/${event.id}`}>
              <div className="dark:bg-gray-700 bg-gray-300 dark:text-white text-black rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer">
                <img
                  className="w-full h-48 object-cover"
                  src={event.image || "eventa1.jpg"}
                  alt={event.title}
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-2">{event.title}</h3>
                  <p className="dark:text-gray-300 text-gray-800">
                    <span className="font-semibold text-indigo-400">Start:</span> {formatDate(event.startDate)}
                  </p>
                  <p className="dark:text-gray-300 text-gray-800">
                    <span className="font-semibold text-indigo-400">End:</span> {formatDate(event.endDate)}
                  </p>
                </div>
                <div className="px-5 pb-4 flex justify-center">
                  <button className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-400 transition duration-300 ease-in-out">
                    Join Event
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center w-full text-gray-400 text-2xl mt-10">
        <img
                src="/nd.png" // Make sure to replace this path with the correct image path.
                alt="No data"
                
              />
        </div>
      )}

      {filteredEvents.length > 6 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsCard;