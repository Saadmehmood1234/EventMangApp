
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
const eventSchema = z
  .object({
    title: z.string().min(4, "Title should be at least 4 characters long"),
    members: z.string().min(1, "Members are required"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    location: z.string().min(1, "Location is required"),
    tags: z.string().min(1, "At least one tag is required"),
    organiser: z.string().min(1, "Organizer name is required"),
    sponsers: z.string().optional(),
    category: z.string().min(1, "Category is required"),
  })
  .refine((data) => new Date(data.startDate) >= new Date(), {
    message: "Start date must be today or in the future",
    path: ["startDate"], // set the error path to the 'startDate' field
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be greater than or equal to the start date",
    path: ["endDate"], // set the error path to the 'endDate' field
  });
const CreateEvent = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    members: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    imageUrl: "",
    tags: "",
    organiser: "",
    sponsers: "",
    category: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = eventSchema.parse(formData);
      const tagsArray = validatedData.tags.split(",").map((tag) => tag.trim());

      const response = await axios.post("/api/events", {
        ...validatedData,
        tags: tagsArray,
      });

      if (response.status === 201) {
        setSuccessMessage("Event created successfully!"); // Set success message
        setTimeout(() => {
          setSuccessMessage(null); // Clear message after a few seconds
          router.push("/admin");
        }, 2000); // Adjust timeout as needed
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof typeof formData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Failed to create event", error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className=" text-center items-center pt-6  lg:px-8 px-3">
        <h1 className="text-4xl font-bold text-purple-600 text-center lg:ml-0 max-sm:ml-8 sm:ml-8">
          Create New Event
        </h1>
      </div>
      <div className="container mx-auto p-6 max-w-4xl ">
      {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 max-lg:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
                required
              />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="col-span-1 max-lg:col-span-2">
              <label
                htmlFor="members"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Members
              </label>
              <input
                type="text"
                id="members"
                name="members"
                value={formData.members}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
                required
              />
                {errors.members && <p className="text-red-500 text-sm">{errors.members}</p>}
            </div>
            <div className="col-span-1 max-lg:col-span-2">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
                required
              />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
            <div className="col-span-1 max-lg:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
                required
              />
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
              rows={3}
              required
            />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="startDate"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
                required
              />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="endDate"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
              />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="organiser"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Organizer Name
              </label>
              <input
                type="text"
                id="organiser"
                name="organiser"
                value={formData.organiser}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
              />
                {errors.organiser && <p className="text-red-500 text-sm">{errors.organiser}</p>}
            </div>
            <div>
              <label
                htmlFor="sponsers"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Sponsers
              </label>
              <input
                type="text"
                id="sponsers"
                name="sponsers"
                value={formData.sponsers}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
              />
                {errors.sponsers && <p className="text-red-500 text-sm">{errors.sponsers}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Image URL
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              // className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
            />
              {/* {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>} */}
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200/60"
            />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-teal-600 border border-transparent rounded-lg font-semibold text-white shadow-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
