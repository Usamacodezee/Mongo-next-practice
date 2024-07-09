"use client";
import type { FC } from "react";
import SkeletonComponent from "./Components/Skeleton";
import RadioButtonGroup from "./Components/RadioGroup";
import SideDrawer from "./Components/SideDrawer";
// import DataTable from "./Components/DataTable";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="px-5">
      <SideDrawer />
      {/* <DataTable /> */}
      <div className="m-5">
        <SkeletonComponent />
      </div>
      <RadioButtonGroup />
    </div>
  );
};
export default page;
