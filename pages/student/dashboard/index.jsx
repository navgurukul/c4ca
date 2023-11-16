import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Box,
  Button,
  CircularProgress,
  CardActions,
  Avatar,
} from "@mui/material";
import OverView from "../../../components/studentDashboard/OverView";
import Module from "../../../components/studentDashboard/Module";
import customAxios from "../../../api"; // Import your custom Axios instance

const images = [
  "/assets/medal1.svg",
  "/assets/medal2.svg",
  "/assets/medal3.svg",
];

const Dashboard = () => {
  const [showAllTeams, setShowAllTeams] = useState(false);

  const [Leaderboard, setLeaderboard] = useState([]);

  const [token, setToken] = useState("");

  const initialTeamCount = 3;
  const handleSeeAllTeamsClick = () => {
    setShowAllTeams(true);
  };

  // Function to shuffle the images array
  const shuffleImages = () => {
    const shuffledImages = [...images];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [
        shuffledImages[j],
        shuffledImages[i],
      ];
    }
    return shuffledImages;
  };
  useEffect(() => {
      const authToken = JSON.parse(localStorage.getItem("AUTH"));
      setToken(authToken?.data?.token)
    customAxios
      .get("/c4ca/teams", {
        headers: {
          Authorization: authToken.data.token,
        },
      })
      .then((res) => {
        console.log(res.data.data, "leaderboard");
        setLeaderboard(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const [team, setTeam] = useState({});
  useEffect(() => {
    const teamData = JSON.parse(localStorage.getItem("AUTH"));
    const authToken = teamData.data.token;

    customAxios
      .get(`/c4ca/team/${teamData.data.id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((res) => {
        console.log(res.data, "team data");
        setTeam(res.data.data);
      });
  }, []);
   const highlightedTeamName = team.team_name;
   const highlightedTeamIndex = Leaderboard.findIndex((item) => item.team_name === highlightedTeamName);
   const calculateProgress = (team) => {
    return team.completed_portion || 0;
  };
  console.log("highlightedTeamIndex",highlightedTeamIndex<3)

  return (
    <Container sx={{ marginTop: "3%" }} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Box sx={{ display: "flex", mb: "32px" }}>
            <Typography variant="h5">
              Welcome, Team{" "}
              <Typography
                variant="h5"
                style={{ textTransform: "capitalize" }}
                component="span"
                color="#F55C38"
              >
                {team.team_name}
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mt: 2, mb: "32px" }}>
            <Typography variant="h6">
              Overall Progress: {team.completed_portion}%
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "50%",
              padding: "5px",
            }}
          >
            <LinearProgress
              variant="determinate"
              // value={30}
              value={team.completed_portion || 0}
              sx={{
                borderRadius: "6px",
                backgroundColor: "white",
                height: "10px",
              }}
            />
          </Box>

          <OverView />
          <Module />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ border: 1, borderColor: "gray", borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="subtitle1">Leaderboard</Typography>
              <Typography variant="body2">
                See how the teams in your district are doing
              </Typography>
              <Box sx={{ maxHeight: 350, overflowY: "auto" }}>
                {Leaderboard.slice(
                  0,
                  showAllTeams ? Leaderboard.length : initialTeamCount
                ).map((team, index) => (
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ mt: 1,
                      
                      backgroundColor:
                      !showAllTeams && index < 3 && team.team_name === highlightedTeamName
                          ? "#D4DAE8"
                          : "transparent",
                    }}
                    key={index}
                  >
                    <Grid  item  mb = {!showAllTeams && index < 3 &&2}>
                      {index < 3 && (
                        <img
                          src={images[index]}
                          alt={`Medal ${index + 1}`}
                          style={{ width: "100%" }}
                        />
                      )}
                      <Typography sx={{marginRight:"25px" ,ml:1}} variant="body2">
                      {index >= 3 && team.rank}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}  mb = {!showAllTeams && index < 3 &&2}>
                      <Box>
                        <Typography variant="body1">
                          {team.team_name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item  mb = {!showAllTeams && index < 3 &&2}>
                      <CircularProgress
                        variant="determinate"
                        value={team.completed_portion}
                        size={25}
                        thickness={6}
                      />
                    </Grid>
                    <Grid item  mb = {!showAllTeams && index < 3 &&2}>
                      <Typography variant="body2">
                        {team.completed_portion}%
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
              {highlightedTeamIndex > 3&& !showAllTeams && (<Box sx={{ mt: 2, ml:2 }}> <img src="/assets/separator.svg" alt="Separator" /> </Box>)}

              {highlightedTeamIndex > 3 && !showAllTeams && (
                  <Grid container spacing={2} alignItems="center" mb={2}
                    sx={{mt: 1, width:'110%', backgroundColor:  team.team_name === highlightedTeamName? "#D4DAE8": "transparent", }} >
                    <Grid  item mb={2} ml={1}>
                      <Typography sx={{marginRight:"25px"}} variant="body2">
                      {highlightedTeamIndex !== -1 && (
                        <Typography variant="body1">
                          {highlightedTeamIndex + 1}
                        </Typography>
                      )}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}  mb={2}>
                      <Box>
                        <Typography variant="body1">
                          {team.team_name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item  mb={2}>
                      <CircularProgress
                        variant="determinate"
                        value={
                          highlightedTeamIndex !== -1
                            ? calculateProgress(Leaderboard[highlightedTeamIndex]) 
                            : 0
                        }
                        size={25}
                        thickness={6}
                      />
                    </Grid>
                    <Grid item  mb={2}>
                      <Typography variant="body2">
                        {highlightedTeamIndex !== -1
                        ? `${calculateProgress(Leaderboard[highlightedTeamIndex])}%`
                        : ""}
                      </Typography>
                    </Grid>
                  </Grid>          
              )}
                 
              {/* <Typography> need to show  </Typography> */}
              {Leaderboard.length > initialTeamCount && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  Button
                  variant="text"
                  onClick={() => setShowAllTeams(!showAllTeams)}
                >
                  {!showAllTeams && "See All Teams"}
                </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card
            sx={{
              mt: "32px",
              border: 1,
              borderColor: "gray",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <img src="/assets/scratch.svg" alt="" />
                <Typography variant="subtitle1">
                  Develop your skills in Scratch
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: 3, mt: 2, alignItems: "center" }}
              >
                <Button
                  type="button"
                  className="btn-lg"
                  sx={{
                    borderRadius: 0,
                  }}
                >
                  <a
                    href={`https://scratch.merakilearn.org/login/?studentAuth=${token}`}
                    target="_blank"
                  >
                    Scratch Web{" "}
                  </a>
                  <img src="/assets/launch.svg" alt="" />
                </Button>
              </Box>
              <Box
                sx={{ display: "flex", gap: 3, mt: 2, alignItems: "center" }}
              >
                <Button
                  type="button"
                  className="btn-lg"
                  sx={{
                    borderRadius: 0,
                  }}
                >
                  {/* <span style={{ flex: 1 }}>Download Meraki App</span> */}
                  <a
                    href="https://play.google.com/store/apps/details?id=org.merakilearn&hl=en_IN&gl=US&pli=1"
                    target="_blank"
                  >
                    Download Meraki App{" "}
                  </a>
                  <img src="/assets/launch1.svg" alt="" />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
