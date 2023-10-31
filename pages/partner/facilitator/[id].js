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
  const [partnerName, setPartnerName] = useState();
  const [totalCountData, settotalCountData] = useState();

  useEffect(() => {
    if (id) {
      const apiUrl = `https://merd-api.merakilearn.org/c4ca/facilitator/getByPartnerId/${id}`;
      const token = localStorage.getItem("token");

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          const datae = response?.data?.data?.facilitatorsDetails;
          const partnerName = response?.data?.data?.partner_name;
          setData(datae);
          if (datae !== undefined) {
            setData(datae);
            setPartnerName(partnerName);
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
    if (id) {
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
          console.log(response?.data?.data);
          const totalData = response?.data?.data;
          if (totalData !== undefined) {
            settotalCountData(totalData);
          } else {
            console.error("Data is undefined.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  return (
    <Box className="dashboardContainer">
      <MyBreadcrumbs partnerName={partnerName} />
      <Typography
        style={{
          fontSize: "24px",
          fontWeight: "800px",
          fontFamily: "Amazon Ember Display",
          lineHeight: "75px",
        }}
      >
        {partnerName}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Typography variant="h6">{data?.name}</Typography>
      </Box>
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
        <Box className="InfoBox centerElements">
          <Typography
            variant="body1"
            fontWeight="bold"
            style={{
              fontWeight: "700px",
              fontSize: "32px",
              fontFamily: "Amazon Ember Display",
            }}
          >
            {totalCountData?.totalNoOfTeams || 0}
          </Typography>
          <Typography className="InfoTextStyle" >
            Total Number of Teams
          </Typography>
        </Box>
        <Box className="InfoBox centerElements">
          <Typography variant="body1" fontWeight="bold"   style={{
              fontWeight: "700px",
              fontSize: "32px",
              fontFamily: "Amazon Ember Display",
            }}>
            {totalCountData?.totalNoOfStundents || 0}
          </Typography>
          <Typography className="InfoTextStyle">Number of Students</Typography>
        </Box>
        <Box className="InfoBox centerElements">
          <Typography variant="body1" fontWeight="bold"   style={{
              fontWeight: "700px",
              fontSize: "32px",
              fontFamily: "Amazon Ember Display",
            }}>
            {totalCountData?.totalProjectsSubmitByTeams || 0}
          </Typography>
          <Typography className="InfoTextStyle">
            Total Projects Submitted
          </Typography>
        </Box>
      </Box>
      <Typography
        style={{
          fontFamily: "Amazon Ember Display",
          fontSize: "20px",
          fontWeight: "700px",
          marginTop: "30px",
          // lineHeight:"70px"
        }}
      >
        Facilitator List
      </Typography>
      <FacilitatorFilter data={data} id={id} />
    </Box>
  );
};

export default FacilatorHome;
