/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "primereact/progressbar";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextRequest } from "next/server";
import { Ripple } from "primereact/ripple";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginAdminAsync, logoutAdminAsync } from "@/redux/admin/adminSlice";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import "@/app/globals.css";

const initialValues = {
  password: "",
  email: "",
};

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<Toast>(null);
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };
  const router = useRouter();
  const [PasswordVisible, setPasswordVisible] = React.useState(false);
  const [loading] = React.useState(false);

  useEffect(() => {
    const logout = async () => {
      try {
        await dispatch(logoutAdminAsync());
      } catch (error) {
        console.error("Error adding new product:", error);
      }
    };

    logout();
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(loginAdminAsync(values)).unwrap();

        if (response && response.success) {
          showToast("success", "Success", "Login successful!");
          router.push("/dashboard");
          resetForm();
        } else {
          throw new Error(response.error || "Login failed");
        }
      } catch (error: any) {
        console.error("Error logging in:", error);
        showToast("error", "Error", error.message || "Something went wrong!");
      }
    },
  });

  const HandlePasswordVisibility = () => {
    if (PasswordVisible === true) {
      setPasswordVisible(false);
    } else if (PasswordVisible === false) {
      setPasswordVisible(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#abcfed",
      }}
    >
      <Toast ref={toast} className="my-1" />
      <div className="LoginMainWrapper" style={{ height: "100vh" }}>
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
              <Link
                href="/login"
                className=" PagesSwitchButtons nav-link mx-1"
                aria-current="page"
                style={{ color: "white" }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(13, 40, 67)",
                    borderRadius: "10px",
                  }}
                  className="flex select-none py-2 px-3 justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple"
                >
                  Login
                  <Ripple />
                </div>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="PagesSwitchButtons nav-link mx-2"
                style={{ color: "white" }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(13, 40, 67)",
                    borderRadius: "10px",
                  }}
                  className="flex select-none py-2 px-3 justify-content-center align-items-center shadow-2 border-round p-6 font-bold p-ripple"
                >
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
          <div>
            {loading ? (
              <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
            ) : null}
          </div>
          <div
            style={{
              height: "28rem",
              width: "30rem",
              borderRadius: "12px",
              backgroundColor: "#ffffff5c",
              boxShadow: "5px 10px 10px rgb(90 80 80 / 26%)",
            }}
            className="p-5"
          >
            <h1 className="text-center fs-1 my-3">Login</h1>
            <form className="row g-3 px-3" onSubmit={formik?.handleSubmit}>
              <div className="col-md-12 form-group">
                <label htmlFor="email">
                  Email address<span className="text-danger">*</span>
                </label>
                <br />
                <div className="d-flex">
                  <InputText
                    id="email"
                    name="email"
                    placeholder="email"
                    value={formik?.values?.email}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    className="p-inputtext-lg px-3 py-2"
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </div>
                {formik?.touched?.email && formik?.errors?.email ? (
                  <Message severity="error" text={formik?.errors?.email} />
                ) : null}
              </div>

              <div className="col-md-12 form-group">
                <label htmlFor="password">
                  Password<span className="text-danger">*</span>
                </label>
                <br />
                <div className="d-flex">
                  <InputText
                    id="password"
                    name="password"
                    placeholder="password"
                    type={PasswordVisible ? "text" : "password"}
                    value={formik?.values?.password}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{ width: "92%", borderRadius: "5px" }}
                    className="p-inputtext-lg px-3 py-2"
                  />
                  <div
                    style={{
                      width: "8%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className={`pi pi-${
                        PasswordVisible ? "eye-slash" : "eye"
                      }`}
                      style={{
                        paddingLeft: "0.5rem",
                        fontSize: "1.2rem",
                        opacity: "50%",
                        cursor: "pointer",
                      }}
                      onClick={HandlePasswordVisibility}
                    />
                  </div>
                </div>

                {formik?.touched?.password && formik?.errors?.password ? (
                  <Message severity="error" text={formik?.errors?.password} />
                ) : null}
              </div>

              <div className="col-md-12">
                <Button
                  type="submit"
                  label="login"
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
                New to the site? please visit
                <Link
                  href="/signup"
                  className="fw-bold mx-1"
                  style={{ color: "#D94926" }}
                >
                  Registration page
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
