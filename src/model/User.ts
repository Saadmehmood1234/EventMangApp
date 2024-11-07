
import { Select } from "flowbite-react";
import mongoose, { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    default: null,
    select: false, 
  },
  role: {
    type: String,
    default: "user", 
    enum: ["user", "admin", "moderator"], 
  },
  image: {
    type: String,
    default: null, 
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "prefer not to say"],
    default: "prefer not to say",
  },
  token: {
    type: String,
    default: null,
  },
  course: {
    type: String,
    default: null,
  },
  semester: {
    type: String,
    default: null,
  },
  enrollment:{
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
});

export const MyEventUser =
  models?.MyEventUser || model("MyEventUser", userSchema);


