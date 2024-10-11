import EventParticipant from "@/model/Participants";
import { NextRequest, NextResponse } from "next/server";
import connectToMongoDb from "@/utils/dbConnect";
import Event from "@/model/Event";

import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  await connectToMongoDb();

  try {
    const { fullname, enrollment, semester, course, email, phone, eventId } = await req.json();

    const eventRegistered=await EventParticipant.findOne({eventId,email});
    if(eventRegistered){
      return NextResponse.json(
        { error: "User with the same email, enrollment number, or phone already registered" },
        { status: 400 }
      );
    }

    // const existingUser = await EventParticipant.findOne({
    //   $or: [
    //     { email },
    //     { enrollment },
    //     { phone }
    //   ],
    // });
    
    // if (existingUser &&  eventRegistered) {
    //   return NextResponse.json(
    //     { error: "User with the same email, enrollment number, or phone already registered" },
    //     { status: 400 }
    //   );
    // }
    
    const ParticipantEvent = await Event.findById(eventId);
    const event=ParticipantEvent?.title
    const newUser = new EventParticipant({
      fullname,
      enrollment,
      semester,
      email,
      course,
      phone,
      event,
      eventId
    });
    await newUser.save();

    console.log("Event after saving:", event); 
    return NextResponse.json(
      {
        _id: newUser._id,
        fullname: newUser.fullname,
        enrollment: newUser.enrollment,
        semester: newUser.semester,
        course: newUser.course,
        phone: newUser.phone,
        event:newUser.event,
        email: newUser.email,
        eventId:newUser.eventId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration controller:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
