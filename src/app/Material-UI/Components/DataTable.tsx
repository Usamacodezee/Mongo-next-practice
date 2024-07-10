"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import Image from "next/image";
import moment from "moment";
import { Button, Chip, Divider, Rating } from "@mui/material";
import "@/app/CSS/custom.css";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import MedicationIcon from "@mui/icons-material/Medication";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import StarIcon from "@mui/icons-material/Star";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EventIcon from "@mui/icons-material/Event";

interface MediaProps {
  loading?: boolean;
}

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
    <>
      <Typography gutterBottom variant="h3">
        Products
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item key={index} xs={12} sm={12} md={3} lg={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      pt: 0.5,
                      justifyContent: "end",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton animation="wave" width="15%" />
                  </Box>
                  <Box
                    sx={{
                      pt: 0.5,
                      justifyContent: "initial",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={305}
                      height={305}
                      sx={{ borderRadius: "25px" }}
                    />
                  </Box>
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton className="py-2" animation="wave" width="90%" />
                    <Box
                      sx={{
                        pt: 2,
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton animation="wave" width="15%" />
                      <Skeleton animation="wave" width="40%" />
                    </Box>
                    <Box
                      sx={{
                        pt: 2,
                      }}
                    >
                      <Skeleton animation="wave" width="100%" />
                      <Skeleton animation="wave" width="100%" />
                      <Skeleton animation="wave" width="80%" />
                    </Box>
                    <Box
                      sx={{
                        pt: 1,
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Skeleton animation="wave" width="60%" />
                      <Skeleton animation="wave" width="15%" />
                    </Box>
                    <Box
                      sx={{
                        pt: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton className="mx-1" animation="wave" width="20%" />
                      <Skeleton className="mx-1" animation="wave" width="20%" />
                      <Skeleton className="mx-1" animation="wave" width="20%" />
                    </Box>
                    <Box
                      sx={{
                        pt: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton className="py-3" animation="wave" width="40%" />
                      <Skeleton className="py-3" animation="wave" width="30%" />
                    </Box>
                    <Box
                      sx={{
                        pt: 1,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton className="py-3" animation="wave" width="25%" />
                      <Skeleton className="py-3" animation="wave" width="25%" />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          : Products.length > 0
          ? Products.map((product: any) => (
              <Grid
                item
                key={product._id}
                container
                xs={12}
                sm={12}
                md={4}
                lg={3}
                className="my-2"
              >
                <Box
                  className="p-3"
                  style={{ backgroundColor: "#ebebeb", borderRadius: "20px" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Rating
                      name="text-feedback"
                      value={product?.rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Typography
                      gutterBottom
                      variant="body1"
                      style={{ display: "contents" }}
                    >
                      <span>(</span>
                      {product.reviews.length}
                      <span>)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Image
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
                          <span style={{ color: "#1098c4" }}>
                            Published on -
                          </span>{" "}
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
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
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
                              ) : undefined
                            }
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Chip
                          className="mt-3 mx-1 p-1"
                          variant="outlined"
                          color="secondary"
                          label={product?.warrantyInformation}
                          icon={<ShieldOutlinedIcon />}
                        />
                        <Chip
                          className="mt-3 mx-1 p-1"
                          variant="outlined"
                          color="secondary"
                          label={product?.shippingInformation}
                          icon={<LocalShippingOutlinedIcon />}
                        />
                        <Chip
                          className="mt-3 mx-1 p-1"
                          variant="outlined"
                          color="secondary"
                          label={product?.returnPolicy}
                          icon={<RotateLeftOutlinedIcon />}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "30px",
                          height: "",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CurrencyRupeeOutlinedIcon fontSize="large" />
                          <Typography
                            variant="h4"
                            color="text.secondary"
                            sx={{
                              color: "black",
                            }}
                          >
                            {product?.price} /-
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h4" color="green">
                            {product?.discountPercentage} % Off
                          </Typography>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      className="mx-1"
                      size="large"
                      startIcon={<AddShoppingCartIcon />}
                    >
                      Add to cart
                    </Button>
                    <Button
                      color="success"
                      variant="contained"
                      className="mx-1"
                      size="large"
                      startIcon={<ShoppingBagIcon />}
                    >
                      buy now
                    </Button>
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
    </>
  );
};

export default function SkeletonComponent() {
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
