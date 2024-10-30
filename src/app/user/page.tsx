

// "use client"; // Uncomment this if you have client-side code
import { auth } from '@/auth';
import React from "react";
import Footer from "@/components/Footer";
import { getEvents } from "@/actions/data"; // Server-side data fetching
import EventsSearchClient from "@/components/EventsSearchClient";
import { redirect } from 'next/navigation'; // Correct import for redirect
const Home = async () => {
  const session = await auth(); // Check user session first
  if (!session) {
    redirect("/signin"); // Redirect if not authenticated
    return null; // Prevent rendering if redirected
  }

  const events = await getEvents(); // Fetch events on the server side

  // const user = session?.user; // Get user data
  // console.log(user); // Optional: log user data for debugging

  return (
    <div className="bg-gradient-to-r from-blue-200 to-green-200 flex flex-col w-fullsm:h-[100vh] items-center text-gray-800">
      {/* <Header/> */}
      <main className="flex-grow flex flex-col justify-center items-center text-center mt-12 px-4">
        <h1 className="sm:text-5xl text-4xl font-extrabold mb-8 text-gray-700">
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
