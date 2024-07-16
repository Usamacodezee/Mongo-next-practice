import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/dbConnect";
import CartItem from "@/app/models/Cart";

connect();
export async function GET() {
  try {
    const CartItems = await CartItem.find({});
    return NextResponse.json({ success: true, data: CartItems });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { newCartItem } = data;
    const newCartItemInstance = new CartItem(newCartItem);
    await newCartItemInstance.save();
    return NextResponse.json({ success: true, data: newCartItemInstance });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
