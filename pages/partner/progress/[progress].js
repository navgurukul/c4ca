"use client";
import React from "react";
import Link from "@mui/material/Link";
import { Avatar, Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import girlImage from "../../../public/assets/girlImage.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Troubleshoot } from "@mui/icons-material";
import customAxios from "@/api";
import MyBreadcrumbs from "@/components/breadcrumb/breadcrumb";

function Progress() {
  const router = useRouter();
  const { progress } = router.query;
  // console.log(progress);
  // console.log(router.query);

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

  //data populating from
  const [teamsData, setTeamsData] = useState();
  const [color, bgColor] = useState();
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
          const teamsData = response?.data?.data;
          if (teamsData !== undefined) {
            setTeamsData(teamsData);
            console.log("teamsData:", teamsData);
          } else {
            console.error("Data is undefined.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [progress]);
  
  let teacher_name;

  return (
    <Box style={{ marginLeft: "7.5%", marginRight: "20%" }}>
      <MyBreadcrumbs teacher_name={data?.teacher_name}/>
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
          <Typography
            style={{ color: "#2E2E2E", fontSize: "14px" }}
          ></Typography>
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
          {teamsData?.map((person, index) => (
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
                {/* <Typography
                  style={{
                    fontSize: "15px",
                    fontFamily: "Amazon Ember",
                    lineHeight: "35px",
                    fontWeight: "700px",
                  }}
                >
                  {person.team_name}
                </Typography> */}
                <Box display="flex" gap={5}>
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontFamily: "Amazon Ember",
                      lineHeight: "40px",
                      fontWeight: "700px",
                    }}
                  >
                    {person?.team_name
                      .split(" ")  
                      .slice(0, 5)  
                      .join(" ")} 
                    {person?.team_name.split(" ").length > 10 ? "..." : ""}
                  </Typography>
                  <Box style={{ marginTop: "10px" }}>
                    <CircularProgress
                      variant="determinate"
                      size={17}
                      value={person?.completed_portion}
                      style={{ color: "green" }}
                    />
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "10px",
                        fontFamily: "Amazon Ember",
                        marginBottom: "50px",
                      }}
                    >
                      {person?.completed_portion}%
                    </span>
                  </Box>
                </Box>
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
                    lineHeight: "50px",
                    fontWeight: "700px",
                  }}
                >
                  Current Lesson:{" "}
                  {person?.current_topic?.map((lessonName, index) => (
                    <span key={index}>
                      {lessonName.course_name === ""
                        ? lessonName.module_name
                        : lessonName.course_name}
                    </span>
                  ))}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontFamily: "Amazon Ember",
                      lineHeight: "35px",
                      fontWeight: "700px",
                    }}
                  >
                    Project Status:
                  </Typography>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor:
                        person?.Project_solution_submission === null
                          ? "red"
                          : person?.Project_solution_submission?.map(
                              (projectStatus, index) =>
                                projectStatus.is_submitted === false
                                  ? "red"
                                  : "green"
                            ),
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontFamily: "Amazon Ember",
                      lineHeight: "35px",
                      fontWeight: "700px",
                    }}
                  >
                    {person?.Project_solution_submission === null
                      ? "Yet to Submitted"
                      : person?.Project_solution_submission?.map(
                          (projectStatus, index) => (
                            <span key={index}>
                              {projectStatus.is_submitted === false
                                ? "Yet to Submitted"
                                : "Submitted"}
                            </span>
                          )
                        )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Progress;
