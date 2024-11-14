import mongoose, { Document, Model, Schema } from "mongoose";
export interface IEvent extends Document {
  fullname: string;
  enrollment: string;
  semester: string;
  course: string;
  eventId: string;
  userId:string;
  phone: string;
  email: string;
  event: string;
  createdAt: Date;
}
const participantSchema: Schema<IEvent> = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  enrollment: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: false,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
  },
  userId:{
    type: String,
  },
  event: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Event', 
      type:String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EventParticipant: Model<IEvent> =
  mongoose.models.EventParticipant ||
  mongoose.model<IEvent>("EventParticipant", participantSchema);
export default EventParticipant;
