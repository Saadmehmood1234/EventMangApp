// import { Select } from "flowbite-react";
// import mongoose, { Schema, model, models } from "mongoose";

// const userSchema = new Schema({
//   name: {
//     type: String,
//     default: null,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     default: null,
//     select:false
//   },
//   role: {
//     type: String,
//     default: "user",
//   },
//   image:{
// type:String
//   },
//   token: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Check if model already exists
// // const MyEventUser = mongoose.models.MyEventUser || mongoose.model("MyEventUser", userSchema);
// export const MyEventUser =models?.MyEventUser || model("MyEventUser", userSchema);
// // const Account = models?.Account || model("Account", accountSchema);

// // export { MyEventUser };
import { Select } from "flowbite-react";
import mongoose, { Schema, model, models } from "mongoose";

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Simple regex for email validation
  },
  password: {
    type: String,
    default: null,
    select: false, // Don't expose the password in queries
  },
  role: {
    type: String,
    default: "user", // Default role for new users
    enum: ["user", "admin", "moderator"], // You can restrict roles here
  },
  image: {
    type: String,
    default: null, // Optional image field for user profile
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
    default: Date.now, // Automatically set the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the updated date
  },
});

// Middleware to automatically update the updatedAt field
export const MyEventUser =
  models?.MyEventUser || model("MyEventUser", userSchema);
// // const Account = models?.Account || model("Account", accountSchema);

// // export { MyEventUser };
