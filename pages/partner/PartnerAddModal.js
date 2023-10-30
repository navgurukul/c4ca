import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField,InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import customAxios from "../../api"; // Import your custom Axios instance

import {
  Dialog,
  Grid,
  // DialogTitle,
  // TableContainer,
  DialogContent,
  // DialogContentText,
  DialogActions,
} from "@mui/material";
// import useValidEmail from "../../hooks/useValidEmail";

function PartnerAddModal({ boolean, onOpen }) {
  const [values, setValues] = useState({
 
    name: "",
    point_of_contact: "",
    email: "",
    phone_number: "", 
  });

  const createNewPartner = (values) => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    const headers = {
      Authorization:
        authToken.token, // Replace with your actual access token
      "Content-Type": "application/json",
    };

    customAxios
      .post('/c4caPartners', values, { headers })
      .then((response) => {
        console.log("POST request successful:", response.data);
        alert(response.data.status);
      })
      .catch((error) => {
        console.error("POST request error:", error);
        alert("ERROR: " + error?.response?.data?.message);
      });
  };

  // const { isValidEmail } = useValidEmail(values.email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    if (
      !values.name.trim() ||
      !values.point_of_contact.trim() ||
      !values.email.trim() ||
      !values.phone_number.trim()
    ) {
      alert("Fill all fields");
      return;
    } else {
      console.log(values);
      createNewPartner(values);
      onOpen();
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Dialog open={boolean} onClose={onOpen} fullWidth>
        <DialogContent>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              style={{ fontSize: "20px", marginLeft: "10px" }}
            >
              New Partner
            </Typography>
            <CloseIcon
              onClick={onOpen}
              sx={{
                cursor: "pointer",
                // marginRight:"10px"
                color: "#949494",
              }}
            />
          </Box>
          <Box style={{ marginTop: "15px", marginLeft: "10px" }}>
            <InputLabel
              style={{
                fontSize: "15px",
                color: "#2E2E2E",
                fontFamily: "Amazon Ember",
              }}
            >
              Partner Name
            </InputLabel>
            <TextField
              margin="dense"
              // label="Partner Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: {
                  height: "48px",
                  borderRadius: "100px",
                  alignItems: "center",
                },
              }}
            />
          </Box>
          <Box style={{ marginTop: "15px", marginLeft: "10px" }}>
            <InputLabel
              className="Input"
              style={{ fontSize: "15px", color: "#2E2E2E", marginTop: "5px" }}
            >
              Point of Contact Name
            </InputLabel>
            <TextField
              margin="dense"
              // label="Point of Contact Name"
              name="point_of_contact"
              value={values.point_of_contact}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: {
                  height: "48px",
                  borderRadius: "100px",
                  textAlign: "center",
                },
              }}
            />
          </Box>
          <Box style={{ marginTop: "15px", marginLeft: "10px" }}>
            <InputLabel
              className="Input"
              style={{ fontSize: "15px", color: "#2E2E2E", marginTop: "5px" }}
            >
              Point of Contact Email
            </InputLabel>
            <TextField
              margin="dense"
              // label="Point of Contact Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: {
                  height: "48px",
                  borderRadius: "100px",
                  textAlign: "center",
                },
              }}
            />
          </Box>
          <Box style={{ marginTop: "15px", marginLeft: "10px" }}>
            <InputLabel
              className="Input"
              style={{ fontSize: "15px", color: "#2E2E2E", marginTop: "10px" }}
            >
              Phone Number
            </InputLabel>
            <TextField
              margin="dense"
              // label="Phone Number"
              name="phone_number"
              value={values.phone}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: {
                  height: "48px",
                  borderRadius: "100px",
                  textAlign: "center",
                },
              }}
            />
          </Box>
          {/* {values.email === "" ? "" : !isValidEmail && (
            <Typography sx={{ fontSize: "14px", color: "red" }}>
              Please enter a valid email
            </Typography>
          )} */}
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button
              // disabled={!isValidEmail || values.email.trim() === ""}
              variant="contained"
              onClick={handleSubmit}
              style={{
                background:
                  "var(--midnight-blue-gradient, linear-gradient(90deg, rgba(41, 69, 140, 0.72) 0%, #192954 100%))",
              }}
            >
              Add Partner
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default PartnerAddModal;
