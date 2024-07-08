"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { fetchProducts } from "@/redux/products/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ProgSpinner from "./components/ProgressSpinner";
import "@/app/CSS/custom.css";
import { Dialog } from "primereact/dialog";
import DeleteDialog from "./components/DeleteDialog";
import DataTableComponent from "./components/DataTableComponent";
import ProductFormComponnent from "./components/ProductForm";
import ReviewComponent from "./components/ReviewComponent";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Users = () => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [EditableData, setEditableData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [ReviewModal, setReviewModal] = useState(false);
  const [ProductReview, setProductReview] = useState("");
  const [FormModal, setFormModal] = useState(false);
  const [ProductToDelete, setProductToDelete] = useState("");
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchData = useCallback(() => {
    dispatch(fetchProducts())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const HandleUpdateRecord = (rowData: any) => {
    const editedData = {
      ...rowData,
    };
    setEditableData(editedData);
    setIsEditMode(true);
    setFormModal(true);
  };

  const handleDeleteModal = (rowData: any) => {
    setProductToDelete(rowData);
    setDeleteModal(true);
  };

  const handleProductToReview = (rowData: any, e: any) => {
    setReviewModal(true);
    setProductReview(rowData);
  };

  const HandleClose = () => {
    setFormModal(false);
    setIsEditMode(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Toast ref={toast} className="my-1" />
      <div className="d-flex" style={{ height: "100%" }}>
        <div>
          <SideBar />
        </div>
        <div style={{ height: "99vh" }}>
          <div>
            <Navbar />
          </div>
          <div
            className="mx-0 px-2 py-3"
            style={{ height: "89vh", width: "85vw", overflow: "hidden scroll" }}
          >
            <div className="">
              <div
                className="d-flex px-3"
                style={{ justifyContent: "space-between" }}
              >
                <h5 className="text-center MainHeading">Products</h5>
                <div className="d-flex mx-1">
                  <Button
                    className="AddProductButton mb-3"
                    onClick={() => setFormModal(true)}
                  >
                    Add new product
                  </Button>
                </div>
              </div>
              <div className="card flex justify-content-center">
                <Dialog
                  maximizable
                  visible={FormModal}
                  modal
                  style={{
                    width: "70rem",
                    height: "45rem",
                    borderRadius: "500px",
                  }}
                  onHide={() => {
                    if (!FormModal) return;
                    setFormModal(false);
                  }}
                >
                  <ProductFormComponnent
                    EditableData={EditableData}
                    isEditMode={isEditMode}
                    fetchData={fetchData}
                    setFormModalOff={() => setFormModal(false)}
                    setIsEditModeOff={() => setIsEditMode(false)}
                    HandleClose={HandleClose}
                    setLoadingon={() => setLoading(true)}
                    setEditableData={() => setEditableData({})}
                    onClose={() => setFormModal(false)}
                    setLoading={() => setLoading(true)}
                    FetchUpdatedData={fetchData}
                  />
                </Dialog>
              </div>
              {loading ? (
                <ProgSpinner />
              ) : (
                <DataTableComponent
                  setLoadingOn={() => setLoading(true)}
                  setLoadingOff={() => setLoading(false)}
                  fetchData={fetchData}
                  loading={loading}
                  HandleUpdateRecord={HandleUpdateRecord}
                  handleDeleteModal={handleDeleteModal}
                  handleProductToReview={handleProductToReview}
                />
              )}
            </div>
            <div className="card flex justify-content-center">
              <Dialog
                visible={DeleteModal}
                modal
                style={{
                  width: "30rem",
                  height: "14rem",
                  borderRadius: "100px",
                }}
                onHide={() => {
                  if (!DeleteModal) return;
                  setDeleteModal(false);
                }}
              >
                <DeleteDialog
                  ProductToDelete={ProductToDelete}
                  onClose={() => setDeleteModal(false)}
                  setLoading={() => setLoading(true)}
                  FetchUpdatedData={() => fetchData()}
                />
              </Dialog>
            </div>
            <div>
              <Dialog
                visible={ReviewModal}
                maximizable
                style={{ width: "55%", height: "58%", borderRadius: "10px" }}
                onHide={() => {
                  if (!ReviewModal) return;
                  setReviewModal(false);
                }}
              >
                <ReviewComponent
                  ProductReview={ProductReview}
                  setReviewModalOff={() => setReviewModal(false)}
                  setReviewModalOn={() => setReviewModal(false)}
                  setProductReview={setProductReview}
                  fetchData={fetchData}
                />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
