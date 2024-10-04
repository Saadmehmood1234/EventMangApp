// "use client";
import React from "react";
import EventsCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import { getEvents } from "@/actions/data"; // Server-side data fetching
import EventsSearchClient from "@/components/EventsSearchClient";
const Home = async () => {
  const events = await getEvents(); // Fetch events on the server side

  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center text-gray-800">
      {/* <Header/> */}
      <main className="flex-grow flex flex-col justify-center items-center text-center mt-12 px-4">
        <h1 className="sm:text-5xl text-4xl font-extrabold mb-8 text-gray-900">
          Discover and Participate in Exciting Events
        </h1>
        <div className="mb-12 sm:text-2xl text-xl max-w-3xl">
          <p>
            Welcome to Eventify, your go-to platform for staying up-to-date with
            all the exciting events happening around our college!
          </p>
        </div>
        <div className="w-full max-w-3xl mb-6"></div>
        <div className="mt-5 flex justify-center items-center flex-wrap">
          <EventsSearchClient events={events} />
        </div>
      </main>
      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
