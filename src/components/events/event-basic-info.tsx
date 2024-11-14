"use client";

import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EventBasicInfoProps {
  form: UseFormReturn<EventFormData>;
}

export function EventBasicInfo({ form }: EventBasicInfoProps) {
  const { register, formState: { errors } } = form;

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          {...register("title")}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          {...register("category")}
          className={errors.category ? "border-red-500" : ""}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          {...register("location")}
          className={errors.location ? "border-red-500" : ""}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organizerName">Organizer Name</Label>
        <Input
          id="organizerName"
          {...register("organizerName")}
          className={errors.organizerName ? "border-red-500" : ""}
        />
        {errors.organizerName && (
          <p className="text-red-500 text-sm">{errors.organizerName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="members">Team Size</Label>
        <Input
          id="members"
          type="number"
          placeholder="Please enter number in a team (e.g:1,2,..)"
          {...register("members")}
          className={errors.members ? "border-red-500" : ""}
        />
        {errors.members && (
          <p className="text-red-500 text-sm">{errors.members.message}</p>
        )}
      </div>
    </>
  );
}