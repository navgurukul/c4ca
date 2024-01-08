import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  TextField,
} from "@mui/material";
import InputControl from "../../../../components/forms/InputControl";
import { breakpoints } from "@/theme/constant";
import DragDropZone from "../../../../components/submission/DragDropZone";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import customAxios from "@/api";

const Submission = (props) => {
  const [inputControlValue, setInputControlValue] = useState("");
  const [dragDropZoneValue, setDragDropZoneValue] = useState([]);
  const [linkShow, setLinkShow] = useState(true);
  const [projectShow, setprojectShow] = useState(false);
  const [project, setProject] = useState(null);

  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px");
  const handleSubmit = () => {
    setLinkShow(false);
    setprojectShow(false);
  };

  console.log("value", props.values);
  const isSubmitDisabled = !inputControlValue && dragDropZoneValue.length === 0;

  const handleInputControlChange = (value) => {
    setInputControlValue(value);
    console.log(inputControlValue);
    // value is not showing on conosle
  };

  const handleDragDropZoneChange = (files) => {
    setDragDropZoneValue(files);
    console.log("file", dragDropZoneValue);
    // file data is not showing.
  };

  // useEffect(() => {
  //   const authToken = JSON.parse(localStorage.getItem("AUTH"));
  //   customAxios
  //     .get("/c4ca/projectTopic/3", {
  //       headers: {
  //         Authorization: authToken.data.token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.data, "leaderboard");
  //       setProject(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: "grid", placeItems: "center", gap: 4, paddingY: 5 }}
      >
        <Container
          maxWidth="sm"
          sx={{ display: "grid", gap: isMobile ? 2 : 4 }}
        >
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Dashboard /{" "}
            <Typography variant="body1" component="span" color="#29458C">
              Submit Project Solution
            </Typography>
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} gap="32px">
              <Card
                sx={{
                  border: 1,
                  borderColor: "gray",
                  borderRadius: "8px",
                  width: "90%",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ mb: 2 }}
                  >
                    <img src="/idea.svg" alt="projects" />
                    <Typography variant="h6">{project?.totalSubmitTopic} Projects</Typography>
                  </Box>
                  <Typography variant="body1" color="#6D6D6D">
                    Submitted Till Now
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Team{" "}
            <Typography variant="h6" textTransform={"capitalize"} component="span" color="#F55C38">
              {project && project?.project[0].team_name}
            </Typography>
          </Typography>
          {project && (
            <Box>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
              {project && project?.project[1].project_title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
              >
              {project && project?.project[1].project_summary}
              </Typography>
            </Box>
          )}
          {!project && (
            <>
              <InputControl
                label="Project Title"
                type="text"
                onChange={handleInputControlChange}
              />
              <Box sx={{ display: "grid", gap: 1, backgroundColor: "pink" }}>
                <Typography variant="body2" color="text.primary">
                  Project Summery
                </Typography>
                <TextField multiline rows={4} maxRows={4} />
              </Box>
              {linkShow && (
                <>
                  {!isSubmitDisabled && (
                    <>
                      <Divider />
                      <Typography variant="body1">
                        Draft saved on 23 Sep 2023
                      </Typography>
                    </>
                  )}
                </>
              )}
              {projectShow ? (
                <Box sx={{ display: "grid" }}>
                  <Typography variant="body2">
                    Or, Upload project file
                  </Typography>
                  <DragDropZone onChange={handleDragDropZoneChange} />
                </Box>
              ) : (
                dragDropZoneValue !== "" && (
                  <>
                    <Typography variant="subtitle1">
                      Scratch Project File
                    </Typography>
                    <Box className="drop-file-preview__item__info">
                      <img src="/project.svg" alt="" />
                      <Typography variant="body1" color="text.primary">
                        {dragDropZoneValue}Hello world.sb3
                      </Typography>
                    </Box>
                  </>
                )
              )}
            </>
          )}
        </Container>
        {!project?.project.is_submitted ? (
          <Container maxWidth="sm" align="center">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: (theme) =>
                      isSubmitDisabled
                        ? theme.palette.grey[100]
                        : "transparent",
                  }}
                  disabled={
                    !inputControlValue && dragDropZoneValue.length === 0
                  }
                >
                  <Typography
                    variant="ButtonLarge"
                    pl="35px "
                    pr="35px"
                    pt="8px"
                    pb="8px"
                  >
                    Save Draft
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  className={!isSubmitDisabled && "profileBtn"}
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  sx={{
                    pl: isSubmitDisabled && "35px ",
                    pr: isSubmitDisabled && "35px ",
                    pt: isSubmitDisabled && "8px",
                    pb: isSubmitDisabled && "8px",
                    backgroundColor: (theme) =>
                      isSubmitDisabled
                        ? theme.palette.grey[500]
                        : "transparent",
                  }}
                >
                  <Typography variant="ButtonLarge" onClick={handleSubmit}>
                    Submit Project
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Button size="medium" className="profileBtn">
                <Link
                  href="#"
                  underline="none"
                  color={"white"}
                  pl="16px"
                  pr="16px"
                >
                  {" "}
                  Return to Dashboard
                </Link>
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Submission;
