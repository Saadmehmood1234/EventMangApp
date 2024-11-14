import { z } from "zod";

export const eventSchema = z
  .object({
    title: z.string().min(4, "Title should be at least 4 characters long"),
    members: z.string().min(1, "Members are required"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    time: z.string().min(1, "Time is required"),
    location: z.string().min(1, "Location is required"),
    tags: z.string().min(1, "At least one tag is required"),
    organizerName: z.string().min(1, "Organizer name is required"),
    sponsers: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    image: z.any().optional().nullable(),
  })
  .refine((data) => {
    try {
      return new Date(data.startDate) >= new Date(new Date().setHours(0, 0, 0, 0));
    } catch {
      return false;
    }
  }, {
    message: "Start date must be today or in the future",
    path: ["startDate"],
  })
  .refine((data) => {
    try {
      return new Date(data.endDate) >= new Date(data.startDate);
    } catch {
      return false;
    }
  }, {
    message: "End date must be greater than or equal to the start date",
    path: ["endDate"],
  });