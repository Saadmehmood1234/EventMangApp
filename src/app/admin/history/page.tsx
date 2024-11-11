"use client";
import React, { useState, useEffect } from "react";
import { getEvents } from "@/actions/data";

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
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="dark:bg-gradient-to-r from-gray-700 to-gray-600 bg-white shadow-md p-6 rounded-lg transition-transform transform hover:bg-gray-50 hover:scale-[1.02] duration-500"
              >
                <h2 className="text-xl font-semibold dark:text-gray-300 text-gray-800 mb-2">
                  {event.title}
                </h2>
                <p className="dark:text-gray-200 text-gray-500 text-sm">
                  Start Date
                </p>
                <p className="text-sm dark:text-gray-300 text-gray-600 mb-4">
                  {new Date(event.startDate).toDateString()}
                </p>
                <p className="dark:text-gray-200 text-gray-500 text-sm">
                  End Date
                </p>
                <p className="text-sm dark:text-gray-300 text-gray-600 mb-4">
                  {new Date(event.endDate).toDateString()}
                </p>
                {showMore[event.id] && (
                  <>
                    <p className="dark:text-gray-200 text-gray-500 text-sm">
                      Description
                    </p>
                    <p className="dark:text-gray-200 text-gray-600 mb-4">
                      {event.description}
                    </p>
                    <p className="dark:text-gray-200 text-gray-500 text-sm">
                      Location
                    </p>
                    <p className="dark:text-gray-200 text-gray-600 mb-4">
                      {event.location}
                    </p>
                    <p className="dark:text-gray-200 text-gray-500 text-sm">
                      Organiser
                    </p>
                    <p className="dark:text-gray-200 text-gray-600 mb-4">
                      {event.organiser}
                    </p>
                  </>
                )}
                <button
                  onClick={() => toggleShowMore(event.id)}
                  className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400 transition duration-300"
                >
                  {showMore[event.id] ? "Show Less" : "Show More"}
                </button>
              </div>
            ))
          ) : (
            <p className="dark:text-gray-200 text-gray-600 text-center">
              No past events found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventHistory;
