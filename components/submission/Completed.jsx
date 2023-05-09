import { useState } from "react";
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Submission from "./Submission";
// import ProjectReSubmission from "./ReSubmission";

const ProjectSubmitted = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {!show ? (
        <Container
          maxWidth="lg"
          sx={{ display: "grid", placeItems: "center", gap: 4 }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Your Submission
          </Typography>

          <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
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
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gap: 2 }}>
              {/* <Typography variant="subtitle1">Scratch Project Link</Typography>
            <Box className="drop-file-preview__item__info">
              <Typography variant="body1">Project Link</Typography>
            </Box> */}
              <Typography variant="subtitle1">Scratch Project File</Typography>
              <Box className="drop-file-preview__item__info">
                <img src="/project.svg" alt="" />
                <Typography variant="body1">File_Name.sb3</Typography>
              </Box>
            </Box>
          </Container>

          <Button className="profileBtn" onClick={handleShow}>
            Re-Submit Project
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#949494", mt: -2 }}
          >
            You may do as many submissions as necessary until 15th June 2023
          </Typography>
        </Container>
      ) : <Submission/>}
    </>
  );
};

export default ProjectSubmitted;
