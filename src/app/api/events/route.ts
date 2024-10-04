import Event from "@/model/Event";
import connectToMongoDb from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

interface EventBody {
  title: string;
  members: number;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  organiser: string;
  sponsers: string;
  imageUrl?: string;
  tags?: string[];
  category:string;
  // time: string;
}

export const POST = async (req: NextRequest) => {
  await connectToMongoDb();

  try {
    const body: EventBody = await req.json();

    const {
      title,
      members,
      description,
      startDate,
      endDate,
      location,
      organiser,
      sponsers,
      imageUrl,
      tags,
      category,
      // time,
    } = body;

    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      !location ||
      !organiser ||
      !members ||
      !category
      // !time
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEvent = new Event({
      title,
      members,
      description,
      startDate,
      endDate,
      location,
      organiser,
      sponsers,
      imageUrl,
      tags,
      category
      // time,
    });
    console.log("ssad");
    await newEvent.save();

    return NextResponse.json(
      {
        _id: newEvent._id,
        title: newEvent.title,
        members: newEvent.members,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        location: newEvent.location,
        organiser: newEvent.organiser,
        sponsers: newEvent.sponsers,
        imageUrl: newEvent.imageUrl,
        tags: newEvent.tags,
        category:newEvent.category,
        // time: newEvent.time,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in event creation:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
