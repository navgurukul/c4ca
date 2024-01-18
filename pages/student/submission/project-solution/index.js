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
  const [projectShow, setProjectShow] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const isDraft= true;
  const [topicData, setTopicData] = useState(null);
  const [totalTopic, setTotalTopic] = useState(null);
  const capitalizeFirstLetter = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1);

  const isMobile = useMediaQuery(`(max-width: ${breakpoints.values.sm}px)`);
  const jsonData = localStorage.getItem("AUTH");
  const parsedData = JSON.parse(jsonData);
  const authToken = parsedData.data.token;

  const handleSaveDraft = () => {
    const draftData = {
      project_link: inputControlValue,
      project_file_url: dragDropZoneValue[0]?.name,
      is_submitted:!isDraft,
    };
    localStorage.setItem("submissionDraft", JSON.stringify(draftData));
  };

  useEffect(() => {
    handleGetRequest();
    const savedDraftData = localStorage.getItem("submissionDraft");
    if (savedDraftData) {
      const parsedDraftData = JSON.parse(savedDraftData);
      setInputControlValue(parsedDraftData.project_link);
      setDragDropZoneValue([
        { name: parsedDraftData.project_file_url}
      ]);
    }
  }, []);
  useEffect(() => {
    if (projectData) {
      setLinkShow(false);
      setProjectShow(false); 
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

  const handleSubmit = async () => {
    const requestData = {
      project_link: inputControlValue,
      is_submitted: isDraft,
      project_file_url: dragDropZoneValue[0]?.name,
      project_file_name:dragDropZoneValue[0]?.name,
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
        setLinkShow(false);
        setProjectShow(false);
        localStorage.removeItem("submissionDraft");
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
    sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      Team{" "}
      <Typography variant="h6" component="span" color="#F55C38">
        {topicData?.team_name}
      </Typography>
    </Typography>
    <Typography variant="subtitle1">{capitalizeFirstLetter(topicData?.project_title)}</Typography>

    <Box sx={{ display: "grid", gap: 1 }}>
      <Typography variant="body1">
        {capitalizeFirstLetter(topicData?.project_summary)}
      </Typography> 
    </Box>
      {linkShow&&
      <> 
        {!isSubmitDisabled&&
        <>
          <Divider />
          <Typography variant="body1">Draft saved on 23 Sep 2023</Typography>
        </>
        }
        </>
        }
        {linkShow?
        <>
          <InputControl label="Share Scratch Project Link" type="text" onChange={handleInputControlChange} value={inputControlValue} />
        </>:
        <>
          <Typography variant="subtitle1">Scratch Project Link</Typography>
          <Link href={projectData.project_link} variant="body1">{projectData.project_link}</Link> 
        </>
        }
        {projectShow?
          <Box sx={{ display: "grid", }}>
            <Typography variant="body2">Or, Upload project file</Typography>
            <DragDropZone onChange={handleDragDropZoneChange} value={dragDropZoneValue} />
          </Box>:dragDropZoneValue !==""&&(
          <>
            <Typography variant="subtitle1">Scratch Project File</Typography>
            <Box className="drop-file-preview__item__info">
            <img src="/project.svg" alt="" />
            <Link href={projectData.project_file_url} variant="body1" color='text.primary' style={{ textDecoration: 'none' }}>
              {projectData.project_file_name}
            </Link>
          </Box> 
          </>)
        }
        {!linkShow&&!projectShow&& 
          <Grid container spacing={2}>
            <Grid item xs={12} container justifyContent="center" alignItems="center">
              <Button sx={{width:!isMobile?"50%":"100%" }} className="profileBtn">
                <Link href="/student/dashboard" underline="none" color={'white'} pl='16px' pr="16px"> Return to Dashboard</Link>
              </Button>
            </Grid>
          </Grid> 
        } 
    </Container>
    {linkShow&&
      <Container maxWidth="sm" align="center">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <Button variant="outlined" sx={{backgroundColor: (theme) => (isSubmitDisabled ? theme.palette.grey[100] : "transparent"),width:isMobile&&'100%'}}
            disabled={!inputControlValue && dragDropZoneValue.length === 0} onClick={handleSaveDraft} >
              <Typography variant="ButtonLarge" pl ="35px " pr="35px" pt="8px" pb="8px">Save Draft</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6} >
            <Button className={!isSubmitDisabled&&"profileBtn"}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            sx={{
            pl:isSubmitDisabled &&"35px ",
            pr:isSubmitDisabled &&"35px ",
            pt:isSubmitDisabled &&"8px",
            pb:isSubmitDisabled &&"8px",
            backgroundColor: (theme) => (isSubmitDisabled ? theme.palette.grey[500] : "transparent"),
            width:isMobile&&'100%'
            }} 
            > 
              <Typography variant="ButtonLarge" onClick={handleSubmit}>Submit Project</Typography>
            </Button>
          </Grid> 
        </Grid>
      </Container>
    }
  </Container>
</>
);
};

export default Submission;