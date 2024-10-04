import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for the Event Participant
export interface IEventParticipant extends Document {
  event:string;
  participants: number;  // Assuming participants are an array of references to Participant models
  
}

// Define the schema for the Event Participant
const partiSchema: Schema<IEventParticipant> = new Schema({
  event: {
   type:String,
  },
  participants: [
    {
      type:Number,
    },
  ],
 
});

// Create and export the model
const Participants: Model<IEventParticipant> = mongoose.models.Participants || mongoose.model<IEventParticipant>('Participants', partiSchema);

export default Participants;
