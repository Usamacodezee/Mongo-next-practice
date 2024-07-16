/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCartItem, fetchCartItems } from "@/redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useMemo, useRef } from "react";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import Image from "next/image";
import { Toast } from "primereact/toast";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const toast = useRef<Toast>(null);
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  useEffect(() => {
    dispatch(fetchCartItems())
      .unwrap()
      .then(() => {})
      .catch((err: any) => {
        console.error(err);
      });
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteCartItem(id))
      .unwrap()
      .then(() => {
        showToast("error", "Removed item", "Removed from cart");
        dispatch(fetchCartItems());
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.orderQuantity,
      0
    );
  }, [cart]);

  const itemTemplate = (Cart: any) => {
    return (
      <div className="my-2" style={{ display: "flex", width: "28vw" }}>
        <div>
          <Image src={Cart.image} alt="No Pic" height="100" width="100" />
        </div>
        <div style={{ width: "100%" }}>
          <p className="p-0" style={{ fontSize: "1rem", fontWeight: "500" }}>
            {Cart.name} (x{Cart.quantity})
          </p>
          <div
            className="d-flex px-3"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <div>
              <Rating
                className="p-0"
                style={{ display: "flex", justifyContent: "flex-start" }}
                value={Cart.rating}
                readOnly
                cancel={false}
              />
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag px-2 pt-2" />
                  <span className="font-semibold">{Cart.category}</span>
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                INR {Cart.price} /-
              </p>
              <i
                className="pi pi-trash"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(Cart._id)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} className="my-1" />
      <div className="p-4">
        <h3>Cart Items</h3>
        <DataView value={cart} itemTemplate={itemTemplate} />
        <Button
          className="mt-3 px-3 py-2 d-grid"
          style={{
            backgroundColor: "#339148",
            width: "100%",
            borderRadius: "5px",
          }}
        >
          <span>
            Proceed to buy{" "}
            <span style={{ fontSize: "1.2rem" }}>
              <i
                className="pi pi-indian-rupee"
                style={{ fontSize: "1rem", paddingLeft: "4px" }}
              />
              {totalPrice} /-
            </span>
          </span>{" "}
        </Button>
      </div>
    </>
  );
};

export default Cart;
