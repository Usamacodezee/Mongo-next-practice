import React from "react";
import { TextField } from "@mui/material";

const NumberInput = ({ value, onChange, ...rest }) => {
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (!isNaN(val)) {
      onChange && onChange(e, parseFloat(val));
    }
  };

  return (
    <TextField
      {...rest}
      value={value}
      onChange={handleInputChange}
      type="number"
    />
  );
};

export default NumberInput;
