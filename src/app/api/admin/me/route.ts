/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import Admin from "@/app/models/Admin";
import { connect } from "@/app/lib/dbConnect";

connect();

export async function GET(request: NextRequest) {
  try {
    const adminId = await getDataFromToken(request);
    const admin = await Admin.findOne({ _id: adminId });
    return NextResponse.json({
      mesaaage: "User found",
      data: admin,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
