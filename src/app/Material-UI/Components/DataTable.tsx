import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { UserTypes } from "@/app/common/FormData";

export default function DataTable() {
  const [Products, setProducts] = React.useState<UserTypes[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log(res);
        console.log(res.data.data);
        setProducts(res.data.data);
        console.log("product", Products);
      } catch (error) {
        console.error("Failed to fetch product information", error);
        setError("Failed to fetch product information");
      }
    };
    getProductInfo();
  }, []);

  const columns: GridColDef<UserTypes>[] = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Employee Name", width: 150, editable: true },
    { field: "image", headerName: "Image", width: 150, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 160,
      editable: true,
    },
    { field: "category", headerName: "Category", width: 140, editable: true },
    { field: "price", headerName: "Price", width: 120, editable: true },
    {
      field: "discountPercentage",
      headerName: "Discount Percentage",
      width: 120,
    },
    { field: "rating", headerName: "Rating", width: 120 },
    { field: "stock", headerName: "Stock", width: 120 },
    { field: "tags", headerName: "Tags", width: 120 },
    { field: "brand", headerName: "Brand", width: 120 },
    {
      field: "warrantyInformation",
      headerName: "Warranty Information",
      width: 120,
    },
    {
      field: "shippingInformation",
      headerName: "Shipping Information",
      width: 120,
    },
    {
      field: "availabilityStatus",
      headerName: "Availability Status",
      width: 120,
    },
    { field: "returnPolicy", headerName: "Return Policy", width: 160 },
    { field: "reviews.length", headerName: "Reviews", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={Products.map((product: UserTypes) => ({
          ...product,
          id: product._id,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
