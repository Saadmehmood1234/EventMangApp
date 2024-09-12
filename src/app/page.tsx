"use client";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";
import Link from "next/link";
import EventsCard from "@/components/EventCard";
import Footer from "@/components/Footer";
const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center text-gray-800">
      <main className="flex-grow flex flex-col justify-center items-center text-center mt-12 px-4">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-900">
          Discover and Participate in Exciting Events
        </h1>
        <div className="mb-12 text-2xl max-w-3xl">
          <p>
            Welcome to Eventify, your go-to platform for staying up-to-date with
            all the exciting events happening around our college!
          </p>
        </div>
        <div className="w-full max-w-3xl mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search events..."
              className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="mt-5">
          <EventsCard searchQuery={searchQuery} />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
