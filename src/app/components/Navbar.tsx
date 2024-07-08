"use client";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import Cart from "../products/components/CartComponent";
import { Tooltip } from "primereact/tooltip";
import axios from "axios";
import "@/app/globals.css";
import { fetchCartItems } from "@/redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Sidebar } from "primereact/sidebar";
import ProfileUpdate from "@/app/products/components/ProfileUpdateComponent/ProfileUpdate";
import PasswordUpdate from "@/app/products/components/ProfileUpdateComponent/PasswordUpdate";
import { Menu } from "primereact/menu";

export default function Navbar() {
  const [CartSidebar, setCartSidebar] = useState<boolean>(false);
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const [sidebarContent, setSidebarContent] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const op = useRef<any>(null);
  const menu = useRef<any>(null);

  useEffect(() => {
    const GetUserCredentials = async () => {
      try {
        const res = await axios.get("/api/admin/me");
      } catch (error) {
        console.error("Failed to fetch cart length", error);
      }
    };
    GetUserCredentials();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await dispatch(fetchCartItems());
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };
    fetchCart();
  }, []);

  const items = [
    {
      label: "Profile update",
      items: [
        {
          label: "Update details",
          icon: "pi pi-user-edit",
          command: () => {
            setSidebarContent("updateProfile");
            setVisibleRight(true);
          },
        },
        {
          label: "Change password",
          icon: "pi pi-lock",
          command: () => {
            setSidebarContent("changePassword");
            setVisibleRight(true);
          },
        },
      ],
    },
  ];

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          height: "8vh",
          width: "100%",
          backgroundColor: "rgb(13, 40, 67)",
          display: "flex",
          justifyContent: "end",
          paddingRight: "30px",
        }}
      >
        <div>
          <Button
            id="CartIcon"
            className="CheckOutButton px-2"
            onClick={() => setCartSidebar(true)}
          >
            <i
              className="pi pi-cart-arrow-down px-2"
              style={{
                fontSize: "1.4rem",
                color: "rgb(13, 40, 67)",
                fontWeight: "600",
              }}
            />
            <div style={{ color: "rgb(13, 40, 67)", fontWeight: "600" }}>
              Check out
            </div>
          </Button>
          <Tooltip target="#CartIcon" position="top">
            <p className="p-1 mx-2" style={{ textAlign: "center" }}>
              <i
                className="pi pi-shopping-cart"
                style={{
                  padding: "0px 10px 0px 0px",
                  fontSize: "1rem",
                  color: "white",
                }}
              />
              Check your cart
            </p>
          </Tooltip>
        </div>
        <i
          id="UserEditIcon"
          className="UserEditIcon pi pi-user-edit mx-4"
          onClick={(e) => menu?.current?.toggle(e)}
        />
        <Tooltip target="#UserEditIcon" position="left">
          <p className="p-1 mx-2" style={{ textAlign: "center" }}>
            <i
              className="pi pi-user-edit"
              style={{
                padding: "0px 10px 0px 0px",
                fontSize: "1rem",
                color: "white",
              }}
            />
            Update profile
          </p>
        </Tooltip>
      </nav>
      <Menu
        model={items}
        popup
        ref={menu}
        id="popup_menu"
        className="ProfileOptions w-full px-3"
        style={{ fontSize: "1.1rem", minWidth: "15rem", borderRadius: "150x" }}
      />
      <Sidebar
        visible={CartSidebar}
        position="right"
        style={{ width: "30vw", backgroundColor: "white" }}
        onHide={() => setCartSidebar(false)}
      >
        <Cart />
      </Sidebar>
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "26vw", backgroundColor: "rgb(13, 40, 67)" }}
        onHide={() => setVisibleRight(false)}
      >
        {sidebarContent === "updateProfile" && (
          <ProfileUpdate
            ProfileUpdateVisiblility={() => setVisibleRight(false)}
          />
        )}
        {sidebarContent === "changePassword" && (
          <PasswordUpdate
            PasswordUpdateVisiblility={() => setVisibleRight(false)}
          />
        )}
      </Sidebar>
    </>
  );
}
