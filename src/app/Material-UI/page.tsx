"use client";
import type { FC } from "react";
import RadioButtonGroup from "./Components/RadioGroup";
import SideDrawer from "./Components/SideDrawer";
import UserFormStepper from "./Components/UserFormStepper";
import DataTable from "./Components/DataTable";
import AvatarComponent from "./Components/AvatarComponent";
import SnackBarComponent from "./Components/SnackBarComponent";
import React from "react";

interface pageProps {}

// eslint-disable-next-line no-empty-pattern
const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <div className="container py-4 pb-4">
        <SideDrawer />
        <DataTable />
      </div>
      <div
        className="container pb-4"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <RadioButtonGroup />
        <AvatarComponent />
        <SnackBarComponent />
      </div>
      <div className="container py-4">
        <UserFormStepper />
      </div>
    </div>
  );
};
export default page;
