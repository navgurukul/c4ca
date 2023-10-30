import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, Grid, DialogContent, DialogActions } from "@mui/material";
import customAxios from "../../../api"; // Import your custom Axios instance

function FacilitatorAddModal({ boolean, onOpen, id }) {
  console.log(typeof id);
  const [values, setValues] = useState({
    name: "",
    point_of_contact: "string",
    email: "",
    c4ca_partner_id: Number(id),
    phone_number: "",
  });

  const createNewFacilitator = (values) => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));

    const headers = {
      Authorization: authToken.token,
      "Content-Type": "application/json",
    };

    customAxios
      .post("/c4ca/facilitator/create", values, { headers })
      .then((response) => {
        console.log("POST request successful:", response.data);
        alert(response?.data.status);
      })
      .catch((error) => {
        console.error("POST request error:", error);
        alert("ERROR: " + error?.response?.data?.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    if (
      !values.name.trim() ||
      !values.email.trim() ||
      !values.phone_number.trim()
    ) {
      alert("Fill all fields");
      return;
    } else {
      createNewFacilitator(values);
      onOpen();
    }
  };

  return (
    <div>
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
              New Facilitator
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
              Name
            </InputLabel>
            <TextField
              margin="dense"
              label="Name"
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
          </Box>
          <Box style={{ marginTop: "15px", marginLeft: "10px" }}>
            <InputLabel
              style={{
                fontSize: "15px",
                color: "#2E2E2E",
                fontFamily: "Amazon Ember",
              }}
            >
              Point of Contact Email
            </InputLabel>
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
          </Box>
          <Box style={{ marginTop: "15px", marginLeft: "10px" }}>
            <InputLabel
              style={{
                fontSize: "15px",
                color: "#2E2E2E",
                fontFamily: "Amazon Ember",
              }}
            >
              Phone Number
            </InputLabel>
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
          </Box>
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                background:
                  "var(--midnight-blue-gradient, linear-gradient(90deg, rgba(41, 69, 140, 0.72) 0%, #192954 100%))",
              }}
            >
              Add Facilitator
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default FacilitatorAddModal;
