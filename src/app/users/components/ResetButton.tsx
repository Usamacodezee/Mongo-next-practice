import React from "react";
import { useFormikContext } from "formik";
import { Button } from "primereact/button";

interface DeleteDialogProps {
  initialValues: any;
  onReset: () => void;
}

const ResetButton: React.FC<DeleteDialogProps> = ({
  initialValues,
  onReset,
}) => {
  const { resetForm } = useFormikContext();

  const handleReset = () => {
    resetForm({ values: initialValues });
    onReset();
  };

  return (
    <Button
      type="button"
      outlined
      label="Reset form"
      className="p-button-da px-3 py-2 m-2"
      style={{ borderRadius: "9px" }}
      onClick={handleReset}
    />
  );
};

export default ResetButton;
