import * as Yup from "yup";

const ProductvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  description: Yup.string().required(
    "Please provide information about your Notice period"
  ),
  category: Yup.string().required(
    "Please provide information about your Probation period"
  ),
  price: Yup.number().required("Please provide a valid price"),
  stock: Yup.number().min(1, "Must be 1 or more"),
  brand: Yup.string().required("Please select a brand"),
  warrantyInformation: Yup.string().required("Please provide warranty details"),
  shippingInformation: Yup.string().required("Please provide shipping details"),
  availabilityStatus: Yup.string().required(
    "Please provide availability details"
  ),
  tags: Yup.array()
    .min(1, "please select atleasr 1 tag")
    .max(3, "You can add a maximum of 3 tags")
    .required("Please select tags")
    .transform(function (value, originalValue) {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof originalValue === "string") {
        return originalValue.split(",").map((tag) => tag.trim());
      }
      return value;
    }),
});

export default ProductvalidationSchema;
