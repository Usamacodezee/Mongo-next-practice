"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutAdminAsync } from "@/redux/admin/adminSlice";
import { Tooltip } from "primereact/tooltip";
import "@/app/globals.css";
import { TagsOptions } from "../common/ProductFormData";

export const LinksOptions = [
  { name: "dashboard" },
  { name: "products" },
  { name: "users" },
  { name: "custom-filter" },
];

export default function SideBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  useEffect(() => {
    const GetUserCredentials = async () => {
      try {
        const res = await axios.get("/api/admin/me");
        setUserName(res.data.data.username);
        setUserEmail(res.data.data.email);
      } catch (error) {
        console.error("failed to fetch user credentials", error);
      }
    };
    GetUserCredentials();
  }, []);

  const logout = async () => {
    try {
      await dispatch(logoutAdminAsync());
      showToast("success", "Success", "logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error adding new product:", error);
      showToast("error", "Error", "Failed to add product");
    }
  };

  return (
    <>
      <Toast ref={toast} className="my-1" />
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-light"
        style={{
          width: "15vw",
          height: "100%",
          backgroundColor: "rgb(13, 40, 67)",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <span className="SideBarLinks text-center SideBarHeading">
                Mongo
              </span>
            </Link>
          </div>
          <hr />
          <ul
            className="nav nav-pills flex-column mb-auto SideBarLinks"
            style={{ fontSize: "1.1rem" }}
          >
            {LinksOptions.map((Tag, index) => (
              <li className="nav-item" key={index}>
                <Link
                  href={`/${Tag.name}`}
                  className="nav-link"
                  aria-current="page"
                >
                  <span className="SideBarLinks">
                    <i
                      className={`pi ${
                        Tag.name === "dashboard"
                          ? "pi-home"
                          : Tag.name === "products"
                          ? "pi-list"
                          : Tag.name === "users"
                          ? "pi-users"
                          : Tag.name === "custom-filter"
                          ? "pi-filter"
                          : null
                      }`}
                      style={{ fontSize: "1rem", paddingRight: "20px" }}
                    />
                    {Tag.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <hr />
          <div className="dropdown">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div id="LoggedInUserDetails" className="d-flex">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="pi pi-user mx-2"
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  />
                </div>
                <div>
                  <div
                    className="mt-3"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span>
                      <strong>{UserName || UserEmail}</strong>
                      <p style={{ fontWeight: "60", fontSize: "0.9rem" }}>
                        {UserEmail || ""}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <Tooltip target="#LoggedInUserDetails" position="top">
                <p className="p-1 mx-2" style={{ textAlign: "center" }}>
                  <i
                    className="pi pi-info-circle"
                    style={{
                      padding: "0px 10px 0px 0px",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  />
                  Admin details
                </p>
              </Tooltip>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  id="SignOutIcon"
                  className="pi pi-sign-out mx-2"
                  onClick={logout}
                />
                <Tooltip target="#SignOutIcon" position="top">
                  <p className="p-1 mx-2" style={{ textAlign: "center" }}>
                    <i
                      className="pi pi-sign-out"
                      style={{
                        padding: "0px 10px 0px 0px",
                        fontSize: "1rem",
                        color: "white",
                      }}
                    />
                    Log out
                  </p>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
