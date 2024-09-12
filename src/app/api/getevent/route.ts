import { NextRequest, NextResponse } from 'next/server';
import Event from '@/model/Event';
import connectToMongoDb from '@/utils/dbConnect';

export async function GET(req: NextRequest) {
  await connectToMongoDb();
  try {
    const event = await Event.find();
   
    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
