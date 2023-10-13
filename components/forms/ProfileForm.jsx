import { useEffect, useState } from "react";
import Axios from "axios";
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
import jsonData from "../../data/state.json";
import { Camera } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constant";
import InputControl from "./InputControl";
import Team from "./Team";

const ProfileForm = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    phone_number: "",
    school: "",
    district: "",
    state: "",
    partner_id: 0,
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const stateNames = Object.keys(jsonData);
    setStates(stateNames);
  }, []);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    const selectedDistricts = jsonData[selectedState] || [];
    setFormData({
      ...formData,
      state: selectedState,
      district: "",
    });
    setDistricts(selectedDistricts);
  };

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

          localStorage.setItem("userData", JSON.stringify(response.data));
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

        router.push("/teacher");
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
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
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />

          <InputControl
            label="Email Address"
            type="email"
            placeholder="Enter Email Address"
            name="email" // Added email field
            value={userData.email}
            onChange={handleInputChange}
          />

          <InputControl
            label="Phone Number"
            type="tel"
            placeholder="Enter Phone Number"
            name="phone_number"
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
                  Select State
                </Typography>
                <FormControl style={{ borderColor: "black" }} fullWidth>
                  <InputLabel id="state">Select State</InputLabel>
                  <Select
                    style={{ borderRadius: 100 }}
                    labelId="state"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
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
                  <InputLabel id="district">Select District</InputLabel>
                  <Select
                    style={{ borderRadius: 100 }}
                    labelId="district"
                    id="district"
                    name="district"
                    value={formData.district}
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

        {router.asPath === "/profile/profile-update" ? <Team /> : null}

        <Button className="profileBtn" onClick={handleSaveProfile}>
          {router.asPath === "/profile/profile-update" ? (
            <Typography variant="ButtonLarge">Save Profile</Typography>
          ) : (
            <Typography variant="ButtonLarge">Save & Proceed</Typography>
          )}
        </Button>
      </Container>
    </>
  );
};

export default ProfileForm;
