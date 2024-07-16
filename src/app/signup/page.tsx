"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Ripple } from "primereact/ripple";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addAdminAsync } from "@/redux/admin/adminSlice";
import { Toast } from "primereact/toast";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(999, "Must be 999 characters or less")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Field must contain both letters and numbers"
    )
    .required("Please provide username"),
  email: Yup.string()
    .required("Please provide an email address")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Field must contain both letters and numbers"
    ),
  password: Yup.string()
    .min(1, "Must be atleast 8 or more")
    .required("please set a storng password")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "must contain both letters and numbers"
    ),
});

const initialValues = {
  // eslint-disable-next-line no-constant-binary-expression
  _id: 0 || null,
  email: "",
  password: "",
  username: "",
};

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<Toast>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await dispatch(addAdminAsync(values)).unwrap();

        if (response && response.success) {
          showToast("success", "Success", "Login successful!");
          router.push("/dashboard");
          resetForm();
        } else {
          throw new Error(response.error || "Login failed");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error logging in:", error);
        showToast("error", "Error", error.message || "Something went wrong!");
      }
    },
  });

  return (
    <div style={{ height: "100vh", backgroundColor: "#abcfed" }}>
      <Toast ref={toast} className="my-1" />
      <div
        style={{
          height: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <ul
          className="px-5"
          style={{
            fontSize: "1.3rem",
            fontWeight: "bold",
            listStyle: "none",
            display: "flex",
          }}
        >
          <li className="nav-item">
            <Link href="/login" className=" nav-link mx-1" aria-current="page">
              <div className="PagesSwitchButtons flex select-none py-2 px-3 justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple">
                Login
                <Ripple />
              </div>
              <Ripple />
            </Link>
          </li>
          <li>
            <Link href="/signup" className=" nav-link mx-2">
              <div className="PagesSwitchButtons flex select-none py-2 px-3 justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple">
                Registration
                <Ripple />
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "35rem",
            width: "30rem",
            borderRadius: "12px",
            backgroundColor: "#ffffff5c",
            boxShadow: "5px 10px 10px rgb(90 80 80 / 26%)",
          }}
          className="px-3 py-5"
        >
          <h1 className="text-center fs-1 my-2 ">Customer registration</h1>

          <form className="row g-3 px-3" onSubmit={formik?.handleSubmit}>
            <div className="col-md-12 form-group">
              <label htmlFor="username">
                Username<span className="text-danger">*</span>
              </label>
              <br />
              <div className="d-flex">
                <div
                  style={{
                    width: "8%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="pi pi-user"
                    style={{
                      paddingRight: "0.5rem",
                      fontSize: "1.2rem",
                      opacity: "50%",
                    }}
                  />
                </div>
                <InputText
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formik?.values?.username}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "92%" }}
                />
              </div>
              <div style={{ paddingLeft: "8%" }}>
                {formik?.touched?.username && formik?.errors?.username ? (
                  <Message
                    className="mt-1"
                    severity="error"
                    text={formik?.errors?.username}
                  />
                ) : null}
              </div>
            </div>

            <div className="col-md-12 form-group">
              <label htmlFor="email">
                Email address<span className="text-danger">*</span>
              </label>
              <br />
              <div className="d-flex">
                <div
                  style={{
                    width: "8%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="pi pi-at"
                    style={{
                      paddingRight: "0.5rem",
                      fontSize: "1.2rem",
                      opacity: "50%",
                    }}
                  />
                </div>
                <InputText
                  id="email"
                  name="email"
                  placeholder="email"
                  value={formik?.values?.email}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "92%" }}
                />
              </div>
              <div style={{ paddingLeft: "8%" }}>
                {formik?.touched?.email && formik?.errors?.email ? (
                  <Message
                    className="mt-1"
                    severity="error"
                    text={formik?.errors?.email}
                  />
                ) : null}
              </div>
            </div>

            <div className="col-md-12 form-group">
              <label htmlFor="password">
                Password<span className="text-danger">*</span>
              </label>
              <br />
              <div className="d-flex">
                <div
                  style={{
                    width: "8%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="pi pi-key"
                    style={{
                      paddingRight: "0.5rem",
                      fontSize: "1.2rem",
                      opacity: "50%",
                    }}
                  />
                </div>
                <InputText
                  id="password"
                  name="password"
                  placeholder="password"
                  value={formik?.values?.password}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "92%" }}
                />
              </div>
              <div style={{ paddingLeft: "8%" }}>
                {formik?.touched?.password && formik?.errors?.password ? (
                  <Message
                    className="mt-1"
                    severity="error"
                    text={formik?.errors?.password}
                  />
                ) : null}
              </div>
            </div>

            <div className="col-md-12">
              <Button
                type="submit"
                label="sign up"
                className="py-2"
                style={{
                  borderRadius: "7px",
                  width: "100%",
                  cursor: "pointer",
                }}
              />
            </div>
          </form>

          <div className="text-center mt-2">
            <span className="text-center text-secondary">
              Already a user? please visit
              <Link
                href="/login"
                className="fw-bold mx-1"
                style={{ color: "#D94926" }}
              >
                Login page
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
