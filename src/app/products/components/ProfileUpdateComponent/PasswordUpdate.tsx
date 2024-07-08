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
import { updatePasswordAsync } from "@/redux/admin/adminSlice";
import { Toast } from "primereact/toast";

interface PasswordUpdateComponentProps {
  PasswordUpdateVisiblility: () => void;
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(999, "Must be 999 characters or less")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Field must contain both letters and numbers"
    )
    .required("Please provide old password"),
  newPassword: Yup.string()
    .min(8, "Must be at least 8 characters or more")
    .required("Please set a strong new password")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Must contain both letters and numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm the new password"),
});

const PasswordUpdateComponent: React.FC<PasswordUpdateComponentProps> = ({
  PasswordUpdateVisiblility,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<any>(null);
  const router = useRouter();
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };
  const [OldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [NewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [userId, setuserID] = useState("");

  const [initialValues, setInitialValues] = useState({
    id: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserCredentials = async () => {
      try {
        const res = await axios.get("/api/admin/me");
        const userId = res?.data?.data?._id;
        setuserID(userId);
        setInitialValues((prevValues) => ({
          ...prevValues,
          id: userId,
        }));
      } catch (error) {
        console.error("Failed to fetch user credentials", error);
      }
    };
    fetchUserCredentials();
  }, []);

  const togglePasswordVisibility = (type: any) => {
    switch (type) {
      case "currentPassword":
        setOldPasswordVisible(!OldPasswordVisible);
        break;
      case "newPassword":
        setNewPasswordVisible(!NewPasswordVisible);
        break;
      case "confirmPassword":
        setConfirmPasswordVisible(!ConfirmPasswordVisible);
        break;
      default:
        break;
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(updatePasswordAsync(values));
        resetForm();
        showToast("success", "Success", "Password changed successfully");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        PasswordUpdateVisiblility();
      } catch (error) {
        console.error("Error updating password:", error);
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
            Change Password
          </h1>

          <form onSubmit={formik.handleSubmit} className="row g-3 px-3">
            <div className="col-md-12 form-group">
              <label
                htmlFor="currentPassword"
                className="fs-5"
                style={{ color: "#73c1ff" }}
              >
                Old Password <span className="text-danger">*</span>
              </label>
              <div className="d-flex mt-2">
                <InputText
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter current password"
                  type={OldPasswordVisible ? "text" : "password"}
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "90%", borderRadius: "15px" }}
                />
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className={`pi pi-${
                      OldPasswordVisible ? "eye-slash" : "eye"
                    }`}
                    style={{
                      cursor: "pointer",
                      opacity: "50%",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => togglePasswordVisibility("currentPassword")}
                  />
                </div>
              </div>
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <Message
                  severity="error"
                  className="mt-1"
                  text={formik.errors.currentPassword}
                />
              ) : null}
            </div>

            <div className="col-md-12 form-group">
              <label
                htmlFor="newPassword"
                className="fs-5"
                style={{ color: "#73c1ff" }}
              >
                New Password <span className="text-danger">*</span>
              </label>
              <div className="d-flex mt-2">
                <InputText
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  type={NewPasswordVisible ? "text" : "password"}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "90%", borderRadius: "15px" }}
                />
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className={`pi pi-${
                      NewPasswordVisible ? "eye-slash" : "eye"
                    }`}
                    style={{
                      cursor: "pointer",
                      opacity: "50%",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => togglePasswordVisibility("newPassword")}
                  />
                </div>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <Message
                  severity="error"
                  className="mt-1"
                  text={formik.errors.newPassword}
                />
              ) : null}
            </div>

            <div className="col-md-12 form-group">
              <label
                htmlFor="ConfirmPassword"
                className="fs-5"
                style={{ color: "#73c1ff" }}
              >
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="d-flex mt-2">
                <InputText
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  type={ConfirmPasswordVisible ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-inputtext-lg px-3 py-2"
                  style={{ width: "90%", borderRadius: "15px" }}
                />
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className={`pi pi-${
                      ConfirmPasswordVisible ? "eye-slash" : "eye"
                    }`}
                    style={{
                      cursor: "pointer",
                      opacity: "50%",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  />
                </div>
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Message
                  severity="error"
                  className="mt-1"
                  text={formik.errors.confirmPassword}
                />
              ) : null}
            </div>

            <div className="col-md-12 form-group d-flex justify-content-center align-items-center">
              <Button
                id="ChangePasswordButton"
                type="submit"
                label="Update"
                className="p-button-rounded p-button-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdateComponent;
