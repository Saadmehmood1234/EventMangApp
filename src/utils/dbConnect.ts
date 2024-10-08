import mongoose from "mongoose";

const connectToMongoDb = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI environment variable is not defined.");
    return;
  }

  try {
    if(mongoose.connection && mongoose.connections[0].readyState) return;
    await mongoose.connect(mongoUri);
    console.log("Connected to database");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDb;
