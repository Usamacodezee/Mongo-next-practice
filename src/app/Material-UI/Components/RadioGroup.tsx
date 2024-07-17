import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioButtons = [
  { value: "female", label: "Female", control: <Radio /> },
  { value: "male", label: "Male", control: <Radio /> },
  { value: "other", label: "Other", control: <Radio /> },
];

export default function RadioButtonGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {RadioButtons.map((Radio, index) => (
          <FormControlLabel
            key={index}
            value={Radio.value}
            control={Radio.control}
            label={Radio.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
