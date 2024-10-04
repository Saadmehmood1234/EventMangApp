import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  members: number;
  description: string;
  startDate: Date;
  endDate?: Date;
  // time?: string; // 
  category:string;
  location: string;
  organiser: string;
  sponsers: string;
  attendees?: mongoose.Schema.Types.ObjectId[];
  imageUrl?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema: Schema<IEvent> = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  members: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  // time: {
  //   type: String, // Changed to string
  //   required: false,
  // },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  organiser: {
    type: String,
    required: true,
  },
  sponsers: {
    type: String,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventParticipant',
    },
  ],
  imageUrl: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  category:{
    type:String,
    required:true
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

eventSchema.pre<IEvent>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
