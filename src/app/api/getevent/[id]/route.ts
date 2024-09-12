import { NextRequest, NextResponse } from 'next/server';
import Event from '@/model/Event';
import connectToMongoDb from '@/utils/dbConnect';

export async function GET(req: NextRequest) {
  await connectToMongoDb();

  try {
    // Extract ID from URL
    const url = new URL(req.url);
    console.log(url)
    console.log('Request URL:', req.url);
    const eventId = url.pathname.split('/').pop();
     console.log(eventId)
    

    if (!eventId || eventId.length !== 24) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }


    const event = await Event.findById(eventId);
  
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    console.log(event)
    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
