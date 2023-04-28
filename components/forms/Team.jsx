import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import InputControl from "./InputControl";

const Team = () => {
  return (
    <Container maxWidth="sm" sx={{ display: "grid", rowGap: 4 }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Team Details
      </Typography>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2">Select Team Size</Typography>
        <Box className="btnGroup">
          <Button className="teamBtn">3</Button>
          <Button className="teamBtn">4</Button>
          <Button className="teamBtn">5</Button>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: "#949494" }}>
        Your team members will join your team when they login or see your invite
        if they already registered on the platform
      </Typography>

      <InputControl label="Team Name" type="text" />

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2" sx={{ color: "#2e2e2e" }}>
          Team Member 1
        </Typography>
        <InputControl label="Full Name" type="text" />
        <InputControl label="Email Address" type="email" />
      </Box>
      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2" sx={{ color: "#2e2e2e" }}>
          Team Member 2
        </Typography>
        <InputControl label="Full Name" type="text" />
        <InputControl label="Email Address" type="email" />
      </Box>
      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2" sx={{ color: "#2e2e2e" }}>
          Team Member 3
        </Typography>
        <InputControl label="Full Name" type="text" />
        <InputControl label="Email Address" type="email" />
      </Box>
    </Container>
  );
};

export default Team;
