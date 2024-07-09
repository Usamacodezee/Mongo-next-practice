"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import Image from "next/image";
import moment from "moment";
import { Avatar, Chip, Rating } from "@mui/material";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import MedicationIcon from "@mui/icons-material/Medication";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import StarIcon from "@mui/icons-material/Star";

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   brand: string;
//   price: number;
//   meta?: {
//     createdAt: string;
//   };
// }

interface MediaProps {
  loading?: boolean;
}

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const Media = ({ loading = true }: MediaProps) => {
  const [Products, setProducts] = React.useState<any>({});
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log(res);
        console.log(res.data.data);
        setProducts(res.data.data);
        // console.log("product", Products);
      } catch (error) {
        console.error("Failed to fetch product information", error);
        setError("Failed to fetch product information");
      }
    };
    getProductInfo();
  }, []);

  return (
    <Grid container spacing={2}>
      {loading
        ? Array.from(new Array(3)).map((_, index) => (
            <Grid item key={index} xs={4}>
              <Box sx={{ textAlign: "center" }}>
                <Skeleton variant="rectangular" width={225} height={225} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            </Grid>
          ))
        : Products.length > 0
        ? Products.map((product: any) => (
            <Grid item key={product._id} xs={4}>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Rating
                  name="text-feedback"
                  value={product?.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Typography gutterBottom variant="h6">
                  <span>(</span>
                  {product.reviews.length}
                  <span>)</span>
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Image
                  // style={{ width: 210, height: 118 }}
                  height="225"
                  width="225"
                  alt={product.name}
                  src={product.image}
                />
                <Box sx={{ pt: 0.5, textAlign: "justify" }}>
                  <Typography gutterBottom variant="h6">
                    {product.name}
                  </Typography>

                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      color: "#1098c4",
                      alignItems: "end",
                    }}
                  >
                    <Typography
                      display="block"
                      variant="h6"
                      sx={{ color: "#1098c4" }}
                    >
                      {product.brand}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        color: "black",
                        paddingRight: "30px",
                      }}
                    >
                      <span style={{ color: "#1098c4" }}>Published on -</span>{" "}
                      {`${
                        moment(product?.createdAt).format("Do MMM YY") ||
                        "Unknown"
                      }`}
                    </Typography>
                  </Grid>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "black",
                      paddingTop: "30px",
                      textAlign: "justify",
                    }}
                  >
                    {product?.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      {product?.tags?.map((Tag: any, index: number) => (
                        <Chip
                          key={index}
                          className="mt-2 mx-1 p-1"
                          variant="outlined"
                          color="info"
                          label={Tag}
                        />
                      ))}
                    </Box>
                    <Box>
                      <Chip
                        className="mt-2 mx-1 p-1"
                        variant="outlined"
                        color="success"
                        label={product?.category}
                        icon={
                          product?.category === "Electronics" ? (
                            <LaptopWindowsIcon />
                          ) : product?.category === "Fashion" ? (
                            <DiamondIcon />
                          ) : product?.category === "Home Appliances" ? (
                            <HomeIcon />
                          ) : product?.category === "Health" ? (
                            <MedicationIcon />
                          ) : product?.category === "mens-shirts" ? (
                            <CheckroomIcon />
                          ) : null
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        : null}
      {error && (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}
    </Grid>
  );
};

export default function YouTube() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading={loading} />
    </Box>
  );
}
