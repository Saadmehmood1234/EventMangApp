import mongoose, { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
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

export const MyImages = models?.MyImages || model("MyImages", ImageSchema);
