/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import ProductFormData, {
  AvailabilityOptions,
  CategoryOptions,
  ProductTypes,
} from "@/app/common/ProductFormData";
import { addCartItem } from "@/redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FilterMatchMode } from "primereact/api";
import NotFound from "../../../../public/notfound.svg";
// import Image from "next/image";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { Tag } from "primereact/tag";
import { Rating } from "primereact/rating";
import { Dropdown } from "primereact/dropdown";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import { Badge } from "primereact/badge";
import { Tooltip } from "primereact/tooltip";
import axios from "axios";
import { Toast } from "primereact/toast";
import "@/app/globals.css";
import { CartItemTypes } from "@/app/common/CartItemData";
import { Image } from "primereact/image";

interface FilterType extends DataTableFilterMeta {}

interface DataTableComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loading: true | false;
  fetchData: () => void;
  setLoadingOff: () => void;
  setLoadingOn: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HandleUpdateRecord: (rowData: ProductTypes) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDeleteModal: (rowData: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProductToReview: (reviews: any, e: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultFilters: any = {
  global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  availabilityStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
  category: { value: null, matchMode: FilterMatchMode.EQUALS },
  brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
};

const DataTableComponent: React.FC<DataTableComponentProps> = ({
  loading,
  fetchData,
  setLoadingOff,
  setLoadingOn,
  HandleUpdateRecord,
  handleDeleteModal,
  handleProductToReview,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dt = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const op = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);
  const [filters, setFilters] = useState<FilterType>(
    DefaultFilters as FilterType
  );
  const [LoggedUserId, setLoggedUserId] = useState("");
  const UserIdOfCartOwner = LoggedUserId;
  // console.log("user id", UserIdOfCartOwner);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [overlayProduct, setOverlayProduct] = useState<any>(null);

  const toast = useRef<Toast>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };
    (_filters["global"] as DataTableFilterMetaData).value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    const GetUserCredentials = async () => {
      try {
        const res = await axios.get("/api/admin/me");
        setLoggedUserId(res.data.data._id);
      } catch (error) {
        console.error("Failed to fetch user credentials", error);
      }
    };
    GetUserCredentials();
  }, []);

  const handleAddItemToCart = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowData: any,
    UserIdOfCartOwner: number | string
  ) => {
    const newCartItem: CartItemTypes = {
      // eslint-disable-next-line no-constant-binary-expression
      _id: 0 || null,
      ProductId: rowData._id,
      name: rowData.name,
      description: rowData.description,
      category: rowData.category,
      price: rowData.price,
      discountPercentage: rowData.discountPercentage,
      rating: rowData.rating,
      stock: rowData.stock,
      tags: rowData.tags,
      brand: rowData.brand,
      sku: rowData.sku,
      weight: rowData.weight,
      warrantyInformation: rowData.warrantyInformation,
      shippingInformation: rowData.shippingInformation,
      availabilityStatus: rowData.availabilityStatus,
      returnPolicy: rowData.returnPolicy,
      orderQuantity: rowData.orderQuantity,
      meta: {
        UserData: UserIdOfCartOwner,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      image: rowData.image,
    };
    // console.log("product to be added to cart", newCartItem);
    dispatch(addCartItem({ newCartItem, UserData: UserIdOfCartOwner }))
      .unwrap()
      .then(() => {
        showToast("success", "Success", "Added to cart");
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.error("Error adding item to cart:", error);
        showToast("error", "Error", "Failed to add item to cart");
      });
  };

  const renderHeader = () => {
    return (
      <div className="mt-1">
        <div className="d-flex px-3" style={{ justifyContent: "flex-end" }}>
          <div className="d-flex my-1" style={{ justifyContent: "flex-end" }}>
            <IconField iconPosition="left" className="m-1">
              <InputText
                value={globalFilterValue}
                style={{ height: "3rem", width: "15rem", borderRadius: "10px" }}
                className="px-3"
                onChange={onGlobalFilterChange}
                placeholder="Keyword Search"
              />
            </IconField>
          </div>
        </div>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ActionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <div className="d-flex mb-2">
          <div>
            <i
              id="ReviewsIconMain"
              className="pi pi-comments p-overlay-badge ReviewsIconMain mx-3"
              onClick={(e) => {
                const reviews = rowData;
                handleProductToReview(reviews, e);
              }}
            >
              {rowData.reviews && rowData.reviews.length > 0 ? (
                <Badge
                  value={
                    rowData.reviews.length < 100
                      ? rowData.reviews.length
                      : "99+"
                  }
                  severity="danger"
                />
              ) : null}
            </i>
            <Tooltip target="#ReviewsIconMain" position="top">
              <p className="p-1 mx-2">
                <i
                  className="pi pi-comments"
                  style={{
                    padding: "0px 10px 0px 0px",
                    fontSize: "1rem",
                    color: "white",
                  }}
                />
                reviews
              </p>
            </Tooltip>
          </div>
          <div>
            <i
              id="EditIconMain"
              className="pi pi-pen-to-square mx-2 EditIconMain"
              onClick={() => HandleUpdateRecord(rowData)}
            />
            <Tooltip target="#EditIconMain" position="top">
              <p className="p-1 mx-2">
                <i
                  className="pi pi-file-edit"
                  style={{
                    padding: "0px 10px 0px 0px",
                    fontSize: "1rem",
                    color: "white",
                  }}
                />
                edit product
              </p>
            </Tooltip>
          </div>
          <div>
            <i
              id="DeleteIconMain"
              className="pi pi-trash mx-2 DeleteIconMain"
              onClick={() => {
                handleDeleteModal(rowData);
              }}
            />
            <Tooltip target="#DeleteIconMain" position="top">
              <p className="p-1 mx-2">
                <i
                  className="pi pi-eraser"
                  style={{
                    padding: "0px 10px 0px 0px",
                    fontSize: "1rem",
                    color: "white",
                  }}
                />
                delete product
              </p>
            </Tooltip>
          </div>
        </div>
      </React.Fragment>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PurchaseBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <div
          className="py-1 px-2"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Button
            className="CartButton my-2 px-2"
            onClick={() => handleAddItemToCart(rowData, UserIdOfCartOwner)}
          >
            <i className="pi pi-cart-plus p-2" />
            Add to cart
          </Button>
          <Button className="PurchaseButton my-2">
            <Link
              href="/app/cart"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                alignItems: "center",
              }}
            >
              <i className="pi pi-shopping-bag p-2" />
              Purchase now
            </Link>
          </Button>
        </div>
      </React.Fragment>
    );
  };

  const AvailabilityRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={AvailabilityOptions}
        onChange={(e: MultiSelectChangeEvent) => {
          const selectedValues = e.value.name;

          setFilters((prevFilters) => ({
            ...prevFilters,
            jobType: {
              ...prevFilters.designation,
              value: selectedValues,
            },
          }));

          options.filterApplyCallback(selectedValues);
        }}
        optionLabel="name"
        placeholder="Search by role"
        className="p-column-filter"
        style={{ minWidth: "5rem" }}
      />
    );
  };

  const CategoryRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={CategoryOptions}
        onChange={(e: MultiSelectChangeEvent) => {
          const selectedValues = e.value.name;

          setFilters((prevFilters) => ({
            ...prevFilters,
            jobType: {
              ...prevFilters.designation,
              value: selectedValues,
            },
          }));

          options.filterApplyCallback(selectedValues);
        }}
        optionLabel="name"
        placeholder="Search by role"
        className="p-column-filter"
        style={{ minWidth: "5rem" }}
      />
    );
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const refreshData = () => {
    setLoadingOn();
    fetchData();
    setLoadingOff();
  };

  const paginatorRight = (
    <div className="d-flex">
      <div className="px-1">
        <div className="">
          <i
            className="pi pi-refresh fw-bold px-2 paginatorButtons"
            onClick={() => {
              refreshData();
            }}
          />
        </div>
      </div>
      <div className="px-1">
        <i
          className="pi pi-download fw-bold px-2 paginatorButtons"
          onClick={exportCSV}
        />
      </div>
    </div>
  );

  const header = renderHeader();

  return (
    <>
      <Toast ref={toast} className="my-1" />
      <div className="card">
        {products.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Image
              src={NotFound}
              height="200"
              width="200"
              alt=""
              className="mt-1"
            />
            <h4>No products found!</h4>
          </div>
        ) : (
          <DataTable
            ref={dt}
            showGridlines
            removableSort
            tableStyle={{
              minWidth: "50rem",
              width: "84vw",
            }}
            value={products}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink RowsPerPageDropdown  NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} out of {totalRecords}"
            paginatorRight={paginatorRight}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            loading={loading}
            globalFilterFields={[
              "name",
              "description",
              "category",
              "price",
              "discountPercentage",
              "rating",
              "stock",
              "tags",
              "warrantyInformation",
            ]}
            header={header}
          >
            {ProductFormData?.map((fields: any, index: number) => (
              <Column
                className="py-2"
                key={index}
                field={fields?.name}
                header={
                  <span
                    style={{
                      fontSize: "1rem",
                      paddingRight: "15px",
                      fontWeight: "bolder",
                    }}
                  >
                    {fields?.label}
                  </span>
                }
                sortable={fields.sortable}
                filter={fields?.filter}
                filterPlaceholder={`Search ${fields?.name}`}
                filterElement={
                  fields?.name === "availabilityStatus"
                    ? AvailabilityRowFilterTemplate
                    : fields?.name === "category"
                    ? CategoryRowFilterTemplate
                    : null
                }
                showFilterMenu={false}
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  minWidth: fields?.name === "description" ? "25rem" : "13rem",
                }}
                body={(rowData: any) => {
                  if (fields?.name === "name") {
                    return (
                      <>
                        <Link
                          id="productdetailsid"
                          href={`/products/${rowData[fields?.name]}?id=${
                            rowData._id
                          }`}
                        >
                          <div className="productdetailsid">
                            {rowData[fields?.name]}
                          </div>
                        </Link>

                        <Tooltip target="#productdetailsid" position="top">
                          <p className="p-1 mx-2">
                            <i
                              className="pi pi-info-circle"
                              style={{
                                padding: "0px 10px 0px 0px",
                                fontSize: "1rem",
                                color: "white",
                              }}
                            />
                            view product
                          </p>
                        </Tooltip>
                      </>
                    );
                  } else if (fields?.name === "image") {
                    return (
                      <>
                        <Image
                          style={{ borderRadius: "10px", cursor: "pointer" }}
                          src={rowData?.image}
                          alt={NotFound}
                          height="130"
                          width="140"
                          onClick={(e) => {
                            setOverlayProduct(rowData);
                            op.current?.toggle(e);
                          }}
                          preview
                        />
                      </>
                    );
                  } else if (fields?.name === "description") {
                    return (
                      <div style={{ textAlign: "justify" }}>
                        {rowData[fields?.name]}
                      </div>
                    );
                  } else if (fields?.name === "price") {
                    return (
                      <>
                        <span style={{ fontWeight: "600" }}>
                          INR {rowData[fields?.name]}
                        </span>
                        <span style={{ fontSize: "0.7rem" }}>.00</span> /-
                      </>
                    );
                  } else if (fields?.name === "category") {
                    return (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {rowData[fields?.name]}
                      </div>
                    );
                  } else if (fields?.name === "rating") {
                    return (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Rating
                          value={rowData[fields?.name]}
                          readOnly
                          cancel={false}
                        />
                      </div>
                    );
                  } else if (fields?.name === "tags") {
                    return (
                      <>
                        {rowData[fields?.name]?.map(
                          (data: string, index: number) => (
                            <div key={index}>
                              <Tag
                                className="py-1 px-2 m-1"
                                style={{
                                  backgroundColor: "#a972b1",
                                  display: "grid",
                                  fontSize: "0.9rem",
                                  fontWeight: "500",
                                }}
                              >
                                {data}
                              </Tag>
                            </div>
                          )
                        )}
                      </>
                    );
                  } else if (fields?.name === "discountPercentage") {
                    return (
                      <span>
                        {" "}
                        flat{" "}
                        <span className="fs-4 text-success">
                          {rowData[fields?.name]}
                        </span>{" "}
                        % Off
                      </span>
                    );
                  } else if (fields?.name === "NoticePeriodDuration") {
                    return (
                      <>
                        {rowData[fields?.name] === "0 months"
                          ? "Immediate joininig"
                          : rowData[fields?.name]
                          ? rowData[fields?.name]
                          : "-"}
                      </>
                    );
                  } else if (fields?.name === "availabilityStatus") {
                    return (
                      <div>
                        <Tag
                          className="px-2 py-1"
                          style={{
                            display: "grid",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                          }}
                          severity={
                            rowData[fields?.name] === "in stock"
                              ? "success"
                              : rowData[fields?.name] === "out of stock"
                              ? "danger"
                              : rowData[fields?.name] === "preorder"
                              ? "info"
                              : "warning"
                          }
                        >
                          {rowData[fields?.name]}
                        </Tag>
                      </div>
                    );
                  } else {
                    return <>{rowData[fields?.name]}</>;
                  }
                }}
              />
            ))}

            <Column
              header={
                <div style={{ fontWeight: "bolder", fontSize: "1rem" }}>
                  actions
                </div>
              }
              style={{ minWidth: "5rem" }}
              body={ActionBodyTemplate}
              exportable={false}
            />

            <Column
              header={
                <div style={{ fontWeight: "bolder", fontSize: "1rem" }}>
                  Purchase
                </div>
              }
              style={{ minWidth: "12rem" }}
              body={PurchaseBodyTemplate}
              exportable={false}
            />
          </DataTable>
        )}
      </div>
    </>
  );
};

export default DataTableComponent;
