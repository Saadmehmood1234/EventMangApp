import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Event } from "@/lib/types";
const EventHistory = () => {
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/getevent");
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedEvents = data.event.map((event: any) => ({
          id: event._id,
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          description: event.description,
          imageUrl: event.imageUrl,
        }));
        const now = new Date();
        const upcomingEvents = formattedEvents.filter(
          (event: any) => new Date(event.endDate) < now
        );
        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100  p-4 lg:p-8">
      <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
        Event History
      </h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  {event.title}
                </h2>
                <p>Start date</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(event.startDate).toDateString()}
                </p>
                <p>End date</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(event.endDate).toDateString()}
                </p>
                <p className="text-gray-600 mb-4">{event.description}</p>
              </div>
            ))
          ) : (
            <div className="text-center flex justify-center items-center w-full text-gray-400 text-2xl  mt-10">
              <div>
                <img
                  src="/nd.png" // Make sure to replace this path with the correct image path.
                  alt="No data"
                />
              </div>
              {/* <p className="text-gray-500 text-center">No events available.</p> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default EventHistory;
