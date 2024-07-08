import { NextRequest, NextResponse } from 'next/server';
import {connect} from '@/app/lib/dbConnect';
import User from '@/app/models/User';

connect();

export async function GET(req: NextRequest) {
  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newUser = new User(data);
    await newUser.save();
    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
