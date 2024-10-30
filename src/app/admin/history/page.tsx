"use client";
import React, { useState, useEffect } from "react";
import { getEvents } from "@/actions/data";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  organiser: string;
  location: string;
}

const EventHistory = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<Record<string, boolean>>({}); // State to manage visibility of additional details

  const fetchEvents = async () => {
    try {
      const eventData = await getEvents();
      const currentDate = new Date();

      const formattedEvents: Event[] = eventData
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
        .filter((event) => new Date(event.endDate) < currentDate); // Filter out future events

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
      [id]: !prev[id], // Toggle visibility for the specific event ID
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 p-4 lg:p-8">
      <h1 className="text-4xl font-bold text-[#e04368] mb-8 text-center">
        Event History
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-16 h-16 border-4 border-t-4 border-[#cc2b50] border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-900/90  shadow-md p-6 transition-transform transform hover:bg-slate-900  hover:scale-105 duration-700"
              >
                <h2 className="text-2xl font-semibold text-[#cc2b50] mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-200">Start Date</p>
                <p className="text-sm text-gray-300 mb-4">
                  {new Date(event.startDate).toDateString()}
                </p>
                <p className="text-gray-200">End Date</p>
                <p className="text-sm text-gray-300 mb-4">
                  {new Date(event.endDate).toDateString()}
                </p>

                {/* Conditionally render additional event details */}
                {showMore[event.id] && (
                  <>
                    <p className="text-gray-200">Description</p>
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    <p className="text-gray-200">Location</p>
                    <p className="text-gray-300 mb-4">{event.location}</p>
                    <p className="text-gray-200">Organiser</p>
                    <p className="text-gray-300 mb-4">{event.organiser}</p>
                  </>
                )}

                {/* Button to toggle additional details */}
                <button
                  onClick={() => toggleShowMore(event.id)}
                  className="mt-4 px-4 py-2 bg-[#cc2b50] text-white  hover:[#cc2b50] transition duration-200"
                >
                  {showMore[event.id] ? "Show Less" : "Show More"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-200 text-center">No past events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventHistory;
