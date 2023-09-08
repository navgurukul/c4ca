import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Camera } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constant";
import InputControl from "./InputControl";
import Team from "./Team";
import SelectControl from "./SelectControl";

const ProfileForm = () => {
  
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: "grid", placeItems: "center", gap: 4 }}>
        <Typography variant="h5" color="text.primary">
          {router.asPath === "/profile/profile-update"
            ? "Personal Details"
            : "Set Up Your Profile"}
        </Typography>

        <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
          <Box className="AvatarBox">
            <Avatar src="/avatar.svg" sx={{ width: "100%", height: "100%" }} />
            <Camera className="Camera" />
          </Box>

          <InputControl
            label="Full Name"
            type="text"
            placeholder="Enter Your Name"
          />

          <InputControl
            label="Email Address"
            type="Email"
            placeholder="Enter Email Address"
          />

          <InputControl
            label="Phone Number"
            type="Phone"
            placeholder="Enter Phone Number"
          />

          <InputControl
            label="School"
            type="Phone"
            placeholder="Enter School "
          />

          <Box>
            <Grid container spacing={isMobile ? 2 : 4}>
              <Grid item md={6} sm={6} xs={12}>
                <Typography style={{marginBottom: 10}} variant="body2" color="text.primary">
                  District
                </Typography>
                <FormControl fullWidth>
                  <InputLabel  id="district">Select District</InputLabel>
                  <Select
                    style={{ borderRadius: 100 }}
                    labelId="district"
                    id="demo-simple-select"
                    // value={age}
                    label="Select District"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Nagpur</MenuItem>
                    <MenuItem value={20}>Bhandara</MenuItem>
                    <MenuItem value={30}>Akola</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Typography style={{marginBottom: 10}} variant="body2" color="text.primary">
                  Select State
                </Typography>
                <FormControl style={{borderColor: "black"}} fullWidth>
                  <InputLabel id="state">Select State</InputLabel>
                  <Select
                    style={{ borderRadius: 100 }}
                    labelId="state"
                    id="demo-simple-select"
                    // value={age}
                    label="Select State"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Maharashtra</MenuItem>
                    <MenuItem value={20}>Madhya Pradesh</MenuItem>
                    <MenuItem value={30}>Himachal Pradesh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box
            className={
              router.asPath === "/profile/profile-update" ? "show" : "hide"
            }>
            <Grid container spacing={isMobile ? 2 : 4}>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl label="School" type="text" />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl label="Class" type="text" />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <InputControl label="State" type="text" />
              </Grid>
            </Grid>
          </Box>
        </Container>

        {router.asPath === "/profile/profile-update" ? <Team /> : null}

        <Button className="profileBtn">
          {router.asPath === "/profile/profile-update" ? (
            <Link href="/profile/profile-update">
              <Typography variant="ButtonLarge">Save Profile</Typography>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Typography variant="ButtonLarge">Save & Proceed</Typography>
            </Link>
          )}
        </Button>
      </Container>
    </>
  );
};

export default ProfileForm;
