
"use client"
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import EventsCard from "@/components/EventCard";

const EventsSearchClient: React.FC<{ events: any[] }> = ({ events }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Get the current date
  const currentDate = new Date();

  const filteredEvents = events.filter(
    (event) =>
      new Date(event.endDate) > currentDate &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-2xl mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search events..."
          className="w-full border border-gray-600 dark:bg-gray-800 bg-gray-200 text-white dark-text-gray-800 placeholder-gray-400 rounded-full pl-12 pr-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="w-full mt-8">
        <EventsCard events={filteredEvents} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default EventsSearchClient;
