import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

connect();
export async function GET(req: NextRequest) {
  try {
    const products = await Product.find({});
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newProduct = new Product(data);
    await newProduct.save();
    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
