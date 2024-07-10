"use client";
import type { FC } from "react";
import RadioButtonGroup from "./Components/RadioGroup";
import SideDrawer from "./Components/SideDrawer";
import UserAddForm from "./Components/UserAddForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <SideDrawer />
      <div className="container pb-4">
        <RadioButtonGroup />
        <UserAddForm />
      </div>
    </div>
  );
};
export default page;
