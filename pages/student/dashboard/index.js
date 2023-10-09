import React from "react";
// import OverviewCard from "./overviewCard";
import OverviewCard from "@/pages/student/dashboard/overviewCard";
import {
  Typography,
  Container,
  Button,
  Card,
  Box,
  CardContent,
  LinearProgress,
} from "@mui/material";

function Dashboard() {
  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant="h6" align="left">
          Welcome, Team Skyriders
        </Typography>
        <Typography sx={{ mt: 4 }} variant="h6" align="left">
          Overall Progress: 50%{" "}
        </Typography>

        <LinearProgress
          variant="determinate"
          sx={{ mt: 2, width: "25%", height: "10px", borderRadius: "100px" }}
          value={50}
        />

        <OverviewCard />
      </Container>
    </div>
  );
}

export default Dashboard;
