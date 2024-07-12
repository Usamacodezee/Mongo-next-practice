"use client";
import type { FC } from "react";
import RadioButtonGroup from "./Components/RadioGroup";
import SideDrawer from "./Components/SideDrawer";
import UserFormStepper from "./Components/UserFormStepper";
import DataTable from "./Components/DataTable";
import AvatarComponent from "./Components/AvatarComponent";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <SideDrawer />
      <div className="container pb-4">
        {/* <DatePickerComponent /> */}
        <DataTable />
      </div>
      <div className="container pb-4" style={{display: "flex", justifyContent: "space-around"}}>
        {/* <DatePickerComponent /> */}
        <RadioButtonGroup />
        <AvatarComponent />
      </div>
      <div className="container py-4">
        <UserFormStepper />
      </div>
    </div>
  );
};
export default page;
