import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/lib/dbConnect';
import User from '@/app/models/User';

connect();
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const user = await User.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedUser = await User.deleteOne({ _id: params.id });
    if (!deletedUser) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
