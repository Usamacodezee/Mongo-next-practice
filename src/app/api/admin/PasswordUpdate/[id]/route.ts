import { connect } from "@/app/lib/dbConnect";
import Admin from "@/app/models/Admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await req.json();

    const { currentPassword, newPassword } = payload;
    const admin = await Admin.findById(params.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid current password" },
        { status: 400 }
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error while updating password:", error);
    return NextResponse.json(
      { success: false, message: "Error occurred while updating password" },
      { status: 500 }
    );
  }
}
