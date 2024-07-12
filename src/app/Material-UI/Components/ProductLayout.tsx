import type { FC } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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

interface ProductLayoutProps {
  product: any;
}

const ProductLayout: FC<ProductLayoutProps> = ({ product }) => {
  console.log("product", product);
  console.log("product reviews", product?.reviews?.length);
  console.log("product rating", product?.rating);

  const averageRating = product?.reviews?.length
    ? product.reviews.reduce(
        (acc: number, review: any) => acc + review.rating,
        0
      ) / product.reviews.length
    : 0;
  console.log("average rating", averageRating);

  return (
    <>
      <Box
        className="p-2"
        style={{ backgroundColor: "#ebebeb", borderRadius: "20px" }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Rating
            name="text-feedback"
            value={averageRating}
            readOnly
            precision={0.5}
            size="small"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Typography
            gutterBottom
            variant="subtitle1"
            style={{ display: "contents" }}
          >
            <span>(</span>
            {product.reviews.length}
            <span>)</span>
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Image
            height="130"
            width="130"
            alt={product.name}
            src={product.image}
          />
          <Box sx={{ pt: 0.5, textAlign: "justify" }}>
            <Typography gutterBottom variant="body1" fontWeight="bold">
              {product?.name && product.name.length > 24
                ? `${product.name.substring(0, 24)}...`
                : product?.name}
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
                variant="body2"
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
                  moment(product?.createdAt).format("Do MMM YY") || "Unknown"
                }`}
              </Typography>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: "black",
                paddingY: "8px",
                textAlign: "justify",
                overflowWrap: "break-word",
              }}
            >
              {product?.description && product.description.length > 79
                ? `${product.description.substring(0, 79)}...`
                : product?.description}
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
                    className="mt-1 mx-1 p-1"
                    variant="outlined"
                    color="info"
                    label={Tag}
                    size="small"
                  />
                ))}
              </Box>
              <Box>
                <Chip
                  className="mt-1 mx-1 p-1"
                  variant="outlined"
                  color="success"
                  label={product?.category}
                  size="small"
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
                className="mt-1 mx-1 p-1"
                variant="outlined"
                color="secondary"
                size="small"
                label={product?.warrantyInformation}
                icon={<ShieldOutlinedIcon />}
              />
              <Chip
                className="mt-1 mx-1 p-1"
                variant="outlined"
                color="secondary"
                size="small"
                label={product?.shippingInformation}
                icon={<LocalShippingOutlinedIcon />}
              />
              <Chip
                className="mt-1 mx-1 p-1"
                variant="outlined"
                color="secondary"
                size="small"
                label={product?.returnPolicy}
                icon={<RotateLeftOutlinedIcon />}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingY: "10px",
                height: "",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CurrencyRupeeOutlinedIcon fontSize="inherit" />
                <Typography
                  variant="body1"
                  fontWeight="bold"
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
                <Typography variant="body1" fontWeight="bold" color="green">
                  {product?.discountPercentage} % Off
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="primary"
            variant="outlined"
            className="mx-1"
            size="small"
            startIcon={<AddShoppingCartIcon />}
          >
            Add to cart
          </Button>
          <Button
            color="success"
            variant="contained"
            className="mx-1"
            size="small"
            startIcon={<ShoppingBagIcon />}
          >
            buy now
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default ProductLayout;
