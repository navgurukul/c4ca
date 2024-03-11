import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({ open, message, onClose }) => {
  const handleSnackbarClose = () => {
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackbarClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="success"
        onClose={handleSnackbarClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
