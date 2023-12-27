"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PartnerFilter from "./PartnerFilter";
import customAxios from "@/api";
import {Typography,Grid,Box,Card,CardContent, Container,} from "@mui/material";

const PartnerDashboard = () => {

  const [totalData, setTotalData] = useState();

  useEffect(() => {
    const apiUrl = "/c4ca/totalData";
    const token = localStorage.getItem("token");
    customAxios
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
    <Container maxWidth="xl" >
      <Box sx={{ display: "flex", mb: "32px" }}>
        <Typography variant="h6" sx={{ mt: 4 }}>
        Overview
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}> 
          <Card sx={{ border: 1,borderColor: "gray",borderRadius: "8px", p:"24px" }} >
            <CardContent>
              <Typography variant="h5" align="left" mb={"16px"}>
                {totalData?.totalUniqueSchools || 0}
              </Typography>
              <Typography variant="body1">Number of Schools Reached</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card sx={{ border: 1, borderColor: "gray", borderRadius: "8px",p:"24px"}}>
            <CardContent>
            <Typography variant="h5" align="left" mb={"16px"}>
              {totalData?.totalTeachers || 0}
            </Typography>
            <Typography variant="body1">Total Number of Teachers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card sx={{ border: 1, borderColor: "gray", borderRadius: "8px",p:"24px"}}>
            <CardContent>
              <Typography variant="h5" align="left" mb={"16px"}>
                {totalData?.totalStudents || 0}
              </Typography>
              <Typography variant="body1">Number of Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Card sx={{ border: 1, borderColor: "gray", borderRadius: "8px",p:"24px"}}>
            <CardContent>
              <Typography variant="h5" align="left" mb={"16px"}>
                {totalData?.totalProjectsSubmission || 0}
              </Typography>
              <Typography variant="body1">Total Projects Submitted</Typography>
            </CardContent>
          </Card>
        </Grid> 
      </Grid>
      <Box sx={{ marginTop: "30px", display: "flex" }}>
        <Typography variant="h6" mb={"16px"}>
          Partner List
        </Typography>
      </Box>
      <PartnerFilter />
    </Container>
  );
};

export default PartnerDashboard;






