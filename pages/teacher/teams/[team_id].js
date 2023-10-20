import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const teamMemberData = [
  {
    id: 1,
    name: "Arti Singh",
    class: 5,
  },
  {
    id: 2,
    name: "Ravi Chandra Sharma",
    class: 5,
  },
  {
    id: 3,
    name: "Mani Kumar Sahu",
    class: 5,
  },
];
// const teamDetailData = [
//   {
//     id: 1,
//     name: "Flying Color",
//     user: "flyingcolors123",
//     password: "gistofthelock",
//     progress: 100,
//     current_lesson: "Intro to Scratch of Module 1",
//     project_status: "Submitted",
//     link: "https://scratch.merakilearn.org/team2/",
//   },
// ];

const TeamDetail = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          handleTooltipClose();
        }, 1000);
        console.log("Text copied to clipboard:", textToCopy);
      })
      .catch((error) => {
        console.error("Copy to clipboard failed: ", error);
      });
  };

  useEffect(() => {
    if (!params?.team_id) return;
    const apiUrl = `https://merd-api.merakilearn.org/c4ca/team/${params?.team_id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data, "data");
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
        // setError(err);
      });
  }, [params]);



  console.log(data, "data-------teammmmmm");    

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Grid container spacing={2}>
        <h1>{data.team_name}</h1>
        
        <Grid item xs={12} md={7} lg={7}>
          {/* {team.map((team) => ( */}
            <Box key={data.id}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, ml: 2 }}>
                <Typography variant="body1">
                  Dashboard{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ color: "#29458C" }}
                  >
                    / {data.team_name}
                  </Typography>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "4px",
                  ml: 2,
                  mt: "32px",
                }}
              >
                <Typography variant="h6">{data.team_name}</Typography>
              </Box>
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
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      placement="top"
                      title="Copy"
                    >
                      <Link
                        underline="none"
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          marginTop: "4px",
                        }}
                        onClick={() => {
                          copyToClipboard(
                            `User ID: ${team.user}\nPassword: ${data.password}`
                          );
                        }}
                      >
                        <CopyAllIcon />
                        <Typography variant="subtitle2">Copy</Typography>
                      </Link>
                    </Tooltip>
                  </>
                </ClickAwayListener>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "4px",
                  mb: "32px",
                  gap: "32px",
                  ml: 2,
                }}
              >
                <Grid container>
                  <Grid item xs={4}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <img src="/assets/icon-id.svg" alt="id" />
                      <Typography>{data.user}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <img src="/assets/security-password.svg" alt="passwrod" />
                      <Typography>{data.password}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Divider variant="middle" color="#DEDEDE" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "4px",
                  gap: 1,
                  mt: "32px",
                  mb: "16px",
                  ml: 2,
                }}
              >
                <Typography variant="subtitle1">Course Progress:</Typography>
                <CircularProgress
                  variant="determinate"
                //   value={team.progress}
                  color="success"
                  size={25}
                  thickness={6}
                />
                <Typography variant="body1" mr={3}>
                  {data.progress} %
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "4px",
                  mb: "32px",
                  ml: 2,
                }}
              >
                <Grid container>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      margin: "0",
                    }}
                  >
                    Currently at Lesson:
                    {/* <Link
                      href={team.current_lesson}
                      underline="none"
                      sx={{ display: "flex", alignItems: "flex-start", ml: 1 }}
                    >
                      <Typography variant="body1">
                        {data.current_lesson}
                      </Typography>
                    </Link> */}
                  </Typography>
                </Grid>
              </Box>
              <Box>
                <Divider variant="middle" color="#DEDEDE" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "4px",
                  gap: 1,
                  mt: "32px",
                  mb: "16px",
                  ml: 2,
                }}
              >
                <Typography variant="subtitle1">Project Status:</Typography>
                <FiberManualRecordIcon color="success" />
                <Typography variant="body1">Submitted</Typography>
              </Box>
              {/* <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "4px",
                  mb: "32px",
                  ml: 2,
                }}
              >
                <Grid container>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      margin: "0",
                    }}
                  >
                    Link :
                    <Link href={team.link} underline="always" ml={1}>
                      <Typography variant="body1">{data.link}</Typography>
                    </Link>
                  </Typography>
                </Grid>
              </Box> */}
            </Box>
          {/* ))} */}
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
                <Grid item xs={6} sx={{ alignSelf: "flex-start" }}>
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
                    <img src="/assets/Student.svg" alt="Team Image" />
                    <Typography>{teamMemberData.length}</Typography>
                  </Box>
                </Grid>
              </Grid>
              {teamMemberData.map((team, index) => (
                <Grid container spacing={3} sx={{ mt: 1 }} key={index}>
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
                          marginTop: "4px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ marginRight: "9px", alignSelf: "flex-start" }}
                        >
                          {team.name}
                        </Typography>
                        <Chip
                          label={`Class ${team.class}`}
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
