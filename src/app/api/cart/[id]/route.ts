import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/dbConnect";
import Cart from "@/app/models/Cart";

connect();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedCartItem = await Cart.deleteOne({ _id: params.id });
    if (!deletedCartItem) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      params.id,
      { $set: await req.json() },
      { new: true }
    );
    if (!updatedCartItem) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedCartItem });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
