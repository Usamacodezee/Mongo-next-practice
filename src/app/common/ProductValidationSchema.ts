import * as Yup from "yup";

const ProductvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be 1 characters or more")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  description: Yup.string().required(
    "Please provide information about your Notice period"
  ),
  category: Yup.string().required(
    "Please provide information about your Probation period"
  ),
  price: Yup.number().required("please provide a valid price"),
  stock: Yup.number().min(1, "Must be 1 or more"),
  brand: Yup.string().required("please select brand"),
  warrantyInformation: Yup.string().required("please provide warranty details"),
  shippingInformation: Yup.string().required("please provide shipping details"),
  availabilityStatus: Yup.string().required(
    "please provide availibility details"
  ),
  returnPolicy: Yup.string().required("please provide availibilreturn policyity details"),
});

export default ProductvalidationSchema;
