import { connect } from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/app/models/Admin";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const admin = await Admin.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!admin) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        
        admin.isVerfied = true;
        admin.verifyToken = undefined;
        admin.verifyTokenExpiry = undefined;
        await admin.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
