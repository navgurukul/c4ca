import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  Snackbar,
  TextField,
} from "@mui/material";
import InputControl from "../../../../components/forms/InputControl";
import { breakpoints } from "@/theme/constant";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import customAxios from "@/api";
import MuiAlert from "@mui/material/Alert";
import { format } from "date-fns";

const Submission = (props) => {
  const [projectTopic, setProjectTopic] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [linkShow, setLinkShow] = useState(true);
  const [projectShow, setProjectShow] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [totalTopic, setTotalTopic] = useState(null);
  const [saveDraft, setSaveDraft] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [draftSaveDate, setDraftSaveDate] = useState(null);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.values.sm}px)`);
  const jsonData = localStorage.getItem("AUTH");
const parsedData = jsonData ? JSON.parse(jsonData) : null;
const authToken = parsedData ? parsedData.data.token : null;
  const handleSaveDraftOrSubmit = async (isDraft) => {
    const requestData = {
      project_title: projectTopic,
      project_summary: projectSummary,
      is_submitted: !isDraft,
    };
    try {
      const response = await customAxios.post(
        "/c4ca/projectTopic/4",
        requestData,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        if (isDraft) {
          setLinkShow(false);
          setProjectShow(false);
          const currentDate = format(new Date(), "dd-MMM-yyyy");
          setDraftSaveDate(currentDate);
          localStorage.setItem(
            "submissionDraft",
            JSON.stringify({ ...requestData, draftSaveDate: currentDate })
          );
          handleSnackbarOpen("Draft saved successfully");
        } else {
          setLinkShow(true);
          setProjectShow(true);
          localStorage.removeItem("submissionDraft");
          handleSnackbarOpen("Project submitted successfully");
        }
        await handleGetRequest();
      } else {
        console.error(
          "Failed to submit data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("POST request error:", error);
      console.log("Response data:", error.response.data);
    }
  };
  useEffect(() => {
    handleGetRequest();
    const savedDraftData = localStorage.getItem("submissionDraft");
    if (savedDraftData) {
      const parsedDraftData = JSON.parse(savedDraftData);
      setProjectTopic(parsedDraftData.project_title);
      setProjectSummary(parsedDraftData.project_summary);
      setDraftSaveDate(parsedDraftData.draftSaveDate);
      setSaveDraft(true);
    }
  }, []);
  useEffect(() => {
    if (projectData) {
      setLinkShow(!projectData.is_submitted);
      setProjectShow(!projectData.is_submitted);
    }
  }, [projectData]);
  const handleGetRequest = async () => {
    try {
      const response = await customAxios.get("c4ca/projectTopic/4", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const projectData = response.data.data;
      setTotalTopic(projectData.totalSubmitTopic);
      setTeamName(projectData.team_name);
      setProjectData(projectData.projects);
    } catch (error) {
      console.error("Error fetching project data:", error);
      console.log("Error response:", error.response);
    }
  };
  const isSubmitDisabled = !(projectTopic && projectSummary);
  const handleProjectTopicChange = (event) => {
    const value = event.target.value;
    setProjectTopic(value);
  };
  const handleProjectSummaryChange = (event) => {
    const value = event.target.value;
    setProjectSummary(value);
  };
  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: "grid", placeItems: "center", gap: 4, paddingY: 5 }}
      >
        <Container
          maxWidth="sm"
          sx={{ display: "grid", gap: isMobile ? 2 : "16px" }}
        >
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", mb: "16px" }}
          >
            Dashboard /{" "}
            <Typography variant="body1" component="span" color="#29458C">
              Submit Project Topic
            </Typography>
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
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
                    sx={{ mb: "16px" }}
                  >
                    <img src="/idea.svg" alt="projects" />
                    <Typography variant="h6">{totalTopic} Projects</Typography>
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: "16px",
              mb: "16px",
            }}
          >
            Team
            <Typography variant="h6" component="span" color="#F55C38">
              {teamName}
            </Typography>
          </Typography>
          {linkShow && (
            <>
              {saveDraft === true && (
                <>
                  <Divider />
                  <Typography variant="body1">
                    Draft saved on {draftSaveDate}
                  </Typography>
                </>
              )}
            </>
          )}
          {linkShow ? null : (
            <>
              <Typography variant="subtitle1">
                {projectData?.project_title?.charAt(0)?.toUpperCase() +
                  projectData?.project_title?.slice(1)}
              </Typography>
              <Box sx={{ display: "grid", mb: "16px" }}>
                <Typography variant="body1">
                  {projectData?.project_summary?.charAt(0)?.toUpperCase() +
                    projectData?.project_summary?.slice(1)}
                </Typography>
              </Box>
            </>
          )}
          {projectShow && (
            <>
              <InputControl
                label="Project Topic"
                type="text"
                onChange={handleProjectTopicChange}
                value={projectTopic}
                mb={"16px"}
              />
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  mt: "16px",
                  backgroundColor: "pink",
                }}
              >
                <Typography variant="body2" color="text.primary">
                  Project Summary
                </Typography>
                <TextField
                  type="text"
                  multiline
                  rows={5}
                  onChange={handleProjectSummaryChange}
                  value={projectSummary}
                />
              </Box>
            </>
          )}
          {!linkShow && !projectShow && (
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
              >
               <Button
                  sx={{ width: !isMobile ? "50%" : "100%", mt: "16px", 
                  "&:hover": {
                  backgroundColor:  "rgba(41, 69, 140, 0.72)",
                },}}                    
                  className="profileBtn"    
                >
                  <Link
                    href="/student/dashboard"
                    underline="none"
                    color="white"
                    pl="16px"
                    pr="16px"
                  >
                    Return to Dashboard
                  </Link>
                </Button>
              </Grid>
            </Grid>
          )}
        </Container>
        {linkShow && (
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
                    width: isMobile && "100%",
                  }}
                  disabled={isSubmitDisabled}
                  onClick={() => handleSaveDraftOrSubmit(true)}
                >
                  <Typography
                    variant="ButtonLarge"
                    pl="35px"
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
                   className={!isSubmitDisabled ? "profileBtn" : ""}
                   onClick={() => handleSaveDraftOrSubmit(false)}
                   disabled={isSubmitDisabled}
                   sx={{
                     pl: isSubmitDisabled ? "35px" : "20px",
                     pr: isSubmitDisabled ? "35px" : "20px",
                     pt: isSubmitDisabled ? "8px" : "12px",
                     pb: isSubmitDisabled ? "8px" : "12px",
                     width: isMobile ? "100%" : "250px",
                     "&:hover": {
                       backgroundColor: isSubmitDisabled ? "transparent" : "rgba(41, 69, 140, 0.72)",
                     },
                   }}
                >
                  <Typography variant="ButtonLarge"
                     >
                    Submit Project Topic
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Container>
        )}
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};
export default Submission;