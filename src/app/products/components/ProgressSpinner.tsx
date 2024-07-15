import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

export default function ProgSpinner() {
  return (
    <div
      className="mt-5"
      style={{
        height: "75vh",
        width: "84vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="3"
        fill="var(--surface-ground)"
        animationDuration="1s"
      />
    </div>
  );
}
