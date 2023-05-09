import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import InputControl from "../forms/InputControl";
import { CalendarMonth } from "@mui/icons-material";
import { breakpoints } from "@/theme/constant";
import DragDropZone from "./DragDropZone";
import ProjectSubmitted from "./Completed";

const Submission = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <>
      {!show ? (
        <Container
          maxWidth="lg"
          sx={{ display: "grid", placeItems: "center", gap: 4 }}
        >
          <Typography variant="h5">Your Submission</Typography>

          <Container
            maxWidth="sm"
            sx={{ display: "grid", gap: isMobile ? 2 : 4 }}
          >
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CalendarMonth sx={{ color: "#29458C" }} /> 23 days left to
              submission
            </Typography>

            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant="body2">Your Team</Typography>
              <Typography variant="subtitle1">Team Name</Typography>
            </Box>

            <InputControl label="Project Title" type="text" />

            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant="body2">Project Summary</Typography>
              <textarea
                rows="4"
                placeholder="Write Project Summary..."
              ></textarea>
            </Box>

            <InputControl label="Share Scratch Project Link" type="text" />

            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant="body2">Or, Upload project file</Typography>
              <DragDropZone />
            </Box>
          </Container>

          <Button className="profileBtn" onClick={handleShow}>
            <Typography variant="ButtonLarge">Submit Project</Typography>
          </Button>
        </Container>
      ) : (
        <ProjectSubmitted />
      )}
    </>
  );
};

export default Submission;
