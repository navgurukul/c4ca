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
  Snackbar,
} from "@mui/material";
import InputControl from "../../../../components/forms/InputControl";
import { breakpoints } from "@/theme/constant";
import DragDropZone from "../../../../components/submission/DragDropZone";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import customAxios from "@/api";
import MuiAlert from "@mui/material/Alert";
import { format } from 'date-fns';

const Submission = (props) => {
  const [inputControlValue, setInputControlValue] = useState("");
  const [dragDropZoneValue, setDragDropZoneValue] = useState([]);
  const [linkShow, setLinkShow] = useState(true);
  const [projectShow, setProjectShow] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [topicData, setTopicData] = useState(null);
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
  const parsedData = JSON.parse(jsonData);
  const authToken = parsedData.data.token;

  const handleSaveDraftOrSubmit = async (isDraft) => {
    const requestData = {
      project_link: inputControlValue,
      is_submitted: !isDraft,
      project_file_url: dragDropZoneValue[0]?.name,
      project_file_name: dragDropZoneValue[0]?.name,
    };

    try {
      const response = await customAxios.post(
        "/c4ca/projectSubmit/4",
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
          const currentDate = format(new Date(), 'dd-MMM-yyyy');
          setDraftSaveDate(currentDate);
          localStorage.setItem("submissionDraft", JSON.stringify({ ...requestData, draftSaveDate: currentDate }));
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
    }
  };

  useEffect(() => {
    handleGetRequest();
    const savedDraftData = localStorage.getItem("submissionDraft");
    if (savedDraftData) {
      const parsedDraftData = JSON.parse(savedDraftData);
      setInputControlValue(parsedDraftData.project_link);
      setDraftSaveDate(parsedDraftData.draftSaveDate);
      setDragDropZoneValue(
        parsedDraftData.project_file_url
          ? [{ name: parsedDraftData.project_file_url }]
          : []
      );
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
      const response = await customAxios.get("/c4ca/projectSubmit/4", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const projectData = response.data.data;
      setTopicData(projectData.projectTopic);
      setTotalTopic(projectData.totalSubmitProject);
      setProjectData(projectData.project);
    } catch (error) {
      console.error("Error fetching project data:", error);
      console.log("Error response:", error.response);
    }
  };

  const isSubmitDisabled = !inputControlValue && dragDropZoneValue.length === 0;

  const handleInputControlChange = (event) => {
    const value = event.target.value;
    setInputControlValue(value);
  };

  const handleDragDropZoneChange = (files) => {
    setDragDropZoneValue(files);
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
              Submit Project Solution
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
              {topicData?.team_name?.charAt(0)?.toUpperCase() +
                topicData?.team_name?.slice(1)}
            </Typography>
          </Typography>
          <Typography variant="subtitle1">
            {topicData?.project_title?.charAt(0)?.toUpperCase() +
              topicData?.project_title?.slice(1)}
          </Typography>
          <Box sx={{ display: "grid", mb: "16px" }}>
            <Typography variant="body1">
              {topicData?.project_summary?.charAt(0)?.toUpperCase() +
                topicData?.project_summary?.slice(1)}
            </Typography>
          </Box>
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
          {linkShow ? (
            <>
              <InputControl
                label="Share Scratch Project Link"
                type="text"
                onChange={handleInputControlChange}
                value={inputControlValue}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1">Scratch Project Link</Typography>
              <Link href={projectData?.project_link} variant="body1">
                {projectData?.project_link}
              </Link>
            </>
          )}
          {projectShow ? (
            <Box sx={{ display: "grid", mt: "32px", gap: 2 }}>
              <Typography variant="body2">Or, Upload project file</Typography>
              <DragDropZone
                onChange={handleDragDropZoneChange}
                value={
                  dragDropZoneValue.length > 0 ? dragDropZoneValue : undefined
                }
              />
            </Box>
          ) : (
            <>
              {projectData?.project_file_name != null &&
                projectData?.project_file_name !== "" && (
                  <>
                    <Typography variant="subtitle1" mt={"16px"}>
                      Scratch Project File
                    </Typography>
                    <Box className="drop-file-preview__item__info">
                      <img src="/project.svg" alt="" />
                      <Link
                        href={projectData?.project_file_url}
                        variant="body1"
                        color="text.primary"
                        style={{ textDecoration: "none" }}
                      >
                        {projectData?.project_file_name}
                      </Link>
                    </Box>
                  </>
                )}
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
                  sx={{ width: !isMobile ? "50%" : "100%", mt: "16px" }}
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
                  disabled={
                    !inputControlValue && dragDropZoneValue.length === 0
                  }
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
                  className={!isSubmitDisabled && "profileBtn"}
                  onClick={() => handleSaveDraftOrSubmit(false)}
                  disabled={isSubmitDisabled}
                  sx={{
                    pl: isSubmitDisabled && "35px",
                    pr: isSubmitDisabled && "35px",
                    pt: isSubmitDisabled && "8px",
                    pb: isSubmitDisabled && "8px",
                    backgroundColor: (theme) =>
                      isSubmitDisabled
                        ? theme.palette.grey[500]
                        : "transparent",
                    width: isMobile && "100%",
                  }}
                >
                  <Typography variant="ButtonLarge">Submit Project</Typography>
                </Button>
              </Grid>
            </Grid>
          </Container>
        )}
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust as needed
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
