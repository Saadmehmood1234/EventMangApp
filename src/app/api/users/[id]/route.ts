import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { MyEventUser } from '@/model/User';
import connectToMongoDb from '@/utils/dbConnect';

export async function GET(req: NextRequest) {
  await connectToMongoDb();


  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (typeof id !== 'string') {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const user = await MyEventUser.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
