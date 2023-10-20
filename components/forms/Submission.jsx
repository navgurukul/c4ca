import React from "react";
import InputControl from "./InputControl";
import DropZone from "./DropZone";

import { Container, Typography, Button, Box } from "@mui/material";
import DragDropZone from "../submission/DragDropZone";

const Submission = ({ setIsSubmitted }) => {
  return (
    <Container maxWidth="sm" sx={{ display: "grid", gap: 4, mt: 4 }}>
      <Typography variant="h6" align="center">
        Your Submission
      </Typography>

      <Typography variant="body2">23 days left to submission</Typography>
      <Typography variant="body2">
        Your Team
        {/* <Typography variant="subtitle1">SkyRiders</Typography> */}
      </Typography>

      <InputControl label="Project Title" type="text" />

      <InputControl label="Project Summary" type="text" />

      <InputControl label="Share Scratch Project Link" type="text" />

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="body2">Or, Upload project file</Typography>
        <DragDropZone />
      </Box>

      <Button
        color="primary"
        onClick={() => setIsSubmitted(true)}
        variant="contained"
        sx={{ minWidth: 240, margin: "32px auto 0", mb: 3 }}
      >
        Submit Project
      </Button>
    </Container>
  );
};

export default Submission;
