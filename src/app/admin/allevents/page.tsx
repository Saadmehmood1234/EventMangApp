"use client";
import React, { useEffect, useState, useTransition } from "react";
import { getEvents } from "@/actions/data";
import { deleteEvent } from "@/actions/data";
import Modal from "@/components/Modal";
interface AllEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image?: string;
  organiser: string;
  sponsor:string;
  category:string;
  description: string;
  location: string;
}
const EventTable = () => {
  const [events, setEvents] = useState<AllEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<AllEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");
  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      const formattedEvents: AllEvent[] = fetchedEvents.map(
        (eventData: any) => ({
          id: eventData.id as string,
          title: eventData.title,
          startDate: eventData.startDate.toString(),
          endDate: eventData.endDate?.toString() || "",
          image: eventData.image || "",
          organiser: eventData.organiser,
          sponsor: eventData.sponsor,
          category: eventData.category,
          description: eventData.description,
          location: eventData.location,
        })
      );
      setEvents(formattedEvents);
      setFilteredEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const handleDeleteClick = (eventId: string) => {
    setEventIdToDelete(eventId);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!eventIdToDelete) return;
    startTransition(async () => {
      try {
        await deleteEvent(eventIdToDelete);
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventIdToDelete)
        );
        setFilteredEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventIdToDelete)
        );
        alert("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event");
      } finally {
        setModalOpen(false);
        setEventIdToDelete(null);
      }
    });
  };
  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };
  const handleDateFilter = () => {
    const filtered = events.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate || event.startDate);

      const startDateValid = startDateFilter
        ? eventStartDate >= new Date(startDateFilter)
        : true;
      const endDateValid = endDateFilter
        ? eventEndDate <= new Date(endDateFilter)
        : true;

      return startDateValid && endDateValid;
    });
    setFilteredEvents(filtered);
  };
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  useEffect(() => {
    handleDateFilter();
  }, [startDateFilter, endDateFilter]);
  return (
    <div className="dark:bg-gradient-to-r from-gray-900 to-gray-800 bg-gray-200 min-h-screen">
      <div className="container mx-auto p-5">
        <div className="flex justify-center items-center mb-5">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            Event List
          </h2>
        </div>
        <div className="mb-5 flex max-lg:flex-col gap-5 justify-between">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border dark:bg-gray-900 dark:text-gray-200 bg-white text-gray-900 border-gray-300 p-2 rounded"
          />
          <div className="flex space-x-2 justify-center max-sm:justify-between items-center">
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded dark:bg-gray-900 dark:text-gray-200 bg-white text-gray-900"
            />
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded dark:bg-gray-900 dark:text-gray-200 bg-white text-gray-900"
            />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center dark:bg-gray-900 bg-gray-200 items-center min-h-screen">
            <div className="w-16 h-16 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="border border-gray-600 px-4 py-2">Title</th>
                  <th className="border border-gray-600 px-4 py-2">
                    Start Date
                  </th>
                  <th className="border border-gray-600 px-4 py-2">End Date</th>
                  <th className="border border-gray-600 px-4 py-2">Location</th>
                  <th className="border border-gray-600 px-4 py-2">Organiser</th>
                  {/* <th className="border border-gray-600 px-4 py-2">Sponsors</th> */}
                  <th className="border border-gray-600 px-4 py-2">Category</th>
                  <th className="border border-gray-600 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 text-gray-800">
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {event.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {new Date(event.startDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {event.endDate
                        ? new Date(event.endDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {event.location}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {event.organiser}
                    </td>
                    {/* <td className="border border-gray-300 px-4 py-2">
                      {event.sponsor}
                    </td> */}
                    <td className="border border-gray-300 px-4 py-2">
                      {event.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
                        onClick={() => handleDeleteClick(event.id)}
                        disabled={isPending}
                      >
                        {isPending ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default EventTable;
