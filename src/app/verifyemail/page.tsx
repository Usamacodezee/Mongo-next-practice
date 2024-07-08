"use client";

import axios from "axios";
import Link from "next/link";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/admin/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#abcfed",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "25rem",
          width: "30rem",
          borderRadius: "12px",
          backgroundColor: "#ffffff5c",
          boxShadow: "5px 10px 10px rgb(90 80 80 / 26%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        className="px-3"
      >
        <h1 className="text-center mt-0">Verify Email</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <Button
            label="Click to verify"
            style={{
              width: "10rem",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "white",
              color: "black"
            }}
            onClick={verifyUserEmail}
          />
        </div>
        {verified && (
          <div>
            <h2 className="text-center mt-3">Email Verified</h2>
            <Link
              href="/login"
              className="fw-bold mx-1"
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#D94926",
              }}
            >
              Go to login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 text-black">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
