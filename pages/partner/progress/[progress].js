"use client"
import React from "react";
import Link from "@mui/material/Link";
import { Avatar, Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import girlImage from "../../../public/assets/girlImage.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import customAxios from "@/api";

function Progress() {

  const router = useRouter(); 
  const { progress } = router.query;
  console.log(progress);  
  console.log(router.query);  
  
  const [data, setData] = useState(null);
  const [partnerName, setPartnerName] = useState(null);

  useEffect(() => {
    if (progress) {
      console.log(progress);
      const apiUrl = `/c4ca/${progress}`;
      const token = localStorage.getItem("token");
      customAxios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response?.data?.data);
          const datae = response?.data?.data;
          const partnerName = response?.data?.data;
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
  }, [progress]);
  
const [teamsData, setTeamsData] = useState([])
   
  useEffect(() => {
    if (progress) {
      console.log(progress);
      const apiUrl = `/c4ca/teacher/teams/${progress}`;
      const token = localStorage.getItem("token");
      customAxios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response?.data?.data); 
          const teamsData = response?.data?.data;  
          if (teamsData !== undefined) {
            setTeamsData(teamsData);
          } else {
            console.error("Data is undefined.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [progress]);

  const student = [
    { Color: "red", lesson: "Intro to Scratch", status: "Submitted" },
    { Color: "red", lesson: "Intro to Scratch", status: "Submitted" },
    { Color: "red", lesson: "Intro to Scratch", status: "Submitted" },
  ];
  return (
    <Box style={{ marginLeft: "7.5%", marginRight: "20%" }}>
      <Box style={{ lineHeight: "5" }}>
        <Link
          color="inherit"
          href="/"
          style={{
            color: "#29458C",
            fontSize: "16px",
            fontWeight: "500px",
            fontFamily: "Amazon Ember",
          }}
        >
          Home / {data?.partner_name} / {data?.facilitator_name} /{" "}
          <span style={{ color: "#BDBDBD" }}>{data?.teacher_name} </span>
        </Link>
      </Box>
      <Box
        style={{
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <img
          src="/assets/girlImage.png"
          alt="StudentProfile"
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "60px",
            marginTop: "10px",
          }}
        />
        <Box style={{ marginLeft: "25px", marginTop: "10px" }}>
          <Typography style={{ fontSize: "16px", fontFamily: "Noto Sans" }}>
            {" "}
            {data?.teacher_name}
          </Typography>
          <Typography style={{ color: "#2E2E2E", fontSize: "14px" }}>
             
          </Typography>
        </Box>
      </Box>
      <Typography
        style={{
          fontFamily: "Amazon Ember",
          fontSize: "16px",
          fontWeight: 600,
          marginTop: "30px",
        }}
        s
      >
        Teams Under Supervision
      </Typography>
      <Box style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          {teamsData.map((person, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                style={{
                  width: "90%",
                  height: "170px",
                  border: "1px solid #DEDEDE",
                  borderRadius: "5px",
                  padding: "10px",
                  background: "#fff",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  margin: "5px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "15px",
                    fontFamily: "Amazon Ember",
                    lineHeight: "35px",
                    fontWeight: "700px",
                  }}
                >
                  {person.team_name}
                </Typography>
                <hr
                  style={{
                    color: "#DEDEDE",
                    border: "none",
                    borderTop: "2px solid #DEDEDE",
                  }}
                />
                <Typography
                  style={{
                    fontSize: "15px",
                    fontFamily: "Amazon Ember",
                    lineHeight: "70px",
                    fontWeight: "700px",
                  }}
                >
                  {person.current_topic}
                </Typography>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontFamily: "Amazon Ember",
                    lineHeight: "35px",
                    fontWeight: "700px",
                  }}
                >
                   {person.current_topic}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Progress;
