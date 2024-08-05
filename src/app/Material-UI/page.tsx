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
import AutoComplete from "./Components/AutoComplete";
import { ProductTypes } from "../common/ProductFormData";
import axios from "axios";

interface pageProps {}

// eslint-disable-next-line no-empty-pattern
const page: FC<pageProps> = ({}) => {
  const [value, setValue] = React.useState("Products");
  const [Products, setProducts] = React.useState<ProductTypes[]>([]);

  React.useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Failed to fetch product information", error);
      }
    };
    getProductInfo();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const ProductIds = Products.map((product: ProductTypes) => product._id);
  const ProductName = Products.map((product: ProductTypes) => product.name);
  const ProductBrands = Products.map((product: ProductTypes) => product.brand);
  const ProductDiscount = Products.map(
    (product: ProductTypes) => product.discountPercentage
  );
  const ProductCategories = Products.map(
    (product: ProductTypes) => product.category
  );
  const ProductData = [
    {
      name: "Name",
      data: ProductName,
      id: ProductIds,
    },
    {
      name: "Brand",
      data: ProductBrands,
      id: ProductIds,
    },
    {
      name: "Discount Percentage",
      data: ProductDiscount,
      id: ProductIds,
    },
    {
      name: "Category",
      data: ProductCategories,
      id: ProductIds,
    },
  ];

  return (
    <Box>
      <Box className="container py-4 mb-5">
        <SideDrawer />
      </Box>
      <Box
        className="container py-4 pb-4"
        sx={{
          width: "100%",
          height: "100%",
          typography: "body1",
          border: "1px solid gray",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Products list" value="Products" />
              <Tab label="Product Form" value="ProductForm" />
              <Tab label="Extra" value="Extra" />
              <Tab label="Buy Product" value="BuyProduct" />
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
          <TabPanel value="BuyProduct">
            <Box
              className="container pb-4"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                height: "400px",
              }}
            >
              <AutoComplete ProductData={ProductData} />
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
