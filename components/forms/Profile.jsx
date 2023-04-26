import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { Camera } from "@mui/icons-material";
import InputControl from "./InputControl";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  return (
    <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
      {router.asPath == "/profile-update" ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Personal Details
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Set Up Your Profile
        </Typography>
      )}

      <Box sx={{ display: "grid", gap: 4 }}>
        <Box className={styles.Box}>
          <Avatar src="/avatar.svg" sx={{ width: "100%", height: "100%" }} />
          <Camera className={styles.CameraIcon} />
        </Box>

        <InputControl
          label="Full Name"
          type="text"
          placeholder="Enter Your Name"
        />

        <InputControl
          label="Email Address"
          type="email"
          placeholder="Enter Your Email"
        />

        <Box>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <InputControl label="Phone Number" type="tel" />
              <Typography variant="body2" sx={{ color: "#949494" }}>
                As a student, you can enter your parent's phone number
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputControl label="Date of Birth" type="date" />
              <Typography variant="body2" sx={{ color: "#949494" }}>
                On or after 1 April 1995
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className={router.asPath == "/profile-update" ? "show" : "hide"}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <InputControl label="School" type="text" />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputControl label="Class" type="text" />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputControl label="State" type="text" />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {router.asPath == "/profile-update" ? (
        <Button className={styles.SaveButton}>
          <Link href="/dashboard">Save Profile</Link>
        </Button>
      ) : (
        <Button className={styles.SaveButton}>
          <Link href="/dashboard">Save & Proceed</Link>
        </Button>
      )}
    </Container>
  );
};

export default Profile;
