import React, { useEffect, useState } from "react";
import Axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Camera } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constant";
import InputControl from "./InputControl";
import Team from "./Team";
import CircleIcon from "@mui/icons-material/Circle";

const ProfileForm = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    phoneNumber: "",
    school: "",
    district: "",
    state: "",
    profile_url: "random",
    partner_id: 0,
  });

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    if (authToken && authToken.token) {
      Axios.get("https://merd-api.merakilearn.org/users/me", {
        headers: {
          Authorization: `Bearer ${authToken.token}`,
        },
      })
        .then((response) => {
          setUserData({
            name: response.data.user.name,
            email: response.data.user.email,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    const profileData = {
      ...userData,
      ...formData,
    };

    const authToken = JSON.parse(localStorage.getItem("AUTH"));

    Axios.post(
      "https://merd-api.merakilearn.org/c4ca/teacher_profile",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${authToken.token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        localStorage.setItem("teacherData", JSON.stringify(response.data));
        console.log(profileData);

        router.push("/teacher");
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  const steps = ["Setup Profile", "Add a Team"];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const ActiveStepIcon = () => <CheckCircleIcon color="success" />;
  const UnActiveStepIcon = () => <CircleIcon color="primary" />;
  useEffect(() => {
    const storedUserData = localStorage.getItem("teacherData");
    if (storedUserData) {
      router.push("/teacher");
    }
  }, [router]);

  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: "grid", placeItems: "center", gap: 4 }}
      >
        <Box sx={{ width: "35%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={
                    activeStep === index
                      ? ActiveStepIcon
                      : index === 1
                      ? UnActiveStepIcon
                      : ActiveStepIcon
                  }
                >
                  <Typography variant="body1">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {activeStep === 0 ? (
          <>
            <Typography variant="h5" color="text.primary">
              {router.asPath === "/profile/profile-update"
                ? "Personal Details"
                : "Setup Profile"}
            </Typography>

            <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
              <Box className="AvatarBox">
                <Avatar
                  src="/avatar.svg"
                  sx={{ width: "100%", height: "100%" }}
                />
                <Camera className="Camera" />
              </Box>

              <InputControl
                label="Full Name"
                type="text"
                placeholder="Enter Your Name"
                value={userData.name}
              />

              <InputControl
                label="Email Address"
                type="email"
                placeholder="Enter Email Address"
                value={userData.email}
              />

              <InputControl
                label="Phone Number"
                type="tel"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />

              <InputControl
                label="School"
                type="text"
                placeholder="Enter School"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
              />

              <Box>
                <Grid container spacing={isMobile ? 2 : 4}>
                  <Grid item md={6} sm={6} xs={12}>
                    <Typography
                      style={{ marginBottom: 10 }}
                      variant="body2"
                      color="text.primary"
                    >
                      District
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel id="district">&nbsp;</InputLabel>
                      <Select
                        style={{ borderRadius: 100 }}
                        labelId="district"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Nagpur">Nagpur</MenuItem>
                        <MenuItem value="Bhandara">Bhandara</MenuItem>
                        <MenuItem value="Akola">Akola</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Typography
                      style={{ marginBottom: 10 }}
                      variant="body2"
                      color="text.primary"
                    >
                      Select State
                    </Typography>
                    <FormControl style={{ borderColor: "black" }} fullWidth>
                      <InputLabel id="state">&nbsp;</InputLabel>
                      <Select
                        style={{ borderRadius: 100 }}
                        labelId="state"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                        <MenuItem value="Madhya Pradesh">
                          Madhya Pradesh
                        </MenuItem>
                        <MenuItem value="Himachal Pradesh">
                          Himachal Pradesh
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Button className="profileBtn" onClick={handleNext}>
              <Typography variant="ButtonLarge">Save & Proceed</Typography>
            </Button>
          </>
        ) : activeStep === 1 ? (
          <>
            <Team />
          </>
        ) : null}
      </Container>
    </>
  );
};

export default ProfileForm;
