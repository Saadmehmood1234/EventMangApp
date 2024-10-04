"use server"
import { NextResponse } from 'next/server';
import Event from '@/model/Event';
import connectToMongoDb from '@/utils/dbConnect';
import EventParticipant from '@/model/Participants';
import Participants from '@/model/NumberOfParticipants';

export async function getEvents() {
  try {
    await connectToMongoDb(); // Connect to MongoDB
    const events = await Event.find(); // Fetch events from DB
    return events.map((event) => ({
      id: event._id,
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      image: event.imageUrl,
      location: event.location,
      description: event.description,
      organiser: event.organiser,
      members:event.members,
      sponsers:event.sponsers,
      tags:event.tags,
      category:event.category,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}


export async function fetchEventById(eventId: string) {
  await connectToMongoDb(); // Connect to MongoDB

  if (!eventId || eventId.length !== 24) {
    throw new Error('Invalid ID'); // Handle invalid ID
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error('Event not found'); // Handle event not found
    }

    return {
      id: event._id,
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      image: event.imageUrl,
      location: event.location,
      description: event.description,
      organiser: event.organiser,
      members:event.members,
      sponsers:event.sponsers,
      tags:event.tags,
      category:event.category,
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    throw new Error('Internal server error'); // Handle internal error
  }
}


export async function getParticipants() {
    try {
      await connectToMongoDb(); // Connect to MongoDB
      const participants = await EventParticipant.find();
      return participants.map((participant) => ({
        id: participant._id,
        fullname: participant.fullname,
        enrollment: participant.enrollment,
        semester: participant.semester,
        course: participant.course,
        eventId: participant.eventId,
        phone: participant.phone,
        email: participant.email,
        event: participant.event,
      }));
    } catch (error) {
      console.error("Error fetching participants:", error);
      return [];
    }
  }
  


  export async function fetchParticipantsById(participantId: string) {
    await connectToMongoDb(); // Connect to MongoDB
  
    if (!participantId || participantId.length !== 24) {
      throw new Error('Invalid ID'); // Handle invalid ID
    }
  
    try {
      const participants = await EventParticipant.findById(participantId);
  
      if (!participants) {
        throw new Error('Event not found'); // Handle event not found
      }
  
      return {
        id: participants._id,
        fullname: participants.fullname,
        enrollment: participants.enrollment,
        semester: participants.semester,
        course: participants.course,
        eventId: participants.eventId,
        phone: participants.phone,
        email: participants.email,
        event: participants.event,
      };
    } catch (error) {
      console.error('Error fetching event:', error);
      throw new Error('Internal server error');
    }
  }


  import mongoose from "mongoose";

  export const deleteEvent = async (id: string) => {
    try {
      await connectToMongoDb();
  
      // Delete the event
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        throw new Error('Event not found');
      }

    } catch (error: any) {
      console.error('Error deleting event:', error);
      throw new Error(error.message || 'Internal server error');
    }
  };
  