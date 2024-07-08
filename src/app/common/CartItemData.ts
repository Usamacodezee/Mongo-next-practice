export interface MetaData {
  UserData: number | string;
  createdAt: Date;
  updatedAt: Date;
  _id?: number;
}

export interface CartItemTypes {
  _id: number | null;
  ProductId: number | string;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  orderQuantity: number;
  meta: {
    UserData: number | string;
    createdAt: Date;
    updatedAt: Date;
  };
  image: string;
}

export interface AddCartItemPayload {
  newCartItem: CartItemTypes;
  UserData: number | string;
}
