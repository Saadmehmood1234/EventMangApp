
"use client";
import React, { useEffect, useState, useTransition } from 'react';
import { getEvents } from '@/actions/data';
import { deleteEvent } from '@/actions/data';
import Modal from '@/components/Modal'; // Import the Modal component

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
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);

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
    } catch (error) {
      console.error('Error fetching events:', error);
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
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventIdToDelete));
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      } finally {
        setModalOpen(false);
        setEventIdToDelete(null); // Reset the ID after deletion
      }
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <div className='flex justify-center items-center '>
        <h2 className="text-2xl font-bold mb-4">Event List</h2>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Organiser</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border border-gray-300 px-4 py-2">{event.title}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(event.startDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{event.endDate ? new Date(event.endDate).toLocaleDateString() : '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{event.location}</td>
                <td className="border border-gray-300 px-4 py-2">{event.organiser}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteClick(event.id)}
                    disabled={isPending} // Disable button during transition
                  >
                    {isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default EventTable;
