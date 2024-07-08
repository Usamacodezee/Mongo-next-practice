import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be 1 characters or more")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  username: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(999, "Must be 999 characters or less")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Field must contain both letters and numbers"
    )
    .required("Required"),
  email: Yup.string()
    .min(1, "Must be at least 1 rupee")
    .required("Required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Field must contain both letters and numbers"
    ),
  phone: Yup.number()
    .required("please provide mobile number")
    .test("len", "Phone number must be exactly 10 digits", (val) => {
      if (!val) return false;
      return val.toString().length === 10;
    }),
  designation: Yup.string()
    .min(1, "Must be 1% or more")
    .max(99, "Must be 99% or less")
    .required("please select your designation/position"),
  jobType: Yup.string().required("Please select Job type"),
  JobLocation: Yup.string().required("please select job location"),
  salary: Yup.number()
    .required("please provide salary details")
    .test("len", "please provide income details", (val) => {
      if (!val) return false;
      return Boolean(val.toString().length);
    })
    .transform((value: number | string) => {
      if (typeof value === "string") {
        return Number(value);
      }
      return value;
    }),

  joiningDate: Yup.date()
    .min(new Date("2015-01-01"), "Joining date cannot be before January 1,2015")
    .typeError("Please select a valid date")
    .required("Please select a valid joining date"),
  ExperienceLevel: Yup.string().required("Please select your experience level"),
  shiftTiming: Yup.string().required("Please select your shift timing"),
  noticePeriod: Yup.string().required(
    "Please provide information about your Notice period"
  ),
  probationPeriod: Yup.string().required(
    "Please provide information about your Probation period"
  ),
});

export default validationSchema;
