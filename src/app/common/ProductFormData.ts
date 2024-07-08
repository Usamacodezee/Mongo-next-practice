export interface ReviewSchema {
  rating: number | null;
  comment: string | null;
  date: Date | null;
  reviewerName: string | null;
  reviewerEmail: string | null;
}

export interface MetaData {
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductTypes {
  _id: number | null;
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
  reviews: ReviewSchema[];
  meta: MetaData;
  image: string;
}

export const TagsOptions = [
  { name: "ReactJs developer", code: "RD" },
  { name: "mobiles", code: "MO" },
  { name: "Laptops", code: "LTP" },
  { name: "Monitor", code: "MT" },
  { name: "CPU", code: "CPU" },
  { name: "Printer", code: "PRNT" },
  { name: "TV", code: "TV" },
  { name: "Plat Station 4", code: "PS5" },
];

export const AvailabilityOptions = [
  { name: "in stock", code: "in stock" },
  { name: "out of stock", code: "out of stock" },
  { name: "preorder", code: "preorder" },
];

export const CategoryOptions = [
  { name: "Electronics", code: "EL" },
  { name: "Fashion", code: "FA" },
  { name: "Home Appliances", code: "HA" },
];

const ProductForm = [
  {
    id: 1,
    label: "Product name",
    name: "name",
    placeHolder: "enter product name",
    inputType: "String",
    fieldType: "InputText",
    filter: "filter",
    sortable: "sortable",
    inputSize: "col-md-12 col-xl-6 form-group",
  },
  {
    id: 13,
    label: "Image",
    name: "image",
    placeHolder: "Select product image",
    inputType: "string",
    fieldType: "InputText",
    inputSize: "col-md-6 col-xl-6 form-group",
  },
  {
    id: 2,
    label: "Description",
    name: "description",
    placeHolder: "enter product description",
    inputType: "String",
    fieldType: "InputTextarea",
    sortable: "sortable",
    inputSize: "col-md-6 col-xl-12 form-group",
  },
  {
    id: 3,
    label: "Category",
    name: "category",
    placeHolder: "enter product category",
    inputType: "string",
    fieldType: "Dropdown",
    filter: "filter",
    sortable: "sortable",
    options: [
      { name: "Electronics", code: "EL" },
      { name: "Fashion", code: "FA" },
      { name: "Home Appliances", code: "HA" },
      { name: "mens-shirts", code: "MS" },
      { name: "Health", code: "Health" },
    ],
    inputSize: "col-md-6 col-xl-4 form-group CategoryList",
  },
  {
    id: 4,
    label: "Price",
    name: "price",
    placeHolder: "enter product price",
    inputType: "Number",
    fieldType: "InputText",
    filter: "filter",
    sortable: "sortable",
    inputSize: "col-md-2 col-xl-2 form-group",
  },
  {
    id: 5,
    label: "Discount percentage",
    name: "discountPercentage",
    placeHolder: "enter Discount percentage",
    inputType: "string",
    fieldType: "InputText",
    filter: "filter",
    filterElement: "DesignationRowFIlterTemplate",
    sortable: "sortable",
    inputSize: "col-md-2 col-xl-2 form-group",
  },
  {
    id: 6,
    label: "Rating",
    name: "rating",
    placeHolder: "enter product rating",
    inputType: "Number",
    fieldType: "InputText",
    filter: "filter",
    sortable: "sortable",
    inputSize: "col-md-3 col-xl-2 form-group",
  },
  {
    id: 7,
    label: "Stock",
    name: "stock",
    placeHolder: "enter product stock",
    inputType: "String",
    fieldType: "InputText",
    filter: "filter",
    sortable: "sortable",
    inputSize: "col-md-3 col-xl-2 form-group",
  },
  {
    id: 9,
    label: "Brand",
    name: "brand",
    placeHolder: "enter product brand",
    inputType: "String",
    fieldType: "InputText",
    filter: "filter",
    sortable: "sortable",
    inputSize: "col-md-3 col-xl-3 form-group",
  },
  {
    id: 10,
    label: "Warranty information",
    name: "warrantyInformation",
    placeHolder: "enter Warranty information",
    inputType: "String",
    fieldType: "InputText",
    sortable: "sortable",
    inputSize: "col-md-3 col-xl-3 form-group",
  },
  {
    id: 11,
    label: "Shipping information",
    name: "shippingInformation",
    placeHolder: "Select Shipping information",
    inputType: "string",
    fieldType: "InputText",
    filter: "filter",
    sortable: "sortable",
    inputSize: "col-md-3 col-xl-3 form-group",
  },
  {
    id: 12,
    label: "Return policy",
    name: "returnPolicy",
    placeHolder: "Select Return policy information",
    inputType: "string",
    fieldType: "InputText",
    filter: "filter",
    sortable: "sortable",
    inputSize: "col-md-3 col-xl-3 form-group",
  },
  {
    id: 8,
    label: "Tags",
    name: "tags",
    placeHolder: "enter product tags",
    inputType: "String",
    fieldType: "GroupCheckbox",
    filter: "filter",
    sortable: "sortable",
    value: [
      { name: "mobiles", code: "MO" },
      { name: "Laptops", code: "LTP" },
      { name: "Monitor", code: "MT" },
      { name: "CPU", code: "CPU" },
      { name: "Printer", code: "PRNT" },
      { name: "TV", code: "TV" },
      { name: "Plat Station 4", code: "PS5" },
      { name: "Protein Powder", code: "PRTN" },
      { name: "Shirt", code: "Shirt" },
      { name: "Watch", code: "Watch" },
      { name: "Pant", code: "Pant" },
    ],
    inputSize: "col-md-6 col-xl-6 form-group TagsList",
  },
  {
    id: 13,
    label: "Availability status",
    name: "availabilityStatus",
    placeHolder: "Select Availability Status",
    inputType: "string",
    fieldType: "RadioButton",
    filter: "filter",
    sortable: "sortable",
    value: [
      { name: "in stock", code: "in stock" },
      { name: "out of stock", code: "out of stock" },
      { name: "preorder", code: "preorder" },
    ],
    inputSize: "col-md-6 col-xl-6 form-group availabilityStatusList",
  },
];

export default ProductForm;
