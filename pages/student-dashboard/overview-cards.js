import React from "react";
import {
  Typography,
  Container,
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  LinearProgress,
} from "@mui/material";

const studentData = [
  {
    name: "All Time Metric",
    total: 200,
  },
  {
    name: "Active Volunteers",
    total: 140,
  },
  {
    name: "Total Number",
    total: 150,
  },
];

const OverviewCard = () => {
  console.log(studentData, "studentData");
  return (
    <Container maxWidth="ms">
      <Grid container spacing={2}>
        {studentData.map((item) => (
          <Grid item xs={12} ms={6} md={4}>
            <Card>
              <CardContent>
                <Typography>{item.name}</Typography>
                <Typography>{item.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OverviewCard;
