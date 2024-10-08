// "use client";
import { auth } from '@/auth'
import React from "react";
import Footer from "@/components/Footer";
import { getEvents } from "@/actions/data"; // Server-side data fetching
import EventsSearchClient from "@/components/EventsSearchClient";
const Home = async () => {
  const events = await getEvents(); // Fetch events on the server side
  const session=await auth();
  const user=session?.user;
  console.log(user);
  return (
    <div className="bg-black flex flex-col w-full sm:h-[100vh] items-center text-gray-400">
      {/* <Header/> */}
      <main className="flex-grow flex flex-col justify-center items-center text-center mt-12 px-4">
        <h1 className="sm:text-5xl text-4xl font-extrabold mb-8 text-gray-200">
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
