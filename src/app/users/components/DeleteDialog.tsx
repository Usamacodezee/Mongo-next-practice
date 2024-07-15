/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Toast } from "primereact/toast"; // Import Toast
import React, { useRef } from "react"; // Import useRef
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteUser } from "@/redux/users/userSlice";

interface DeleteDialogProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UserToDelete: any;
  onClose: () => void;
  setLoading: () => void;
  FetchUpdatedData: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  UserToDelete,
  onClose,
  setLoading,
  FetchUpdatedData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<Toast>(null); // Initialize toast reference

  const showToast = (
    severity: "success" | "info" | "warn" | "error" | undefined,
    summary: string,
    detail: string
  ) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail }); // Show toast
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (UserToDelete: any) => {
    console.log("user to delete", UserToDelete);
    dispatch(deleteUser(UserToDelete._id))
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
      <Toast ref={toast} className="my-1" /> {/* Add Toast component */}
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
        Do you really want to delete this records?
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
            handleDelete(UserToDelete);
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
