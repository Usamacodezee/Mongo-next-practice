import mongoose from "mongoose";

const MetaDataSchema = new mongoose.Schema({
  UserData: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const CartSchema = new mongoose.Schema({
  ProductId: { type: String, required: true },
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
  orderQuantity: { type: Number, required: true, default: 1 },
  meta: MetaDataSchema,
  image: { type: String, required: true },
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
