import React from "react";

import InputControl from "./InputControl";
import DropZone from "./DropZone";


import { Container, Typography, Grid, Button } from "@mui/material";

const ReSubmission = () => {
  return (
    <Container maxWidth="sm" sx={{ display: "grid", gap: 4, mt: 4 }}>
      <Typography variant="h6" align="center">
        Re-Submit Project
      </Typography>

      <Typography variant="body2">23 days left to submission</Typography>
      <Typography variant="body2">
        Your Team
        {/* <Typography variant="subtitle1">SkyRiders</Typography> */}
      </Typography>

      <InputControl label="Project Title" type="text" />

      <InputControl label="Project Summary" type="text" />

      <InputControl label="Share Scratch Project Link" type="text" />

      <DropZone label="Or, Upload project file" type="text" />

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item md={6} xs={12}>
          <Button
            color="primary"
            variant="contained"
            sx={{
              minWidth: 240,
              display: "block",
              margin: "30px auto 0",
            }}>
            Submit Project
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              minWidth: 240,
              display: "block",
              margin: "30px auto 0",
            }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReSubmission;
