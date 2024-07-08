import { connect } from "@/app/lib/dbConnect";
import Admin from "@/app/models/Admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

connect();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const admin = await Admin.findById(params.id);
    if (!admin) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    admin.set(data);
    await admin.save();

    return NextResponse.json({ success: true, data: admin });
  } catch (error) {
    console.error("Error while updating admin:", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
