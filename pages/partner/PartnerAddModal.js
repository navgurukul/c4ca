import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  Grid,
  // DialogTitle,
  // TableContainer,
  DialogContent,
  // DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
// import useValidEmail from "../../hooks/useValidEmail";

function PartnerAddModal({ boolean, onOpen }) {
  const [values, setValues] = useState({
    name: "",
    point_of_contact_name: "",
    email: "",
    phone_number: "",
    platform:"c4ca"
  });

  const createNewPartner = (values) => {
    const apiUrl =
      "https://merd-api.merakilearn.org/partners/create/newpartner";
    const headers = {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODc3NTg0NjYsImV4cCI6MTcxOTMxNjA2Nn0.UqNyrtf9o3A6UsmIPXXyFxmoy005w8t4n1WQKK8xGQA", // Replace with your actual access token
      "Content-Type": "application/json",
    };

    axios
      .post(apiUrl, values, { headers })
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
      !values.point_of_contact_name.trim() ||
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
      <Dialog open={boolean} onClose={onOpen}>
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

          <TextField
            margin="dense"
            label="Partner Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: {
                height: "50px",
                borderRadius: "100px",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Point of Contact Name"
            name="point_of_contact_name"
            value={values.point_of_contact_name}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: {
                height: "50px",
                borderRadius: "100px",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Point of Contact Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: {
                height: "50px",
                borderRadius: "100px",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phone_number"
            value={values.phone}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: {
                height: "50px",
                borderRadius: "100px",
              },
            }}
          />
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
