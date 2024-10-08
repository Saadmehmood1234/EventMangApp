
"use client";
import React, { useEffect, useState, useTransition } from 'react';
import { getEvents } from '@/actions/data';
import { deleteUser } from '@/actions/data';
import Modal from '@/components/Modal'; // Import the Modal component
import { getAllUserData } from '@/actions/data';
interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
}

const EventTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUserData();
      const formattedUsers: User[] = fetchedUsers.map((userData: any) => ({
        id: userData._id as string,
        name: userData.name,
        email: userData.email?.toString() || "N/A", // Safe access to 'email'
        role: userData.role?.toString() || "No Role", // Safe access to 'role'
        image: userData.image || "",
      }));
      console.log(formattedUsers)
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (eventId: string) => {
    setUserIdToDelete(eventId);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userIdToDelete) return;

    startTransition(async () => {
      try {
        await deleteUser(userIdToDelete);
        setUsers((prevEvents) => prevEvents.filter((event) => event.id !== userIdToDelete));
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      } finally {
        setModalOpen(false);
        setUserIdToDelete(null); // Reset the ID after deletion
      }
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <div className='flex justify-center items-center '>
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              {/* <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>*/}
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                {/* <td className="border border-gray-300 px-4 py-2">{new Date(event.startDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{event.endDate ? new Date(event.endDate).toLocaleDateString() : '-'}</td> */}
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteClick(user.id)}
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
