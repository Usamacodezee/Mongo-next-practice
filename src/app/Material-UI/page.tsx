"use client";
import type { FC } from "react";
import RadioButtonGroup from "./Components/RadioGroup";
import SideDrawer from "./Components/SideDrawer";
import UserFormStepper from "./Components/UserFormStepper";
import DataTable from "./Components/DataTable";
import AvatarComponent from "./Components/AvatarComponent";
import SnackBarComponent from "./Components/SnackBarComponent";
import React from "react";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ContactUs from "./Components/ContactUs";
import GalleryComponent from "./Components/Gallery";

interface pageProps {}

// eslint-disable-next-line no-empty-pattern
const page: FC<pageProps> = ({}) => {
  const [value, setValue] = React.useState("Products");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box className="container py-4 pb-4">
        <SideDrawer />
      </Box>
      <Box
        className="container py-4 pb-4"
        sx={{ width: "100%", typography: "body1" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Products list" value="Products" />
              <Tab label="Product Form" value="ProductForm" />
              <Tab label="Extra" value="Extra" />
              <Tab label="Contact Us" value="ContactUs" />
              <Tab label="Gallery" value="Gallery" />
            </TabList>
          </Box>
          <TabPanel value="Products">
            <DataTable />
          </TabPanel>
          <TabPanel value="ProductForm">
            <Box className="container py-4">
              <UserFormStepper />
            </Box>
          </TabPanel>
          <TabPanel value="Extra">
            <Box
              className="container pb-4"
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <RadioButtonGroup />
              <AvatarComponent />
              <SnackBarComponent />
            </Box>
          </TabPanel>
          <TabPanel value="ContactUs">
            <Box
              className="container pb-4"
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <ContactUs />
            </Box>
          </TabPanel>
          <TabPanel value="Gallery">
            <Box
              className="Gallery pb-4"
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <GalleryComponent />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
export default page;
