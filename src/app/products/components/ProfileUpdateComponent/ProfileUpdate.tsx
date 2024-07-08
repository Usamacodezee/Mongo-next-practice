"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateAdminAsync } from "@/redux/admin/adminSlice";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";

interface ProfileUpdateComponentProps {
  ProfileUpdateVisiblility: () => void;
}

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
    .min(8, "Must be at least 8 characters or more")
    .required("Please set a strong password")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Must contain both letters and numbers"
    ),
});

const ProfileUpdateComponent: React.FC<ProfileUpdateComponentProps> = ({
  ProfileUpdateVisiblility,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<Toast>(null);
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };
  const router = useRouter();
  const [updatableAdminData, setUpdatableData] = useState({
    _id: 0 || null || "",
    username: "",
    email: "",
    isVerified: false,
    isAdmin: false,
  });

  useEffect(() => {
    const GetUserCredentials = async () => {
      try {
        const res = await axios.get("/api/admin/me");
        setUpdatableData({ ...res.data.data });
      } catch (error) {
        console.error("Failed to fetch user credentials", error);
      }
    };
    GetUserCredentials();
  }, []);

  const formik = useFormik({
    initialValues: updatableAdminData,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(updateAdminAsync(values));
        resetForm();
        showToast("success", "Success", "Successfully updated the profile!");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        ProfileUpdateVisiblility();
      } catch (error) {
        console.error("Error updating admin details:", error);
        showToast("error", "Error", "Failed to update admin details");
      }
    },
  });

  return (
    <div style={{ height: "95vh", backgroundColor: "rgb(13, 40, 67)" }}>
      <Toast ref={toast} className="my-1" />
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
            height: "45rem",
            width: "30rem",
            borderRadius: "12px",
            backgroundColor: "rgb(13, 40, 67)",
            color: "white",
          }}
          className="px-3 py-5 mx-1"
        >
          <h1
            className="text-center fs-1 pt-5 pb-3"
            style={{ color: "#73c1ff" }}
          >
            Update admin details
          </h1>

          <form className="row g-3 px-3" onSubmit={formik.handleSubmit}>
            <div className="col-md-12 form-group">
              <label
                style={{ color: "#73c1ff" }}
                htmlFor="username"
                className="fs-5"
              >
                User id <span className="text-danger">*</span>
              </label>
              <br />
              <div className="d-flex mt-2">
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="pi pi-id-card"
                    style={{
                      paddingRight: "0.5rem",
                      fontSize: "1.5rem",
                      opacity: "70%",
                    }}
                  />
                </div>
                <InputText
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formik.values._id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{
                    width: "90%",
                    pointerEvents: "none",
                    opacity: "0.8",
                    borderRadius: "15px",
                  }}
                />
              </div>
              <div style={{ paddingLeft: "8%" }}>
                {formik.touched.username && formik.errors.username ? (
                  <Message
                    className="mt-1"
                    severity="error"
                    text={formik.errors.username}
                  />
                ) : null}
              </div>
            </div>

            <div className="col-md-12 form-group">
              <label
                style={{ color: "#73c1ff" }}
                htmlFor="username"
                className="fs-5"
              >
                Username <span className="text-danger">*</span>
              </label>
              <br />
              <div className="d-flex mt-2">
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="pi pi-user"
                    style={{
                      paddingRight: "0.5rem",
                      fontSize: "1.5rem",
                      opacity: "70%",
                    }}
                  />
                </div>
                <InputText
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "90%", borderRadius: "15px" }}
                />
              </div>
              <div style={{ paddingLeft: "8%" }}>
                {formik.touched.username && formik.errors.username ? (
                  <Message
                    className="mt-1"
                    severity="error"
                    text={formik.errors.username}
                  />
                ) : null}
              </div>
            </div>

            <div className="col-md-12 form-group">
              <label
                style={{ color: "#73c1ff" }}
                htmlFor="email"
                className="fs-5"
              >
                Email address <span className="text-danger">*</span>
              </label>
              <br />
              <div className="d-flex mt-2">
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="pi pi-at"
                    style={{
                      paddingRight: "0.5rem",
                      fontSize: "1.5rem",
                      opacity: "70%",
                    }}
                  />
                </div>
                <InputText
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "90%", borderRadius: "15px" }}
                />
              </div>
              <div style={{ paddingLeft: "8%" }}>
                {formik.touched.email && formik.errors.email ? (
                  <Message
                    className="mt-1"
                    severity="error"
                    text={formik.errors.email}
                  />
                ) : null}
              </div>
            </div>

            <div
              className="flex align-items-center pt-4"
              style={{
                display: "flex",
                color: "white",
                pointerEvents: "none",
                opacity: "0.8",
              }}
            >
              <div>
                <Checkbox checked></Checkbox>
              </div>
              <label className="ml-2 px-3 fs-5" style={{ color: "#73c1ff" }}>
                {formik.values.isVerified === false
                  ? null
                  : "Email verification completed"}
              </label>
            </div>

            <div
              className="flex align-items-center"
              style={{
                display: "flex",
                color: "white",
                pointerEvents: "none",
                opacity: "0.8",
              }}
            >
              <div>
                <Checkbox checked></Checkbox>
              </div>
              <label className="ml-2 px-3 fs-5" style={{ color: "#73c1ff" }}>
                {formik.values.isAdmin === false ? "Not An Admin" : "Admin"}
              </label>
            </div>

            <div className="col-md-12 mt-5">
              <Button
                id="AdminUpdateButton"
                type="submit"
                label="Update details"
                className="py-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateComponent;
