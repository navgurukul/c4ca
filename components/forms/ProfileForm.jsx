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

  // State to store user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [phone, setPhone] = useState(""); // State for Phone Number
  const [dob, setDob] = useState(""); // State for Date of Birth

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

  // Function to handle saving data and redirection
  const handleSaveAndProceed = () => {
    // Create a data object to send in the POST request
    const postData = {
      name: userData.name,
      email: userData.email,
      phone: phone,
      dob: dob,
    };

    // Send a POST request to the API
    Axios.post("https://merd-api.merakilearn.org/c4ca/teacher_profile", postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`, // Retrieve token from localStorage
      },
    })
      .then((response) => {
        // Check for a successful response here, you can customize this part
        if (response.status === 200) {
          // Redirect to the dashboard page upon success
          router.push("/dashboard");
        } else {
          console.error("Error saving data:", response);
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
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
              src="https://merakilearn.s3.ap-south-1.amazonaws.com/assets/avatars/2a.png"
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
            type="Email"
            placeholder="Enter Email Address"
            value={userData.email}
          />

          <Box>
            <Grid container spacing={isMobile ? 2 : 4}>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl
                  label="Phone Number"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Typography variant="body2" color="Grey.main">
                  As a student, you can enter your parent's phone number
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl
                  label="Date of Birth"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <Typography variant="body2" color="Grey.main">
                  On or after 1 April 1995
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box
            className={
              router.asPath === "/profile/profile-update" ? "show" : "hide"
            }
          >
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

        <Button className="profileBtn" onClick={handleSaveAndProceed}>
          <Typography variant="ButtonLarge">Save & Proceed</Typography>
        </Button>
      </Container>
    </>
  );
};

export default ProfileForm;
