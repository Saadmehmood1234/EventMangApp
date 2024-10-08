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
  },
  password: {
    type: String,
    default: null,
    select:false
  },
  role: {
    type: String,
    default: "user",
  },
  image:{
type:String
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if model already exists
// const MyEventUser = mongoose.models.MyEventUser || mongoose.model("MyEventUser", userSchema);
export const MyEventUser =models?.MyEventUser || model("MyEventUser", userSchema);
// const Account = models?.Account || model("Account", accountSchema);

// export { MyEventUser };
