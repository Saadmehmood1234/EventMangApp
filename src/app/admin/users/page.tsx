"use client";
import React, { useEffect, useState, useTransition } from 'react';
import { deleteUser, getAllUserData } from '@/actions/data';
import Modal from '@/components/Modal';
import { User } from '@/lib/types';
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
        email: userData.email?.toString() || "N/A",
        role: userData.role?.toString() || "No Role",
        image: userData.image || "",
      }));
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
        setUserIdToDelete(null);
      }
    });
  };
  return (
    <div className="dark:bg-gradient-to-r from-gray-900 to-gray-800 bg-gray-200 min-h-screen">
      <div className="container mx-auto p-5">
        <div className='flex justify-center  items-center mb-5'>
          <h2 className="text-3xl font-bold dark:text-gray-100 text-gray-900">All Users</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-4 border-t-4 dark:bg-gray-900 bg-gray-200 border-indigo-500 border-solid rounded-full animate-spin"></div>
        </div>
        ) : (
          <div className="overflow-x-auto"> {/* Enable horizontal scrolling on small screens */}
            <table className="min-w-full border-collapse border border-gray-700 bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="border border-gray-600 px-4 py-2">Name</th>
                  <th className="border border-gray-600 px-4 py-2">Email</th>
                  <th className="border border-gray-600 px-4 py-2">Role</th>
                  <th className="border border-gray-600 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 text-gray-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{user.role}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
                        onClick={() => handleDeleteClick(user.id)}
                        disabled={isPending}
                      >
                        {isPending ? 'Deleting...' : 'Delete'}
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
