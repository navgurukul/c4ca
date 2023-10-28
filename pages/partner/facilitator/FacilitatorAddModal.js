import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, Grid, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";

function FacilitatorAddModal({ boolean, onOpen, id }) {
  console.log(typeof id);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    point_of_contact: "string",
    teacher_invite_link: "link",
    partner_id: Number(id),
  });

  const createNewFacilitator = (values) => {
    console.log(values);
    const apiUrl = "https://merd-api.merakilearn.org/c4ca/facilitator/create";
    const headers = {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODc3NTg0NjYsImV4cCI6MTcxOTMxNjA2Nn0.UqNyrtf9o3A6UsmIPXXyFxmoy005w8t4n1WQKK8xGQA", // Replace with your actual access token
      "Content-Type": "application/json",
    };

    axios
      .post(apiUrl, values, { headers })
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
      console.log(values);
      createNewFacilitator(values);
      onOpen();
    }
  };

  return (
    <div>
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
        </DialogContent>
        <Box sx={{ pb: 2, px: 2 }}>
          <DialogActions>
            <Button variant="contained" onClick={handleSubmit}>
              Add Facilitator
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default FacilitatorAddModal;
