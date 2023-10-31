import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import customAxios from "@/api";

const OverView = () => {
  const [attemptedAssessmentCount, setAttemptedAssessmentCount] = useState();
  const [teamCount, setTeamCount] = useState([]);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    customAxios
      .get("/c4ca/assessment/getAttemptAssessment", {
        headers: {
          Authorization: authToken.data.token,
        },
      })
      .then((response) => {
        const { attempted_assessment_count } = response.data.data;
        console.log(attempted_assessment_count);
        setAttemptedAssessmentCount(attempted_assessment_count);
      })
      .catch((error) => {
        console.error("API call error", error);
      });
  }, []);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    customAxios
      .get("/c4ca/teams", {
        headers: {
          Authorization: authToken.data.token,
        },
      })
      .then((res) => {
        console.log(res.data.data.length, "teamdata");
        setTeamCount(res.data.data.length);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Overview
        </Typography>
      </Box>

      <Grid container sx={{ mt: "32px" }} spacing={3}>
        <Grid item xs={12} sm={6} md={5}>
    
          <Card
            sx={{
              border: 1,
              borderColor: "gray",
              borderRadius: "8px",
           
            }}
          >
            <CardContent>
              <Typography variant="h5" align="left">
                {teamCount}
              </Typography>
              <Typography variant="body2">Total Number of Teams</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
  
          <Card
            sx={{
              border: 1,
              borderColor: "gray",
              borderRadius: "8px",
      
            }}
          >
            <CardContent>
              <Typography variant="h5" align="left">
                {attemptedAssessmentCount}
              </Typography>
              <Typography variant="body2">Questions Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
    
  );
};
export default OverView;
