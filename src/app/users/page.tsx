/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { fetchUsers } from "@/redux/users/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "@/app/CSS/custom.css";
import { Dialog } from "primereact/dialog";
import DeleteDialog from "./components/DeleteDialog";
import UserForm from "./components/UserForm";
import DataTableComponent from "./components/DataTableComponent";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Users = () => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [EditableData, setEditableData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [FormModal, setFormModal] = useState(false);
  const [UserToDelete, setUserToDelete] = useState("");
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchData = useCallback(() => {
    dispatch(fetchUsers())
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
      joiningDate: new Date(rowData.joiningDate).toISOString().substr(0, 10),
    };
    setEditableData(editedData);
    setIsEditMode(true);
    setFormModal(true);
  };

  const handleDeleteModal = (rowData: any) => {
    setUserToDelete(rowData);
    setDeleteModal(true);
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
        <div
          style={{ height: "99vh", width: "99vw", overflow: "hidden scroll" }}
        >
          <div>
            <Navbar />
          </div>
          <div className="py-3">
            <div
              className="d-flex px-3"
              style={{ justifyContent: "space-between" }}
            >
              <h5
                className="text-center userHeading fs-2"
                style={{ display: "flex", alignItems: "center" }}
              >
                Employee data
              </h5>
              <div className="d-flex">
                <Button
                  id="AddEmployeeButton"
                  className="mb-3"
                  onClick={() => setFormModal(true)}
                >
                  <i
                    className="pi pi-plus"
                    style={{
                      padding: "0px 10px 0px 0px",
                      fontSize: "1.4rem",
                      color: "white",
                    }}
                  />
                  Add new user
                </Button>
              </div>
            </div>
            <div className="card flex justify-content-center">
              <Dialog
                visible={FormModal}
                modal
                style={{
                  width: "90rem",
                  height: "83rem",
                  borderRadius: "100px",
                }}
                onHide={() => {
                  if (!FormModal) return;
                  setFormModal(false);
                }}
              >
                <UserForm
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
            <DataTableComponent
              setLoadingOn={() => setLoading(true)}
              setLoadingOff={() => setLoading(false)}
              fetchData={fetchData}
              loading={loading}
              HandleUpdateRecord={HandleUpdateRecord}
              handleDeleteModal={handleDeleteModal}
            />
          </div>
          <div className="card flex justify-content-center">
            <Dialog
              visible={DeleteModal}
              modal
              style={{ width: "30rem", height: "14rem", borderRadius: "100px" }}
              onHide={() => {
                if (!DeleteModal) return;
                setDeleteModal(false);
              }}
            >
              <DeleteDialog
                UserToDelete={UserToDelete}
                onClose={() => setDeleteModal(false)}
                setLoading={() => setLoading(true)}
                FetchUpdatedData={() => fetchData()}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
