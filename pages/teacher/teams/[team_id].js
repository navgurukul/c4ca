import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import customAxios from "../../../api"; // Import your custom Axios instance
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
  Button,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CopyAll from "@mui/icons-material/CopyAll";
import Divider from "@mui/material/Divider";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Link from "next/link";

const TeamDetail = () => {
  const [data, setData] = useState({});
  const [projectTopic, setProjectTopic] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const params = useParams();

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    if (!params?.team_id) return;
    const apiUrl = `/c4ca/team/${params?.team_id}`;

    customAxios
      .get(apiUrl, {
        headers: {
          Authorization: authToken.token,
        },
      })
      .then((response) => {
        console.log("Success fetching data:", response);
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
        // setError(err);
      });
  }, [params]);

  const teamMemberData = data.team_members || [];

  

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    console.log("authToken", authToken);
    customAxios
      .get("/c4ca/projectTopic", {
        headers: {
          Authorization: authToken.token,
        },
      })
      .then((response) => {
        console.log("Projct Topic:", response);
      })
      .catch((error) => {
        // console.error("Error fetching data:", error);
      });
  }, []);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} lg={7}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/teacher/teams" underline="none">
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#29458C",
                }}
              >
                Dashboard
              </Typography>
            </Link>

            <Typography variant="body1" component="span">
              <span>/</span>
              {data.team_name}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: "32px",
              ml: 2,
            }}
          >
            {data.team_name}
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: "4px",
                gap: 2,
                mt: "32px",
                mb: "16px",
                ml: 2,
              }}
            >
              <Typography variant="subtitle1">Team Login Details</Typography>
              <Button
                sx={{ fontSize: 15 }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `User ID: ${data.login_id}\nPassword: ${data.password}`
                  );
                  handleSnackbarOpen("Text Copied to Clipboard");
                }}
                variant="text"
              >
                <CopyAll style={{ color: "gray" }} /> Copy
              </Button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Adjust as needed
                onClose={handleSnackbarClose}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  severity="success"
                  onClose={handleSnackbarClose}
                >
                  {snackbarMessage}
                </MuiAlert>
              </Snackbar>
            </Box>
            <Grid container sx={{ mb: "32px" }}>
              <Grid item xs={4} ml={2}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <img src="/assets/icon-id.svg" alt="id" />
                  <Typography>{data.login_id}</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <img src="/assets/security-password.svg" alt="passwrod" />
                  <Typography>{data.password}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" color="#DEDEDE" alignItems="flex-start" />
          <Box ml={2}>
            <Grid container sx={{ mb: "16px", mt: "32px" }}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                Course Progress:
              </Typography>
              <CircularProgress
                variant="determinate"
                value={data.completed_portion}
                color="success"
                size={25}
                thickness={6}
                sx={{ mr: 1 }}
              />
              <Typography variant="body1" mr={3}>
                {data.completed_portion}%
              </Typography>
            </Grid>
            <Grid container mb="32px">
              <Typography
                variant="body1"
                component="div"
                sx={{ display: "flex" }}
              >
                Currently at Lesson:
                <Link
                  href="{team.current_lesson}"
                  underline="none"
                  sx={{ display: "flex", alignItems: "flex-start", ml: 1 }}
                >
                  <Typography variant="body1">
                    Intro to Scratch of Module 1
                  </Typography>
                </Link>
              </Typography>
            </Grid>
          </Box>
          <Divider variant="middle" color="#DEDEDE" alignItems="flex-start" />
          <Box sx={{ display: "flex", mr: 2, alignItems: "baseline" }}>
            <Grid container sx={{ mb: "16px", mt: "32px", display: "flex" }}>
              <Box sx={{ display: "flex", marginLeft: 2 }}>
                {projectTopic && projectTopic.data !== null ? (
                  <>
                    <Typography variant="subtitle1">Project Status:</Typography>
                    <FiberManualRecordIcon
                      color="success"
                      sx={{ paddingTop: "4px", fontSize: "28px" }}
                    />
                    <Typography variant="body1">Submitted</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle1">Project Status:</Typography>
                    <FiberManualRecordIcon
                      color="error"
                      sx={{ paddingTop: "4px", fontSize: "28px" }}
                    />
                    <Typography variant="body1">To be Submitted</Typography>
                  </>
                )}
              </Box>
            </Grid>

            {/* <Grid container mb="32px">
              <Typography
                variant="body1"
                component="div"
                sx={{ display: "flex" }}
              >
                Link:
                <Link
                  href="{team.current_lesson}"
                  underline="none"
                  sx={{ display: "flex", alignItems: "flex-start", ml: 1 }}
                >
                  <Typography variant="body1">
                    https://scratch.merakilearn.org/team2
                  </Typography>
                </Link>
              </Typography>
            </Grid> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4} mt={9}>
          <Card sx={{ border: 1, borderColor: "gray", borderRadius: "8px" }}>
            <CardContent>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                sx={{ mt: 1 }}
              >
                <Grid item sx={{ alignSelf: "flex-start" }}>
                  <Typography variant="subtitle1">Team Members</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box
                    spacing={3}
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <img src="/img.svg" alt="Team Image" />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {teamMemberData.length}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {data.team_members?.map((member, index) => (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="body2">
                        Student Name {index + 1}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          marginTop: "10px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ mr: "10px", alignSelf: "flex-start" }}
                        >
                          {member.name}
                        </Typography>
                        <Chip
                          label={`Class ${member.class}`}
                          size="small"
                          sx={{
                            backgroundColor: "#FFAD33",
                            alignSelf: "flex-start",
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeamDetail;
