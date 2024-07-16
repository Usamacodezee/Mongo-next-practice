import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteProduct } from "@/redux/products/productSlice";

interface DeleteDialogProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ProductToDelete: any;
  onClose: () => void;
  setLoading: () => void;
  FetchUpdatedData: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  // eslint-disable-next-line react/prop-types
  ProductToDelete,
  // eslint-disable-next-line react/prop-types
  onClose,
  // eslint-disable-next-line react/prop-types
  setLoading,
  // eslint-disable-next-line react/prop-types
  FetchUpdatedData,
}) => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showToast = (severity: any, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (ProductToDelete: any) => {
    // eslint-disable-next-line react/prop-types
    dispatch(deleteProduct(ProductToDelete._id))
      .unwrap()
      .then(() => {
        showToast("success", "Deleted!", "User deleted successfully!");
        onClose();
        setLoading();
        FetchUpdatedData();
      })
      .catch((error) => {
        showToast("error", "Error!", "Failed to delete user!");
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <Toast ref={toast} className="my-1" />
      <div className="inline-flex align-items-center justify-content-center gap-2 px-2">
        <p
          className="font-bold white-space-nowrap text-center"
          style={{ fontSize: "1.4rem" }}
        >
          Delete Confirmation
        </p>
      </div>
      <p className="pt-3 px-3 font-bold" style={{ fontSize: "1.1rem" }}>
        <i
          className="pi pi-info-circle mx-2"
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
        />
        Do you really want to delete this record?
      </p>
      <div
        className="p-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          type="button"
          label="Yes"
          severity="danger"
          className="p-button-da px-4 py-2 mx-2"
          style={{
            borderRadius: "9px",
          }}
          onClick={() => {
            handleDelete(ProductToDelete);
          }}
        />
        <Button
          type="button"
          label="No"
          severity="info"
          className="p-button-da px-4 py-2 mx-2"
          style={{
            borderRadius: "9px",
          }}
          onClick={() => onClose()}
        />
      </div>
    </>
  );
};

export default DeleteDialog;
