"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NotFound from "../../../../public/notfound.svg";
import BackArrow from "../../../../public/Backarrow.svg";
import Image from "next/image";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";
import { Button } from "primereact/button";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteUser } from "@/redux/users/userSlice";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import SideBar from "@/app/components/Sidebar";

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const url = `/api/users/${userId}`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error("Failed to fetch user:", response.statusText);
          }
        } else {
          console.warn("No user ID found in query parameters");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const accept = (user: any) => {
    handleDelete(user);
    if (toast.current !== null) {
      (toast.current as any).show({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    }
  };

  const reject = () => {};

  const DeleteConfirmationPopup = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete?",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => accept(user),
      reject,
    });
  };

  const handleDelete = (user: any) => {
    dispatch(deleteUser(user.data._id))
      .unwrap()
      .then(() => {
        router.push("/users");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
    );
  }

  const formattedDate = moment(user?.data?.joiningDate).format("Do MMM YY");
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="d-flex">
      <Toast ref={toast} className="my-1" />

      <div>
        <SideBar />
      </div>
      <div
        className=""
        style={{
          display: "flex",
          height: "100vh",
          width: "85vw",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#939fa9",
        }}
      >
        <ConfirmPopup />
        <div
          className="px-3"
          style={{
            height: "33rem",
            width: "52rem",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <div>
            <Link href="/users">
              <i
                className="pi 
              pi-chevron-circle-left"
                style={{
                  padding: "30px 0px 10px 10px",
                  fontSize: "1.6rem",
                  color: "#1c6ab9",
                }}
              />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ height: "28rem" }}>
              <div>
                <div
                  className="d-flex"
                  style={{ alignItems: "center", height: "70px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="bi-person-circle"
                      style={{
                        padding: "0px 10px 0px 0px",
                        fontSize: "2.7rem",
                        color: "#1c6ab9",
                      }}
                    />
                  </div>
                  <div
                    className="d-flex"
                    style={{ alignItems: "center", flexDirection: "column" }}
                  >
                    <span>
                      <p
                        className="mb-0 fs-2 fw-bold"
                        style={{ color: "#1c6ab9" }}
                      >
                        {user?.data?.name}
                      </p>
                      <h6 className="mb-0 mt-0">{user?.data?.username}</h6>
                    </span>
                  </div>
                </div>
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <div style={{ maxWidth: "60%" }}>
                    <div
                      className="d-flex mb-2"
                      style={{
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        className="mt-3 mb-2 fs-5 fw-bold"
                        style={{ color: "#1c6ab9" }}
                      >
                        Personal Details :
                      </p>
                      <h6 className="d-flex mb-0 pt-1 px-3">
                        <span>Employee name:</span>
                        <span className="d-flex fw-light">
                          <i
                            className="pi pi-id-card mx-2"
                            style={{ fontSize: "1rem", color: "#1c6ab9" }}
                          />
                          <div>
                            <span className="fw-light">
                              {" "}
                              {user?.data?.name}{" "}
                            </span>
                          </div>
                        </span>
                      </h6>
                      <h6 className="mb-0 pt-1 px-3">
                        User name:{" "}
                        <span className="fw-light">
                          <i
                            className="pi pi-user mx-2"
                            style={{ fontSize: "1rem", color: "#1c6ab9" }}
                          />
                          {user?.data?.username}
                        </span>
                      </h6>
                      <h6 className="mb-0 pt-1 px-3">
                        Email Address:{" "}
                        <span className="fw-light">
                          <i
                            className="pi pi-inbox mx-2"
                            style={{ fontSize: "1rem", color: "#1c6ab9" }}
                          />
                          {user?.data?.email}
                        </span>
                      </h6>
                      <h6 className="mb-0 px-3">
                        Contact No:{" "}
                        <span className="fw-light">
                          <i
                            className="pi pi-phone mx-2"
                            style={{ fontSize: "1rem", color: "#1c6ab9" }}
                          />
                          {user?.data?.phone}
                        </span>
                      </h6>
                    </div>
                    <div
                      className="d-flex mb-2"
                      style={{
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        className="mt-3 mb-2 fs-5 fw-bold"
                        style={{ color: "#1c6ab9" }}
                      >
                        job preferences :
                      </p>
                      <h6 className="d-flex mb-0 pt-1 px-3">
                        <span>Preffered locations:</span>
                        <span className="d-flex fw-light">
                          <i
                            className="pi pi-map-marker mx-2"
                            style={{ fontSize: "1rem", color: "#1c6ab9" }}
                          />
                          <div>
                            {user?.data?.PrefferedLocations?.map(
                              (location: any, index: number) => (
                                <span className="fw-light" key={index}>
                                  {" "}
                                  {location}{" "}
                                </span>
                              )
                            )}
                          </div>
                        </span>
                      </h6>
                      <h6 className="d-flex mb-0 px-3">
                        Prefered job type:{" "}
                        <span className="d-flex fw-light">
                          <i
                            className="pi pi-briefcase mx-2"
                            style={{ fontSize: "1rem", color: "#1c6ab9" }}
                          />
                          <div>
                            {user?.data?.PrefferedType?.map(
                              (type: any, index: number) => (
                                <span className="fw-light" key={index}>
                                  {" "}
                                  {type}{" "}
                                </span>
                              )
                            )}
                          </div>
                        </span>
                      </h6>
                    </div>
                  </div>
                  <div
                    className="d-flex mb-2"
                    style={{ alignItems: "baseline", flexDirection: "column" }}
                  >
                    <p
                      className="mt-3 mb-2 fs-5 fw-bold"
                      style={{ color: "#1c6ab9" }}
                    >
                      Job Details :
                    </p>
                    <h6 className="d-flex mb-0 pt-1 px-3">
                      <span>Current role: </span>
                      <span className="d-flex fw-light">
                        <i
                          className="pi pi-linkedin mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        <span>{user?.data?.designation}</span>
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Job type:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-briefcase mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {user?.data?.jobType}
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Salary:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-indian-rupee mx-1"
                          style={{ fontSize: "0.8rem", color: "#1c6ab9" }}
                        />{" "}
                        {user?.data?.salary} /-
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Experience:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-star-fill mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {user?.data?.ExperienceLevel}
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Shift:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-clock mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {user?.data?.shiftTiming}
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      job location:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-map-marker mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {user?.data?.JobLocation}
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Joining date:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-calendar mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {formattedDate}
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Notice period:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-hourglass mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {user?.data?.noticePeriod === true ? "Yes" : "No"}
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Notice period:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-stopwatch mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {user?.data?.NoticePeriodDuration === ""
                          ? "Available right away"
                          : user?.data?.NoticePeriodDuration}
                      </span>
                    </h6>
                    <h6 className="mb-0 px-3">
                      Probation period:{" "}
                      <span className="fw-light">
                        <i
                          className="pi pi-calendar-clock mx-2"
                          style={{ fontSize: "1rem", color: "#1c6ab9" }}
                        />
                        {user?.data?.probationPeriod === true ? "Yes" : "No"}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <div
                className="mt-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  rounded
                  className="mx-1 py-2 px-5"
                  style={{ borderRadius: "5px", backgroundColor: "#921818" }}
                  onClick={(event: any) => DeleteConfirmationPopup(event)}
                >
                  <i
                    className="pi pi-trash mx-2"
                    style={{ fontSize: "1rem", cursor: "pointer" }}
                  />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
