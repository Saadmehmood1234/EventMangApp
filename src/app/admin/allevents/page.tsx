"use client";
import React, { useEffect, useState, useTransition } from "react";
import { getEvents } from "@/actions/data";
import { deleteEvent } from "@/actions/data";
import Modal from "@/components/Modal"; // Import the Modal component

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  organiser: string;
  description: string;
  image?: string;
}

const EventTable = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
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
      const formattedEvents: Event[] = fetchedEvents.map((eventData: any) => ({
        id: eventData.id as string,
        title: eventData.title,
        startDate: eventData.startDate.toString(),
        endDate: eventData.endDate?.toString() || "",
        image: eventData.image || "",
        organiser: eventData.organiser,
        description: eventData.description,
        location: eventData.location,
      }));
      setEvents(formattedEvents);
      setFilteredEvents(formattedEvents); // Set initial filtered events
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
        ); // Update filtered events
        alert("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event");
      } finally {
        setModalOpen(false);
        setEventIdToDelete(null); // Reset the ID after deletion
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
    <div className="bg-gradient-to-r from-blue-200 to-green-200 min-h-screen">
      <div className="container mx-auto p-5">
        <div className="flex justify-center items-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">Event List</h2>
        </div>

        {/* Search and Date Filters */}
          <div className="mb-5 flex max-lg:flex-col gap-5 justify-between">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <div className="flex space-x-2 justify-center max-sm:justify-between items-center">
              <input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Start Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">End Date</th>
                  <th className="border border-gray-300 px-4 py-2">Location</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Organiser
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
                        onClick={() => handleDeleteClick(event.id)}
                        disabled={isPending} // Disable button during transition
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
