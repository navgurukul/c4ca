import React from "react";
import { Container } from "@mui/material";
import ProfileUpdateBox from "@/components/forms/ProfileUpdateBox";
import Profile from "@/components/forms/Profile";

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
