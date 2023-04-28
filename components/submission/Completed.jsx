import React from "react";
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const Completed = () => {
  return (
    <main>
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Your Submission
        </Typography>

        <Box sx={{ margin: "32px 0", display: "grid", gap: 4 }}>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CheckCircle sx={{ color: "#219464" }} />
            Submitted on 8 April 2023
          </Typography>

          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="subtitle1">Project Title</Typography>
            <Typography variant="body1" sx={{ color: "#2e2e2e" }}>
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt mollit dolore cillum minim tempor
              enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
              voluptate aute id deserunt nisi.
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="subtitle1">Scratch Project Link</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CardMedia
                component="img"
                image="/project.svg"
                sx={{ width: 48, height: 48 }}
              />
              <Typography variant="body1">Hello world.sb3</Typography>
            </Box>
          </Box>
        </Box>

        <Button
          className="Button"
          sx={{ minWidth: 240, display: "block", margin: "32px auto 0" }}
        >
          Re-Submit Project
        </Button>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#949494", mt: 2 }}
        >
          You may do as many submissions as necessary until 15th June 2023
        </Typography>
      </Container>
    </main>
  );
};

export default Completed;
