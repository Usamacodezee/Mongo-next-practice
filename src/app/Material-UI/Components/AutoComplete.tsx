/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, TextField } from "@mui/material";
import type { FC } from "react";
import React from "react";

interface AutoCompleteProps {
  ProductData: any[];
}

const AutoComplete: FC<AutoCompleteProps> = ({ ProductData }) => {
  return (
    <Box>
      {ProductData.map((product: any, index: number) => (
        <Autocomplete
          key={index}
          disablePortal
          id={product.name}
          options={product.data}
          sx={{ width: 300, marginBottom: 3 }}
          renderInput={(params) => (
            <TextField {...params} label={product.name} />
          )}
        />
      ))}
    </Box>
  );
};
export default AutoComplete;
