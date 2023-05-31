import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { CalendarMonth } from "@mui/icons-material";
import InputControl from "../forms/InputControl";
import { breakpoints } from "@/theme/constant";
import DragDropZone from "./DragDropZone";
import ProjectSubmitted from "./Completed";
import { FormProvider, useForm } from "react-hook-form";
import {
  Project_Link_Validation,
  Project_Name_Validation,
  Project_Summary_Validation,
} from "../validation";

const Submission = (props) => {
  const methods = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    setTimeout(() => {
      setShow(true);
    }, 1000);
  });

  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <>
      {!show ? (
        <Container
          maxWidth="sm"
          disableGutters
          sx={{ display: "grid", placeItems: "center", gap: 4 }}
        >
          <Typography variant="h5" color="text.primary">
            {props.show ? "Re-Submit Project" : "Your Submission"}
          </Typography>

          <FormProvider {...methods}>
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              autoComplete="off"
              style={{ display: "grid", gap: isMobile ? "16px" : "32px" }}
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

              <InputControl {...Project_Name_Validation} />

              <InputControl {...Project_Summary_Validation} />

              {/* project link submission zone */}
              <InputControl {...Project_Link_Validation} />

              {/* project drag-drop zone */}
              <Box sx={{ display: "grid", gap: 1 }}>
                <Typography variant="body2">Or, Upload project file</Typography>
                <DragDropZone />
              </Box>

              {props.show ? (
                <Box className="btnGrp" sx={{ justifyContent: "space-around" }}>
                  <Button className="profileBtn" onClick={onSubmit}>
                    <Typography variant="ButtonLarge">
                      Submit Project
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ minWidth: isMobile ? 120 : 200 }}
                  >
                    <Link href="/dashboard">
                      <Typography variant="ButtonLarge">Cancel</Typography>
                    </Link>
                  </Button>
                </Box>
              ) : (
                <Button className="profileBtn" onClick={onSubmit}>
                  <Typography variant="ButtonLarge">Submit Project</Typography>
                </Button>
              )}
            </form>
          </FormProvider>
        </Container>
      ) : (
        <ProjectSubmitted />
      )}
    </>
  );
};

export default Submission;
