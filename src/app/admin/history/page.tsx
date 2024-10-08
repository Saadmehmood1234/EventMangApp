

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
        .filter(event => new Date(event.endDate) < currentDate);

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

  return (
    <div className="min-h-screen bg-slate-700 p-4 lg:p-8">
      <h1 className="text-4xl font-bold text-gray-300 mb-8 text-center">
        Event History
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-900/90 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-200">Start date</p>
                <p className="text-sm text-gray-300 mb-4">
                  {new Date(event.startDate).toDateString()}
                </p>
                <p className="text-gray-200">End date</p>
                <p className="text-sm text-gray-300 mb-4">
                  {new Date(event.endDate).toDateString()}
                </p>
                <p className="text-gray-300 mb-4">{event.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-200 text-center">No upcoming events.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventHistory;
