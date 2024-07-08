import * as Yup from "yup";

export interface ReviewTypes {
  _id: number | null;
  rating: number | null;
  comment: string | null;
  date: Date | string | null;
  reviewerName: string | null;
  reviewerEmail: string | null;
}

export const ReviewValidationSchema = Yup.object().shape({
  reviewerName: Yup.string().required("Required"),
  reviewerEmail: Yup.string().required(
    "please provide email address"
  ),
  comment: Yup.string().required(
    "Please provide detailed description"
  ),
  rating: Yup.number().required("please provide ratings"),
});

const ReviewFormData = [
  {
    id: 1,
    label: "Reviewer name",
    name: "reviewerName",
    placeHolder: "enter your name",
    inputType: "String",
    fieldType: "InputText",
    filter: "filter",
  },
  {
    id: 2,
    label: "Reviewer email",
    name: "reviewerEmail",
    placeHolder: "enter your username",
    inputType: "String",
    fieldType: "InputText",
    filter: "filter",
  },
  {
    id: 3,
    label: "Comment",
    name: "comment",
    placeHolder: "enter your email",
    inputType: "string",
    fieldType: "InputText",
    filter: "filter",
  },
];

export default ReviewFormData;
