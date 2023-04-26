import Profile from "@/components/forms/Profile";
import ProfileUpdateBox from "@/components/forms/ProfileUpdateBox";
import { Container } from "@mui/material";
import React from "react";

const ProfileUpdate = () => {
  return (
    <main>
      <Container maxWidth="lg">
        <ProfileUpdateBox />
      </Container>

      <Container sx={{mt: 8}}>
        <Profile />
      </Container>
    </main>
  );
};

export default ProfileUpdate;
