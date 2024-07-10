import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { addUserAsync } from "@/redux/users/userSlice";
import { UserTypes } from "@/app/common/UserFormData";
import {
  DesignationOptions,
  ExperienceLevelOptions,
  jobLocationsOptions,
  jobTypeOptions,
  Locations,
  NoticePeriodDurationOptions,
  shiftTimingOptions,
} from "@/app/common/UserFormData";
import NumberInput from "./NumberInput";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  jobType: z.string().min(1, { message: "Job type is required" }),
  JobLocation: z.string().min(1, { message: "Job location is required" }),
  salary: z.number().min(1, { message: "Salary is required" }),
  ExperienceLevel: z
    .string()
    .min(1, { message: "Experience level is required" }),
  shiftTiming: z.string().min(1, { message: "Shift timing is required" }),
  noticePeriod: z.string().min(1, { message: "Notice period is required" }),
  probationPeriod: z
    .string()
    .min(1, { message: "Probation period is required" }),
  NoticePeriodDuration: z
    .string()
    .min(1, { message: "Notice period duration is required" }),
  PrefferedLocations: z
    .array(z.string())
    .min(1, { message: "At least one preferred location is required" }),
  PrefferedType: z
    .array(z.string())
    .min(1, { message: "At least one preferred type is required" }),
});

const initialValues: UserTypes = {
  _id: null,
  name: "",
  username: "",
  email: "",
  phone: 0,
  designation: "",
  jobType: "",
  JobLocation: "",
  salary: 0,
  joiningDate: new Date(),
  ExperienceLevel: "",
  shiftTiming: "",
  noticePeriod: "",
  probationPeriod: "",
  NoticePeriodDuration: "",
  PrefferedLocations: [],
  PrefferedType: [],
};

const FormComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target as { name: string; value: string };
    setFormData((prev: UserTypes) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const { name, value } = e.target as { name: string; value: string[] };
    setFormData((prev: UserTypes) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      console.log("parsed data", schema.parse(formData));
      setErrors({});
      await dispatch(addUserAsync(formData));
      alert("Data saved");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h4" align="center" gutterBottom>
        Data Form
      </Typography>
      <div>
        <TextField
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          error={!!errors.name}
          name="name"
          label="Employee name"
          value={formData.name}
          onChange={handleChange}
          helperText={errors.name}
        />
        <TextField
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          error={!!errors.username}
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          helperText={errors.username}
        />
        <TextField
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          error={!!errors.email}
          name="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
          helperText={errors.email}
        />
        <NumberInput
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          aria-label="Mobile number"
          placeholder="Type a number…"
          value={formData.phone}
          onChange={(e: any, val: any) =>
            handleChange({ target: { name: "phone", value: val } })
          }
        />
        <NumberInput
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          aria-label="Salary"
          placeholder="Type a number…"
          value={formData.salary}
          onChange={(e: any, val: any) =>
            handleChange({ target: { name: "salary", value: val } })
          }
        />
        <Select
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          error={!!errors.designation}
          labelId="designation"
          id="designation"
          name="designation"
          value={formData.designation}
          label="Designation"
          onChange={handleChange}
        >
          {DesignationOptions.map((designation, index) => (
            <MenuItem key={index} value={designation.name}>
              {designation.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          style={{ width: "24%" }}
          className="mx-1 mb-2"
          error={!!errors.jobType}
          labelId="jobType"
          id="jobType"
          name="jobType"
          value={formData.jobType}
          label="Job Type"
          onChange={handleChange}
        >
          {jobTypeOptions.map((jobType, index) => (
            <MenuItem key={index} value={jobType.name}>
              {jobType.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          style={{ width: "24%" }}
          className="mx-1 mb-2"
          error={!!errors.JobLocation}
          labelId="JobLocation"
          id="JobLocation"
          name="JobLocation"
          value={formData.JobLocation}
          label="Job Location"
          onChange={handleChange}
        >
          {jobLocationsOptions.map((jobLocation, index) => (
            <MenuItem key={index} value={jobLocation.name}>
              {jobLocation.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          style={{ width: "24%" }}
          className="mx-1 mb-2"
          error={!!errors.ExperienceLevel}
          labelId="ExperienceLevel"
          id="ExperienceLevel"
          name="ExperienceLevel"
          value={formData.ExperienceLevel}
          label="Experience Level"
          onChange={handleChange}
        >
          {ExperienceLevelOptions.map((experienceLevel, index) => (
            <MenuItem key={index} value={experienceLevel.name}>
              {experienceLevel.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          style={{ width: "24%" }}
          className="mx-1 mb-2"
          error={!!errors.shiftTiming}
          labelId="shiftTiming"
          id="shiftTiming"
          name="shiftTiming"
          value={formData.shiftTiming}
          label="Shift Timing"
          onChange={handleChange}
        >
          {shiftTimingOptions.map((shiftTiming, index) => (
            <MenuItem key={index} value={shiftTiming.name}>
              {shiftTiming.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          error={!!errors.NoticePeriodDuration}
          labelId="NoticePeriodDuration"
          id="NoticePeriodDuration"
          name="NoticePeriodDuration"
          value={formData.NoticePeriodDuration}
          label="Notice Period Duration"
          onChange={handleChange}
        >
          {NoticePeriodDurationOptions.map((noticePeriodDuration, index) => (
            <MenuItem key={index} value={noticePeriodDuration.name}>
              {noticePeriodDuration.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          labelId="PrefferedLocations"
          id="PrefferedLocations"
          multiple
          value={formData.PrefferedLocations}
          name="PrefferedLocations"
          onChange={handleMultiSelectChange}
          input={<OutlinedInput label="Preferred Locations" />}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {Locations.map((location, index) => (
            <MenuItem key={index} value={location.name}>
              <Checkbox
                checked={
                  formData.PrefferedLocations.indexOf(location.name) > -1
                }
              />
              <ListItemText primary={location.name} />
            </MenuItem>
          ))}
        </Select>

        <Select
          style={{ width: "32%" }}
          className="mx-1 mb-2"
          labelId="PrefferedType"
          id="PrefferedType"
          multiple
          value={formData.PrefferedType}
          name="PrefferedType"
          onChange={handleMultiSelectChange}
          input={<OutlinedInput label="Preferred Type" />}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {jobTypeOptions.map((preferredType, index) => (
            <MenuItem key={index} value={preferredType.name}>
              <Checkbox
                checked={
                  formData.PrefferedType.indexOf(preferredType.name) > -1
                }
              />
              <ListItemText primary={preferredType.name} />
            </MenuItem>
          ))}
        </Select>

        <RadioGroup
          style={{ width: "24.75%", display: "flex" }}
          className="mx-1 mb-2"
          aria-labelledby="noticePeriod"
          name="noticePeriod"
          value={formData.noticePeriod}
          onChange={handleChange}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>

        <RadioGroup
          style={{ width: "24.75%" }}
          className="mx-1 mb-2"
          aria-labelledby="probationPeriod"
          name="probationPeriod"
          value={formData.probationPeriod}
          onChange={handleChange}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </div>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default FormComponent;
