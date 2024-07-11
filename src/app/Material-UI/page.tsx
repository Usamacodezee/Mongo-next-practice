"use client";
import type { FC } from "react";
import RadioButtonGroup from "./Components/RadioGroup";
import SideDrawer from "./Components/SideDrawer";
import UserFormStepper from "./Components/UserFormStepper";
// import DatePickerComponent from "./Components/ProgressBar"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <SideDrawer />
      <div className="container pb-4">
        {/* <DatePickerComponent /> */}
        <RadioButtonGroup />
      </div>
      <div className="container py-4">
        <UserFormStepper />
      </div>
    </div>
  );
};
export default page;
