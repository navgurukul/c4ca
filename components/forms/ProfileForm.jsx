import React, { useEffect, useState } from "react";
import customAxios from "../../api";
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
import jsonData from "../../data/state.json";
import { useSearchParams } from "next/navigation";

const ProfileForm = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const searchParams = useSearchParams();
  const partner_id = searchParams.get("partner_id");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    phone_number: "",
    school: "",
    district: "",
    state: "",
    profile_url: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const stateNames = Object.keys(jsonData);
    setStates(stateNames);

    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    customAxios
      .get("/c4ca/teacher_Data", {
        headers: {
          Authorization: `Bearer ${authToken.token}`,
        },
      })
      .then((res) => {
        if (res.data.data !== null) {
          setExistingData(true);
          console.log("ites herel....", res);
          localStorage.setItem("teacherData", JSON.stringify(res.data.data));
          setFormData({
            phone_number: res.data.data.phone_number,
            school: res.data.data.school,
            district: res.data.data.district,
            state: res.data.data.state,
            profile_url: res.data.data.profile_url,
          });
          setUserData({
            ...userData,
            name: res.data.data.name,
            email: res.data.data.email,
          });
        } else {
          customAxios
            .get("https://merd-api.merakilearn.org/users/me", {
              headers: {
                Authorization: `Bearer ${authToken.token}`,
              },
            })
            .then((response) => {
              console.log(response, "resp....");
              setUserData({
                name: response.data.user.name,
                email: response.data.user.email,
              });
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        }
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const [existingData, setExistingData] = useState(false);

  const handleSaveProfile = () => {
    // Create a FormData object to send the image
    const profileData = new FormData();
    profileData.append("profile_url", selectedImage); // Add the selected image
    profileData.append("name", userData.name);
    profileData.append("email", userData.email);
    profileData.append("phone_number", formData.phone_number);
    profileData.append("school", formData.school);
    profileData.append("district", formData.district);
    profileData.append("state", formData.state);

    const authToken = JSON.parse(localStorage.getItem("AUTH"));

    customAxios
      .post("/c4ca/teacher_profile", profileData, {
        headers: {
          Authorization: `Bearer ${authToken.token}`,
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      })
      .then((response) => {
        if (response.data.data) {
          setActiveStep(1);
        }
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  useEffect(() => {
    const selectedDistricts = jsonData[formData.state] || [];
    setDistricts(selectedDistricts);
  }, [formData.state]);

  const steps = ["Setup Profile", "Add a Team"];
  const [activeStep, setActiveStep] = useState(0);

  const ActiveStepIcon = () => <CheckCircleIcon color="success" />;
  const UnActiveStepIcon = () => <CircleIcon color="primary" />;

  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: "grid", placeItems: "center", gap: 4 }}
      >
        {partner_id && (
          <Box  sx={{ width: isMobile ? "100%" : "35%" }}>
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
        )}
        {activeStep === 0 ? (
          <>
            <Typography variant="h5" color="text.primary">
              {!partner_id ? "Personal Details" : "Setup Profile"}
            </Typography>

            <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
              <Box className="AvatarBox">
                <label htmlFor="image-input">
                  {selectedImage ? (
                    <Avatar
                      src={URL.createObjectURL(selectedImage)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <Avatar
                      src={formData.profile_url || "/default-image.png"}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  )}
                  <Camera className="Camera" />
                </label>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Box>

              <InputControl
                label="Full Name"
                type="text"
                placeholder="Enter Your Name"
                value={userData.name || formData.name}
              />

              <InputControl
                label="Email Address"
                type="email"
                placeholder="Enter Email Address"
                value={userData.email || formData.email}
              />

              <InputControl
                label="Phone Number"
                type="tel"
                placeholder="Enter Phone Number"
                name="phone_number"
                value={formData?.phone_number}
                onChange={handleInputChange}
              />

              <InputControl
                label="School"
                type="text"
                placeholder="Enter School"
                name="school"
                value={formData?.school}
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
                      Select State
                    </Typography>
                    <FormControl style={{ borderColor: "black" }} fullWidth>
                      {/* <InputLabel id="state">Select State</InputLabel> */}
                      <Select
                        style={{ borderRadius: 100 }}
                        labelId="state"
                        id="state"
                        name="state"
                        value={formData?.state}
                        onChange={handleInputChange}
                      >
                        {states.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Typography
                      style={{ marginBottom: 10 }}
                      variant="body2"
                      color="text.primary"
                    >
                      District
                    </Typography>
                    <FormControl fullWidth>
                      {/* <InputLabel id="district">Select District</InputLabel> */}
                      <Select
                        style={{ borderRadius: 100 }}
                        labelId="district"
                        id="district"
                        name="district"
                        value={formData?.district}
                        onChange={handleInputChange}
                      >
                        {districts.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            {partner_id ? (
              <Button className="profileBtn" onClick={handleSaveProfile}>
                <Typography variant="ButtonLarge">Save & Proceed</Typography>
              </Button>
            ) : (
              <Button
                className="profileBtn"
                onClick={() => router.push("/teacher/teams")}
              >
                <Typography variant="ButtonLarge">Go To Dashboard</Typography>
              </Button>
            )}
          </>
        ) : (
          <>
            <Team setActiveStep={setActiveStep} />
          </>
        )}
      </Container>
    </>
  );
};

export default ProfileForm;
