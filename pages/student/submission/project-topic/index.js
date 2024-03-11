import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  TextField,
} from "@mui/material";
import InputControl from "../../../../components/forms/InputControl";
import { breakpoints } from "@/theme/constant";
import Divider from "@mui/material/Divider";
import customAxios from "@/api";
import { format } from "date-fns";
import FormHeading from "../FormHeading";
import CustomSnackbar from "../Snackbar";
import SubmitButtonGroup from "../SubmitBttonGroup";
import DashboardButton from "../Dashboard";

const Submission = () => {
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
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.values.sm}px)`);

  const isSubmitDisabled = !(projectTopic && projectSummary);
  const jsonData = localStorage.getItem("AUTH");
  const parsedData = jsonData ? JSON.parse(jsonData) : null;
  const authToken = parsedData ? parsedData.data.token : null;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSaveDraftOrSubmit = async (isDraft) => {
    const requestData = {
      project_title: projectTopic,
      project_summary: projectSummary,
      is_submitted: !isDraft,
    };
    try {
      const response = await customAxios.post(
        "c4ca/projectTopic/3",
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
          setSaveDraft(true);
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
        console.error("Failed to submit data:", response.status,response.statusText );
      }
    } catch (error) {
      console.error("POST request error:", error);
      console.log("Response data:", error.response.data);
    }
  };

  const handleGetRequest = async () => {
    try {
      const response = await customAxios.get("/c4ca/projectTopic/3", {
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

  const handleProjectTopicChange = (event) => {
    const value = event.target.value;
    setProjectTopic(value);
  };

  const handleProjectSummaryChange = (event) => {
    const value = event.target.value;
    setProjectSummary(value);
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
          <FormHeading name = "Submit Project Topic" />
        
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
                  Project Description
                </Typography>
                <TextField
                  type="text"
                  multiline
                  rows={5}
                  onChange={handleProjectSummaryChange}
                  value={projectSummary}
                  fullWidth={true}
                  inputProps={{style: { padding: '2px' }, }}
                  sx={{
                    '&:hover': {
                      '& fieldset': {
                        borderColor: 'black !important',
                        borderWidth: '1px !important',
                      },
                    },
                  }}
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
                  <DashboardButton onClick={() => console.log("Dashboard button clicked")} />
                </Grid>
            </Grid>
          )}
        </Container>
        {linkShow && (
          <Container maxWidth="sm" align="center">
            <SubmitButtonGroup
              onSave={() => handleSaveDraftOrSubmit(true)}
              onSaveText="Save Draft"
              onSubmit={() => handleSaveDraftOrSubmit(false)}
              onSubmitText="Submit Project Topic"
              isSubmitDisabled={isSubmitDisabled}
            />
          </Container>
        )}
      </Container>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
};
export default Submission;