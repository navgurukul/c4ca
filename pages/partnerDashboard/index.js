"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import PartnerFilter from "./PartnerFilter";
 

const PartnerDashboard = () => {
  return (
    <Box className="dashboardContainer">
      <Box
        sx={{
          display: "inline",
          fontSize: "24px",
          fontWeight: "800",
          lineHeight: "28px",
        }}
      >
        Overview
      </Box>
      <Box
        style={{ display: "flex", alignItems: "flex-start", gap: "32.161px" }}
      >
        <Box className="InfoBox" >
          <Typography className="TextAlignment">200</Typography>
          <Typography className="InfoTextStyle">
            Number of Schools Reached
          </Typography>
        </Box>
        <Box className="InfoBox" >
          <Typography className="TextAlignment">200</Typography>
          <Typography className="InfoTextStyle">
            Total Number of Teachers
          </Typography>
        </Box>
        <Box className="InfoBox" >
          <Typography className="InfoTextStyle">200</Typography>
          <Typography className="InfoTextStyle">Number of Students</Typography>
        </Box>
        <Box className="InfoBox" >
          <Typography className="InfoTextStyle">200</Typography>
          <Typography className="InfoTextStyle">
            Total Projects Submitted
          </Typography>
        </Box>
      </Box>
      <PartnerFilter/>
    </Box>
  );
};

export default PartnerDashboard;
