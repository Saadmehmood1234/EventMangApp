"use client";
import * as React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { getEvents } from "@/actions/data";

interface AllEvent {
  id: string;
  title: string;
  image?: string;
}

const defaultImage = "/eventa2.jpg"; // Replace with the path to your default image

const ScrollAreaHorizontalDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<AllEvent[]>([]);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      const formattedEvents: AllEvent[] = fetchedEvents.map(
        (eventData: any) => ({
          id: eventData.id as string,
          title: eventData.title,
          image: eventData.image || defaultImage,
        })
      );
      setEvents(
        formattedEvents.length > 0
          ? formattedEvents
          : [
              {
                id: "default",
                title: "No Events Available",
                image: defaultImage,
              },
            ]
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      // Add a default event on error
      setEvents([
        {
          id: "default-error",
          title: "Error Loading Events",
          image: defaultImage,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [events]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl md:text-3xl lg:text-4xl text-center text-wrap max-w-2xl text-white leading-relaxed mb-4">
          Welcome to{" "}
          <span className="text-indigo-400 font-semibold">Eventify</span>
        </p>
      </div>
      <h1 className="sm:text-3xl max-sm:flex max-sm:flex-col text-4xl text-gray-700 text-wrap md:text-4xl lg:text-5xl font-bold mb-6 dark:text-white tracking-wide">
        Discover & Join{" "}
        <span className="max-sm:text-3xl">Thrilling Events</span>
      </h1>
      <div className="flex justify-center items-center">
        <ScrollArea className="w-full flex justify-center items-center h-[60vh] max-sm:h-[50vh] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-x-auto p-4">
          <div className="flex w-max mt-4">
            {events.length > 0 && (
              <figure
                key={events[currentIndex].id}
                className="shrink-0 relative"
              >
                <div className="flex items-center justify-center w-[100vh] h-[50vh] max-sm:h-[40vh] md:h-[54vh] bg-gray-700 rounded-lg shadow-md transition-transform duration-300 ease-in-out overflow-hidden">
                  <Image
                    src={events[currentIndex].image || defaultImage}
                    alt={`Event organized by DBIT}`}
                    className="object-cover opacity-40"
                    layout="fill"
                    priority
                  />
                </div>
              </figure>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="flex justify-center items-center flex-col flex-wrap">
        <div className="flex flex-col justify-center items-center">
          <p className="sm:text-xl md:text-xl lg:text-2xl text-center dark:text-gray-300 text-gray-600 text-wrap max-w-2xl text-whiteleading-relaxed">
            Stay updated on the latest events happening around our college and
            find your next unforgettable experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollAreaHorizontalDemo;
