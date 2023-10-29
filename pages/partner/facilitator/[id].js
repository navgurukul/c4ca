"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FacilatorTable from "./FacilatorTable";
import { useRouter } from "next/router";
import MyBreadcrumbs from "@/components/breadcrumb/breadcrumb";
import axios from "axios";
import FacilitatorFilter from "./FacilitatorFilter";

const FacilatorHome = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (id) {
      const apiUrl = `https://merd-api.merakilearn.org/c4ca/facilitator/getByPartnerId/${id}`;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODc3NTg0NjYsImV4cCI6MTcxOTMxNjA2Nn0.UqNyrtf9o3A6UsmIPXXyFxmoy005w8t4n1WQKK8xGQA";

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const datae = response?.data?.data;
          setData(datae);
          if (datae !== undefined) {
            setData(datae);
          } else {
            console.error("Data is undefined.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  //fetching the total data
  useEffect(() => {
    const apiUrl = `https://merd-api.merakilearn.org/c4ca/totalData?partner_id=${id}`;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODc3NTg0NjYsImV4cCI6MTcxOTMxNjA2Nn0.UqNyrtf9o3A6UsmIPXXyFxmoy005w8t4n1WQKK8xGQA";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const partnerList = response.data.partners;
        if (partnerList !== undefined) {
          setAllPartner(partnerList); 
          console.log(partnerList);
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
      <MyBreadcrumbs />
      <Typography
        style={{
          fontSize: "24px",
          fontWeight: "800px",
          fontFamily: "Amazon Ember Display",
          lineHeight: "75px",
        }}
      >
        Aarti for Girls
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Typography variant="h6">{data?.name}</Typography>
      </Box>
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
        <Box className="InfoBox centerElements">
          <Typography variant="body1" fontWeight="bold">
            0
          </Typography>
          <Typography className="InfoTextStyle">
            Total Number of Teams
          </Typography>
        </Box>
        <Box className="InfoBox centerElements">
          <Typography variant="body1" fontWeight="bold">
            0
          </Typography>
          <Typography className="InfoTextStyle">Number of Students</Typography>
        </Box>
        <Box className="InfoBox centerElements">
          <Typography variant="body1" fontWeight="bold">
            0
          </Typography>
          <Typography className="InfoTextStyle">
            Total Projects Submitted
          </Typography>
        </Box>
      </Box>
      <FacilitatorFilter data={data} id={id} />
    </Box>
  );
};

export default FacilatorHome;
