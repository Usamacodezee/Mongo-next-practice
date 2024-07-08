import mongoose from 'mongoose';

const MetaDataSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String },
  reviewerEmail: { type: String }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  tags: [{ type: String, required: true }],
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  returnPolicy: { type: String, required: true },
  orderQuantity: { type: Number, required: true },
  reviews: [ReviewSchema], 
  meta: MetaDataSchema,
  image: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
