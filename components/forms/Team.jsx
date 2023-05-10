import { Container, Typography, Box, useMediaQuery } from "@mui/material";
import InputControl from "./InputControl";
import { breakpoints } from "@/theme/constant";
import { useState } from "react";

const Team = () => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <Container maxWidth="sm" sx={{ display: "grid", gap: isMobile ? 2 : 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Team Details
      </Typography>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2">Select Team Size</Typography>

        <Box className="btnGrp">
          <Typography className="teamBtn" variant="subtitle1">
            3
          </Typography>
          <Typography className="teamBtn" variant="subtitle1">
            4
          </Typography>
          <Typography className="teamBtn" variant="subtitle1">
            5
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: "#949494" }}>
        Your team members will join your team when they login or see your invite
        if they already registered on the platform
      </Typography>

      <InputControl label="Team Name" type="text" />

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2">Team Member 1</Typography>
        <Typography variant="body1">User Name (You)</Typography>
      </Box>
      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2">Team Member 2</Typography>
        <InputControl label="Full Name" type="text" />
        <InputControl label="Email Address" type="email" />
      </Box>
      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2">Team Member 3</Typography>
        <InputControl label="Full Name" type="text" />
        <InputControl label="Email Address" type="email" />
      </Box>
    </Container>
  );
};

export default Team;
