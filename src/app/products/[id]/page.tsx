"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NotFound from "../../../../public/notfound.svg";
import BackArrow from "../../../../public/Backarrow.svg";
import ShoppingIcon from "../../../../public/shopping-cart-svgrepo-com.svg";
import CartIcon from "../../../../public/cart-3-svgrepo-com.svg";
import Image from "next/image";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chip } from "primereact/chip";
import { Rating } from "primereact/rating";
import Link from "next/link";
import { Button } from "primereact/button";
import SideBar from "@/app/components/Sidebar";
import { Card } from "primereact/card";
import "@/app/globals.css";

const ProductDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const url = `/api/products/${productId}`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          } else {
            console.error("Failed to fetch product:", response.statusText);
          }
        } else {
          console.warn("No product ID found in query parameters");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideBar />
      </div>
      {loading ? (
        <div
          className="px-3"
          style={{
            height: "100vh",
            width: "85vw",
            backgroundColor: "white",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <div
          className=""
          style={{
            display: "flex",
            height: "100vh",
            width: "85vw",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#abcfed",
          }}
        >
          <div
            className="px-2"
            style={{
              height: "42rem",
              width: "60rem",
              backgroundColor: "rgb(13, 40, 67)",
              color: "abcfed",
              borderRadius: "20px",
            }}
          >
            <div>
              <Link href="/products">
                <Image
                  className="mx-3 mt-4"
                  src={BackArrow}
                  alt={NotFound}
                  height="35"
                  width="35"
                />
              </Link>
            </div>
            <div>
              <p
                className="my-3 mx-3"
                style={{
                  fontSize: "2rem",
                  fontWeight: "normal",
                  color: "#abcfed",
                }}
              >
                {product?.data?.name}
              </p>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Card
                className="mx-3"
                style={{
                  borderRadius: "5px 20px",
                  boxShadow: "5px 5px 10px rgb(171 207 237 / 30%)",
                }}
              >
                <div>
                  <Image
                    src={product.data.image}
                    alt={NotFound}
                    height="500"
                    width="400"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Card>
              <div style={{ height: "100%" }}>
                <div>
                  <span
                    className="d-flex px-5"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      value={product?.data?.rating}
                      style={{ color: "#abcfed" }}
                      readOnly
                      cancel={false}
                    />
                    <span
                      className="d-flex"
                      style={{ fontSize: "1.2rem", color: "#abcfed" }}
                    >
                      (<p className="mb-1">{product?.data?.reviews?.length}</p>)
                    </span>
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                    }}
                  >
                    <div className="d-flex">
                      <i
                        className="pi pi-bookmark px-1"
                        style={{
                          fontSize: "1rem",
                          color: "#abcfed",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p
                          className=" pt-3"
                          style={{ fontSize: "1.1rem", color: "#abcfed" }}
                        >
                          {product?.data?.brand}
                        </p>
                      </div>
                    </div>
                    <div
                      className="d-flex mb-2"
                      style={{ alignItems: "baseline" }}
                    >
                      <h6
                        style={{
                          fontSize: "1rem",
                          color: "#abcfed",
                        }}
                      >
                        Category :
                      </h6>
                      <Chip
                        label={product?.data?.category}
                        icon={
                          product?.data?.category === "Electronics"
                            ? "pi pi-desktop"
                            : product?.data?.category === "Fashion"
                            ? "pi pi-tag"
                            : product?.data?.category === "Home Appliances"
                            ? "pi pi-cog"
                            : null
                        }
                        className="mx-2"
                        style={{
                          fontSize: "0.9rem",
                          backgroundColor: "#abcfed",
                          opacity: "0.8",
                          color: "rgb(13, 40, 67)",
                          padding: "5px 16px",
                          borderRadius: "25px",
                        }}
                      ></Chip>
                    </div>
                  </div>
                </div>
                <h6
                  className="mb-4"
                  style={{
                    fontSize: "1rem",
                    textAlign: "justify",
                    color: "#abcfed",
                  }}
                >
                  {product?.data?.description}
                </h6>
                <div className="d-flex mb-2" style={{ alignItems: "baseline" }}>
                  <h6 style={{ fontSize: "1rem", color: "#abcfed" }}>
                    Stock :
                  </h6>
                  <Chip
                    icon="pi pi-box"
                    label={product?.data?.stock}
                    className="mx-2"
                    style={{
                      fontSize: "0.9rem",
                      backgroundColor: "#abcfed",
                      opacity: "0.8",
                      color: "rgb(13, 40, 67)",
                      padding: "5px 16px",
                      borderRadius: "25px",
                    }}
                  />
                </div>
                <h6 style={{ fontSize: "1rem", color: "#abcfed" }}>Tags :</h6>
                <div
                  className="d-flex mb-2"
                  style={{ alignItems: "baseline", color: "#abcfed" }}
                >
                  {product?.data?.tags?.map((tags: any, index: number) => (
                    <Chip
                      key={index}
                      className="mx-2"
                      style={{
                        fontSize: "0.9rem",
                        backgroundColor: "#abcfed",
                        opacity: "0.8",
                        color: "rgb(13, 40, 67)",
                        padding: "5px 16px",
                        borderRadius: "25px",
                      }}
                      label={tags}
                    />
                  ))}
                </div>
                <h6 style={{ fontSize: "0.9rem", color: "#abcfed" }}>
                  Information :
                </h6>
                <div className="d-flex mb-2" style={{ alignItems: "baseline" }}>
                  <Chip
                    icon="pi pi-shield"
                    className="mx-2"
                    style={{
                      fontSize: "0.9rem",
                      backgroundColor: "#abcfed",
                      opacity: "0.8",
                      color: "rgb(13, 40, 67)",
                      padding: "5px 16px",
                      borderRadius: "25px",
                    }}
                    label={product?.data?.warrantyInformation}
                  />
                  <Chip
                    icon="pi pi-undo"
                    className="mx-2"
                    style={{
                      fontSize: "0.9rem",
                      backgroundColor: "#abcfed",
                      opacity: "0.8",
                      color: "rgb(13, 40, 67)",
                      padding: "5px 16px",
                      borderRadius: "25px",
                    }}
                    label={product?.data?.returnPolicy}
                  />
                  <Chip
                    icon="pi pi-truck"
                    className="mx-2"
                    style={{
                      fontSize: "0.9rem",
                      backgroundColor: "#abcfed",
                      opacity: "0.8",
                      color: "rgb(13, 40, 67)",
                      padding: "5px 16px",
                      borderRadius: "25px",
                    }}
                    label={product?.data?.shippingInformation}
                  />
                </div>
                <div className="d-flex">
                  <div
                    className="d-flex mb-2"
                    style={{ alignItems: "baseline" }}
                  >
                    <p className="mt-3 mb-0 fs-4 text-secondary">
                      {" "}
                      <i
                        className="pi pi-indian-rupee fw-bold px-1"
                        style={{ fontSize: "1rem", color: "#abcfed" }}
                      />
                      <span
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "bold",
                          color: "#abcfed",
                        }}
                      >
                        {(
                          product?.data?.price -
                          (product?.data?.price *
                            product?.data?.discountPercentage) /
                            100
                        ).toFixed(2)}
                        &nbsp;
                      </span>
                    </p>
                    <s
                      className="mb-0 mt-3"
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#f14e4ed",
                      }}
                    >
                      <i
                        className="pi pi-indian-rupee fw-bold px-1"
                        style={{ fontSize: "0.7rem" }}
                      />
                      {product?.data?.price}{" "}
                    </s>
                    <p
                      className="mt-3 mb-0"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#689f38",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;{product?.data?.discountPercentage} %
                      Off
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    rounded
                    severity="success"
                    className="mx-1 py-2 px-5"
                    style={{ borderRadius: "5px" }}
                  >
                    <Image
                      className="mx-2"
                      src={ShoppingIcon}
                      alt={NotFound}
                      height="25"
                      width="25"
                    />
                    Buy now
                  </Button>
                  <Button
                    rounded
                    severity="info"
                    className="mx-1 py-2 px-5"
                    style={{ borderRadius: "5px" }}
                  >
                    <Image
                      className="mx-2"
                      src={CartIcon}
                      alt={NotFound}
                      height="25"
                      width="25"
                    />
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
