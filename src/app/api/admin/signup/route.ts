/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/app/lib/dbConnect";
import Admin from "@/app/models/Admin";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const admin = await Admin.findOne({ email });

    if (admin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();
    await sendEmail({ email, emailType: "VERIFY", adminId: savedAdmin._id });

    return NextResponse.json({
      message: "Admin created successfully",
      success: true,
      savedAdmin,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
