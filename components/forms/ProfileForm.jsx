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
import { Camera } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constant";
import InputControl from "./InputControl";
import Team from "./Team";

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
  });

  useEffect(() => {
    // Retrieve the token from localStorage
    const authToken = JSON.parse(localStorage.getItem("AUTH"));

    // Check if the token exists
    if (authToken && authToken.token) {
      // Fetch user data from the API using Axios with the token
      Axios.get("https://merd-api.merakilearn.org/users/me", {
        headers: {
          Authorization: `Bearer ${authToken.token}`,
        },
      })
        .then((response) => {
          // Update the state with user data
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
    // Combine user data and form data
    const profileData = {
      ...userData,
      ...formData,
    };

    // Make a POST request to save the profile data
    Axios.post("https://merd-api.merakilearn.org/c4ca/teacher_profile", profileData)
      .then((response) => {
        // Redirect to the dashboard if there are no errors
        router.push("/teacher");
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

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
                <Typography style={{ marginBottom: 10 }} variant="body2" color="text.primary">
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
                    <MenuItem value="Nagpur">Nagpur</MenuItem>
                    <MenuItem value="Bhandara">Bhandara</MenuItem>
                    <MenuItem value="Akola">Akola</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Typography style={{ marginBottom: 10 }} variant="body2" color="text.primary">
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
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                    <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                    <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {router.asPath === "/profile/profile-update" ? <Team /> : null}

        <Button className="profileBtn" onClick={handleSaveProfile}>
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