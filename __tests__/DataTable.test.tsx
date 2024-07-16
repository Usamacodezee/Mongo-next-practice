import React from "react";
import DataTable from "@/app/Material-UI/Components/DataTable";
import { ProductTypes } from "@/app/common/ProductFormData";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import { rest } from "msw";

jest.mock("axios");

const mockProducts: ProductTypes[] = [
  {
    _id: 0,
    name: "Product 1",
    description: "Description 1",
    category: "Category 1",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 100,
    tags: ["tag 1", "tag 2"],
    brand: "Brand 1",
    sku: "RCH45Q1A",
    weight: 2,
    warrantyInformation: "3 years",
    shippingInformation: "10 days",
    availabilityStatus: "in stock",
    returnPolicy: "7 days return",
    orderQuantity: 0,
    reviews: [],
    meta: {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9hPmDBJK2cPU-FuJeGBBeqnK6pL8TwpuL2Q&s",
  },
];

describe("Product - Rendering", () => {
  it("should have the text anson", async () => {
    render(<DataTable />);
    expect(await screen.findByText("anson")).toBeInTheDocument();
    expect(screen.queryByText("No Users")).not.toBeInTheDocument();
  });

  it("should have username Product 1 rendered", async () => {
    server.use(
      rest.get("/api/products", (req, res, ctx) => {
        return res(ctx.json(mockProducts));
      })
    );
    render(<DataTable />);
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
  });
});
