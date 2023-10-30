"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import PartnerFilter from "./PartnerFilter";
import axios from "axios";

const PartnerDashboard = () => {

  const [totalData, setTotalData] = useState()

  useEffect(() => {
    const apiUrl = "https://merd-api.merakilearn.org/c4ca/totalData";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODc3NTg0NjYsImV4cCI6MTcxOTMxNjA2Nn0.UqNyrtf9o3A6UsmIPXXyFxmoy005w8t4n1WQKK8xGQA";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const partnerList = response?.data?.data;
        if (partnerList !== undefined) {
          setTotalData(partnerList); 
          // console.log(partnerList);
        } else {
          console.error("Data is undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

   
  

  return (
    <Box className="dashboardContainer">
      <Box
        sx={{
          display: "inline",
          fontSize: "22px",
          fontWeight: "800px",
          lineHeight: "28px",
          fontFamily:"Amazon Ember Display"
        }}
      >
        Overview
      </Box>
      <Box
        style={{ display: "flex", alignItems: "flex-start", gap: "32.161px" }}
      >
        <Box className="InfoBox">
          <Typography
            className="TextAlignment"
            style={{
              fontWeight: "700px",
              fontSize: "32px",
              fontFamily: "Amazon Ember Display",
            }}
          >
            {totalData?.totalUniqueSchools}
          </Typography>
          <Typography className="InfoTextStyle">
            Number of Schools Reached
          </Typography>
        </Box>
        <Box className="InfoBox">
          <Typography
            className="TextAlignment"
            style={{
              fontWeight: "700px",
              fontSize: "32px",
              fontFamily: "Amazon Ember Display",
            }}
          >
            {totalData?.totalTeachers}
          </Typography>
          <Typography className="InfoTextStyle">
            Total Number of Teachers
          </Typography>
        </Box>
        <Box className="InfoBox">
          <Typography
            className="TextAlignment"
            style={{
              fontWeight: "700px",
              fontSize: "32px",
              fontFamily: "Amazon Ember Display",
            }}
          >
            {totalData?.totalStudents}
          </Typography>
          <Typography className="InfoTextStyle">Number of Students</Typography>
        </Box>
        <Box className="InfoBox">
          <Typography
            className="TextAlignment"
            style={{
              fontWeight: "700px",
              fontSize: "32px",
              fontFamily: "Amazon Ember Display",
            }}
          >
            {totalData?.totalProjectsSubmission}
          </Typography>
          <Typography className="InfoTextStyle">
            Total Projects Submitted
          </Typography>
        </Box>
      </Box>
      <div style={{ marginTop: "30px" }}>
        <Box
          sx={{
            display: "inline",
            fontSize: "25px",
            fontWeight: "700",
            fontFamily: "Amazon Ember Display",
          }}
        >
          Partner List
        </Box>
      </div>
      <PartnerFilter />
    </Box>
  );
};

export default PartnerDashboard;
