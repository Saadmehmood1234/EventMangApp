// // "use client";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import axios from "axios";
// // import { z } from "zod";
// // const eventSchema = z
// //   .object({
// //     title: z.string().min(4, "Title should be at least 4 characters long"),
// //     members: z.string().min(1, "Members are required"),
// //     description: z
// //       .string()
// //       .min(10, "Description must be at least 10 characters long"),
// //     startDate: z.string().min(1, "Start date is required"),
// //     endDate: z.string().min(1, "End date is required"),
// //     location: z.string().min(1, "Location is required"),
// //     tags: z.string().min(1, "At least one tag is required"),
// //     organiser: z.string().min(1, "Organizer name is required"),
// //     sponsers: z.string().optional(),
// //     category: z.string().min(1, "Category is required"),
// //   })
// //   .refine((data) => new Date(data.startDate) >= new Date(), {
// //     message: "Start date must be today or in the future",
// //     path: ["startDate"],
// //   })
// //   .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
// //     message: "End date must be greater than or equal to the start date",
// //     path: ["endDate"],
// //   });
// // const CreateEvent = () => {
// //   const router = useRouter();
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     members: "",
// //     description: "",
// //     startDate: "",
// //     endDate: "",
// //     location: "",
// //     imageUrl: "",
// //     tags: "",
// //     organiser: "",
// //     sponsers: "",
// //     category: "",
// //   });
// //   const [errors, setErrors] = useState<
// //     Partial<Record<keyof typeof formData, string>>
// //   >({});
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const validatedData = eventSchema.parse(formData);
// //       const tagsArray = validatedData.tags.split(",").map((tag) => tag.trim());
// //       const response = await axios.post("/api/events", {
// //         ...validatedData,
// //         tags: tagsArray,
// //       });
// //       if (response.status === 201) {
// //         setSuccessMessage("Event created successfully!");
// //         setTimeout(() => {
// //           setSuccessMessage(null);
// //           router.push("/admin");
// //         }, 2000);
// //       }
// //     } catch (error) {
// //       if (error instanceof z.ZodError) {
// //         const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
// //         error.errors.forEach((err) => {
// //           if (err.path[0]) {
// //             fieldErrors[err.path[0] as keyof typeof formData] = err.message;
// //           }
// //         });
// //         setErrors(fieldErrors);
// //       } else {
// //         console.error("Failed to create event", error);
// //       }
// //     }
// //   };
// //   return (
// //     <div className="dark:bg-gradient-to-r from-gray-900 to-gray-800 bg-gray-200">
// //       <div className=" text-center items-center p-2">
// //         <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center lg:ml-0 max-sm:ml-8 sm:ml-8">
// //           Create New Event
// //         </h1>
// //       </div>
// //       <div className="container mx-auto p-6 max-w-4xl ">
// //         {successMessage && (
// //           <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
// //             {successMessage}
// //           </div>
// //         )}
// //         <form
// //           onSubmit={handleSubmit}
// //           className="space-y-6 p-6 rounded-lg shadow-md border-2 dark:border-gray-500 border-white dark:bg-gradient-to-r from-gray-700 to-gray-600 bg-white shadow-gray-400/50"
// //         >
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div className="col-span-1 max-lg:col-span-2">
// //               <label
// //                 htmlFor="title"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 Title
// //               </label>
// //               <input
// //                 type="text"
// //                 id="title"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 required
// //               />
// // {errors.title && (
// //   <p className="text-red-500 text-sm">{errors.title}</p>
// // )}
// //             </div>
// //             <div className="col-span-1 max-lg:col-span-2">
// //               <label
// //                 htmlFor="members"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 Members
// //               </label>
// //               <input
// //                 type="text"
// //                 id="members"
// //                 name="members"
// //                 value={formData.members}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 required
// //               />
// //               {errors.members && (
// //                 <p className="text-red-500 text-sm">{errors.members}</p>
// //               )}
// //             </div>
// //             <div className="col-span-1 max-lg:col-span-2">
// //               <label
// //                 htmlFor="location"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 Location
// //               </label>
// //               <input
// //                 type="text"
// //                 id="location"
// //                 name="location"
// //                 value={formData.location}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 required
// //               />
// // {errors.location && (
// //   <p className="text-red-500 text-sm">{errors.location}</p>
// // )}
// //             </div>
// //             <div className="col-span-1 max-lg:col-span-2">
// //               <label
// //                 htmlFor="category"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 Category
// //               </label>
// //               <input
// //                 type="text"
// //                 id="category"
// //                 name="category"
// //                 value={formData.category}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 required
// //               />
// //               {errors.category && (
// //                 <p className="text-red-500 text-sm">{errors.category}</p>
// //               )}
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div className="col-span-1">
// //               <label
// //                 htmlFor="startDate"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 Start Date
// //               </label>
// //               <input
// //                 type="date"
// //                 id="startDate"
// //                 name="startDate"
// //                 value={formData.startDate}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 required
// //               />
// // {errors.startDate && (
// //   <p className="text-red-500 text-sm">{errors.startDate}</p>
// // )}
// //             </div>
// //             <div className="col-span-1">
// //               <label
// //                 htmlFor="endDate"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 End Date
// //               </label>
// //               <input
// //                 type="date"
// //                 id="endDate"
// //                 name="endDate"
// //                 value={formData.endDate}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               />
// //               {errors.endDate && (
// //                 <p className="text-red-500 text-sm">{errors.endDate}</p>
// //               )}
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <label
// //                 htmlFor="organiser"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 Organizer Name
// //               </label>
// //               <input
// //                 type="text"
// //                 id="organiser"
// //                 name="organiser"
// //                 value={formData.organiser}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               />
// //               {errors.organiser && (
// //                 <p className="text-red-500 text-sm">{errors.organiser}</p>
// //               )}
// //             </div>
// //             <div>
// //               <label
// //                 htmlFor="sponsers"
// //                 className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //               >
// //                 Sponsers
// //               </label>
// //               <input
// //                 type="text"
// //                 id="sponsers"
// //                 name="sponsers"
// //                 value={formData.sponsers}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               />
// //               {errors.sponsers && (
// //                 <p className="text-red-500 text-sm">{errors.sponsers}</p>
// //               )}
// //             </div>
// //           </div>

// //           <div>
// //             <label
// //               htmlFor="imageUrl"
// //               className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //             >
// //               Image URL
// //             </label>
// //             <input
// //               type="file"
// //               id="imageUrl"
// //               name="imageUrl"
// //               value={formData.imageUrl}
// //               onChange={handleChange}
// //               className="px-4 py-2 text-ce rounded-full dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] shadow-sm focus:outline-none"
// //             />
// //             {/* {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>} */}
// //           </div>
// //           <div>
// //             <label
// //               htmlFor="tags"
// //               className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //             >
// //               Tags (comma separated)
// //             </label>
// //             <input
// //               type="text"
// //               id="tags"
// //               name="tags"
// //               value={formData.tags}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //             />
// //             {errors.tags && (
// //               <p className="text-red-500 text-sm">{errors.tags}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label
// //               htmlFor="description"
// //               className="block text-sm font-semibold dark:text-gray-300 text-gray-800 mb-2"
// //             >
// //               Description
// //             </label>
// //             <textarea
// //               id="description"
// //               name="description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 dark:text-gray-100 text-gray-800 dark:bg-[#6b6b6b] border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               rows={3}
// //               required
// //             />
// //             {errors.description && (
// //               <p className="text-red-500 text-sm">{errors.description}</p>
// //             )}
// //           </div>
// //           <div className="flex justify-center items-center text-green-500 text-xl">
// //             {successMessage}
// //           </div>
// //           <div>
// //             <button
// //               type="submit"
// //               className="inline-flex items-center px-6 py-3 bg-indigo-500 border border-transparent rounded-full font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //             >
// //               Create Event
// //             </  button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateEvent;

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, Clock, Upload, Plus, X } from "lucide-react";
import { format, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventFormData } from "@/lib/types";

export default function CreateEventPage() {
  const [members, setMembers] = useState<string[]>([]);
  const [sponsors, setSponsors] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  //   watch,
  // } = useForm<EventFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormData>({
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const currentDate = new Date();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleAddMember = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && e.currentTarget.value) {
  //     e.preventDefault();
  //     setMembers([...members, e.currentTarget.value]);
  //     e.currentTarget.value = "";
  //   }
  // };

  const handleAddSponsor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      setSponsors([...sponsors, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const onSubmit = async (data: EventFormData) => {
    if (isBefore(data.startDate, currentDate)) {
      alert("Start date should be greater than the current date.");
      return;
    }
    if (isBefore(data.endDate, data.startDate)) {
      alert("End date should be greater than or equal to the start date.");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append("image", value);
        } else {
          formData.append(key, String(value));
        }
      });
      formData.append("members", JSON.stringify(members));
      formData.append("sponsors", JSON.stringify(sponsors));
      formData.append("tags", JSON.stringify(tags));

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create event");

      // Reset form or redirect
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto light:bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Create New Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className={errors.title ? "border-red-500" : ""}
                />
                {/* {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )} */}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className={errors.title ? "border-red-500" : ""}
                />
                {/* {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )} */}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className={errors.title ? "border-red-500" : ""}
                />
                {/* {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )} */}
              </div>

              {/* Organizer Name */}
              <div className="space-y-2">
                <Label htmlFor="organizerName">Organizer Name</Label>
                <Input
                  id="organizerName"
                  {...register("organizerName", {
                    required: "Organizer name is required",
                  })}
                  className={errors.title ? "border-red-500" : ""}
                />
                {/* {errors.organizerName && (
                  <p className="text-red-500 text-sm">
                    {errors.organizerName.message}
                  </p>
                )} */}
              </div>

              {/* Date Range */}
              {/* <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !watch("startDate") && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watch("startDate")
                        ? format(watch("startDate"), "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watch("startDate")}
                      onSelect={(date: any) => setValue("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
          
              </div> */}

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !watch("startDate") && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date: any) => setValue("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {startDate && isBefore(startDate, currentDate) && (
                  <p className="text-red-500 text-sm">
                    Start date must be after today.
                  </p>
                )}
              </div>
              {/* 
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !watch("endDate") && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watch("endDate")
                        ? format(watch("endDate"), "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watch("endDate")}
                      onSelect={(date: any) => setValue("endDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
            
              </div> */}
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !watch("endDate") && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date: any) => setValue("endDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {endDate && startDate && isBefore(endDate, startDate) && (
                  <p className="text-red-500 text-sm">
                    End date must be the same or after the start date.
                  </p>
                )}
              </div>
              {/* Time */}
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  {...register("time", { required: "Time is required" })}
                  className={errors.title ? "border-red-500" : ""}
                />
                {/* {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time.message}</p>
                )} */}
              </div>
              {/* Members */}
              <div className="space-y-2">
                <Label htmlFor="members">Team Size</Label>

                <Input
                  id="members"
                  type="number"
                  placeholder="Please enter number in a team (e.g:1,2,..) "
                  {...register("members", { required: "Members is required" })}
                  className={errors.title ? "border-red-500" : ""}
                />
              </div>
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Event Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setValue("image", null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Upload event image
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Sponsors */}
            <div className="space-y-2">
              <Label>Sponsors</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {sponsors.map((sponsor, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {sponsor}
                    <button
                      type="button"
                      onClick={() =>
                        setSponsors(sponsors.filter((_, i) => i !== index))
                      }
                      className="ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                placeholder="Press enter to add sponsors"
                onKeyDown={handleAddSponsor}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTags(tags.filter((_, i) => i !== index))
                      }
                      className="ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                placeholder="Press enter to add tags"
                onKeyDown={handleAddTag}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="min-h-[150px]  focus:ring-2 focus:ring-indigo-400"
              />
              {/* {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )} */}
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-400 text-white hover:bg-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
// import { EventForm } from "@/components/events/event-form";

// export default function CreateEventPage() {
//   return <EventForm />;
// }
