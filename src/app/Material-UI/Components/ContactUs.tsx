/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import "@/app/globals.css";
import CloseIcon from "@mui/icons-material/Close";

const ContactUsForm = [
  {
    name: "name",
    type: "text",
    label: "Name",
    variant: "outlined",
    margin: "normal",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    variant: "outlined",
    margin: "normal",
  },
  {
    name: "phone",
    type: "number",
    label: "Contact No",
    variant: "outlined",
    margin: "normal",
  },
  {
    name: "message",
    type: "text",
    label: "Message",
    variant: "outlined",
    margin: "normal",
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: 0,
    message: "",
    date: new Date(),
  });
  console.log("form data", formData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [SnackMessageTypeSuccess, setSnackMessageTypeSuccess] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const templateParams = {
        ...formData,
        from: formData.email,
        reply_to: formData.email,
      };

      await emailjs.send(
        "service_youti7z",
        "template_b87oqki",
        templateParams,
        "EYEAalzhJHIpPPAs2"
      );

      setSnackBarMessage("Thank You, We'll Contact You Soon");
      setOpenSnackbar(true);
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        phone: 0,
        message: "",
        date: new Date(),
      });
    } catch (error) {
      setSnackMessageTypeSuccess;
      false;
      setSnackBarMessage("Something Went Wrong");
      setOpenSnackbar(true);
      console.error("Error sending email:", error);
      alert("Error sending message. Please try again later.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="medium"
        aria-label="close"
        onClick={handleCloseSnackbar}
        sx={{ color: "black" }}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        {ContactUsForm.map((Field, index) => (
          <TextField
            key={index}
            fullWidth
            type={Field.type}
            name={Field.name}
            value={
              Field.name === "name"
                ? formData.name
                : Field.name === "email"
                ? formData.email
                : Field.name === "message"
                ? formData.message
                : formData.name
            }
            onChange={handleChange}
            label={Field.label}
            variant={Field.variant}
            margin={Field.margin}
            required
          />
        ))}
        <Button
          className="py-3 mt-3"
          sx={{ width: "100%" }}
          type="submit"
          variant="contained"
          color="success"
        >
          Get In Touch
        </Button>
      </form>
      <Snackbar
        className={
          SnackMessageTypeSuccess === true
            ? "ContactUsSnackBar"
            : "ContactUsSnackBarError"
        }
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackBarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        action={action}
      />
    </Box>
  );
};

export default ContactForm;
