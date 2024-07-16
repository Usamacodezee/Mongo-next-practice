/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/dbConnect";
import Product from "@/app/models/Product";

connect();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedProduct = await Product.deleteOne({ _id: params.id });
    if (!deletedProduct) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

function calculateAverageRating(reviews: any[]): number {
  if (reviews.length === 0) {
    return 0;
  }
  const totalRating = reviews.reduce((acc, review) => {
    return acc + (review.rating || 0);
  }, 0);
  return totalRating / reviews.length;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const { reviewerName, reviewerEmail, comment, rating, date } = data;

    const newReview = {
      reviewerName,
      reviewerEmail,
      comment,
      rating,
      date: new Date(date),
    };

    const product = await Product.findByIdAndUpdate(
      params.id,
      { $push: { reviews: newReview } },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }
    product.rating = calculateAverageRating(product.reviews);
    await product.save();

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    console.error("Error while adding review:", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
