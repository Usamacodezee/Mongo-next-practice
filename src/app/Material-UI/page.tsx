"use client";
import type { FC } from "react";
import RadioButtonGroup from "./Components/RadioGroup";
import SideDrawer from "./Components/SideDrawer";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <SideDrawer />
      <div className="container">
        <RadioButtonGroup />
      </div>
    </div>
  );
};
export default page;
