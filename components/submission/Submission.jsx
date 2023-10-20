import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import InputControl from "../forms/InputControl";
import { breakpoints } from "@/theme/constant";
import DragDropZone from "./DragDropZone";
import ProjectSubmitted from "./Completed";
import Divider from '@mui/material/Divider';
import Link from "@mui/material/Link";


const Submission = (props) => {
  const [show, setShow] = useState(false);
  const [inputControlValue, setInputControlValue] = useState("");
  const [dragDropZoneValue, setDragDropZoneValue] = useState([]);
  const [linkShow , setLinkShow ] = useState(true);
  const [projectShow , setprojectShow ] = useState(true);
  var inputValue ;
  var dropValue

  const handleShow = () => setShow(true);
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px");
  const handleSubmit = () => {
    setLinkShow(false);
    setprojectShow(false);
  };

  const isSubmitDisabled = !inputControlValue && dragDropZoneValue.length === 0;

  const handleInputControlChange = (value) => {
    setInputControlValue(value);
    console.log("val",inputControlValue);
    
  };

  const handleDragDropZoneChange = (files) => {
    setDragDropZoneValue(files);
    console.log("val",dragDropz);
  };

  return (
    <>
      {!show ? (
        <Container
          maxWidth="lg"
          disableGutters
          sx={{ display: "grid", placeItems: "center", gap: 4 }}
        >
          {/* <Typography variant="h5" color="text.primary">
            {props.show ? "Re-Submit Project" : "Your Submission"}
          </Typography> */}

          <Container
            maxWidth="sm"
            sx={{ display: "grid", gap: isMobile ? 2 : 4 }}
          >
           <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Dashboard /{' '}
              <Typography variant="body1" component="span" color="#29458C">
                Submit Project Solution
              </Typography>
            </Typography>
            <Grid container  spacing={1}>
                <Grid item xs={12} sm={6} md={6} gap="32px">
                  <Card sx={{ border: 1, borderColor: 'gray', borderRadius: '8px', width:'90%'}}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} sx ={{mb:2}} >
                        <img src="time.svg" alt="datys"  />
                        <Typography variant="h6">
                          1 Day 12 Hrs
                        </Typography>
                      </Box>
                      <Typography variant='body1'  color ="#6D6D6D">Left Submission Time</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} gap="32px">
                  <Card sx={{ border: 1, borderColor: 'gray', borderRadius: '8px', width:'90%'}}>
                    <CardContent>
                      <Box display="flex" alignItems="center"  gap={1} sx ={{mb:2}}>
                        <img src="idea.svg" alt="projects" />
                        <Typography variant="h6">
                          20 Projects
                        </Typography>
                      </Box>
                      <Typography variant='body1'  color ="#6D6D6D">Submitted Till Now</Typography>
                    </CardContent>
                  </Card>
                </Grid>           
            </Grid>

            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Team{' '}
              <Typography variant="h6" component="span" color="#F55C38">
                Skyriders
              </Typography>
            </Typography>
            <Typography variant="subtitle1">Project Title</Typography>

            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant="body1">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. 
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.
                Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
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
                <InputControl label="Share Scratch Project Link" type="text" onChange={handleInputControlChange} />
              </>:
              <>
                <Typography variant="subtitle1">Scratch Project Link</Typography>
                <Link href={inputValue}>{inputValue}</Link>
              
              </>
             }
            {projectShow?
              <Box sx={{ display: "grid", gap: 1 }}>
                <Typography variant="body2">Or, Upload project file</Typography>
                <DragDropZone onChange={handleDragDropZoneChange} />
              </Box>:
              <>
                <Typography variant="subtitle1">Scratch Project File</Typography>
                <Link to={dropValue}>{dropValue}</Link>
              
              </>
            }
            {!linkShow&&!projectShow&& 
              <Grid container spacing={2}>
                <Grid item xs={12} container justifyContent="center" alignItems="center">
                    <Button size="medium" variant="subtitle1"  className="profileBtn">
                    Return to Dashboard
                    </Button>
                </Grid>
              </Grid> 
            }
              
          </Container>
          {linkShow&&
          <Container maxWidth="sm" align="center">
          <Grid container  spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <Button variant="outlined" 
                   sx={{
                    backgroundColor: (theme) => (isSubmitDisabled ? theme.palette.grey[100] : "transparent"),
                  }}
                   disabled={!inputControlValue && dragDropZoneValue.length === 0}>
                    <Typography  variant="ButtonLarge" pl ="16px " pr="16px"pt="8px" pb="8px">Save Draft</Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                <Button className={!isSubmitDisabled&&"profileBtn"}
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  sx={{
                    backgroundColor: (theme) => (isSubmitDisabled ? theme.palette.grey[500] : "transparent"),
                  }} 
                  >
                 
                <Typography  variant="ButtonLarge" onClick={handleSubmit}>Submit Project</Typography>
              </Button>
                  
                </Grid>           
            </Grid>
            
          </Container>
          }
        </Container>
      ) : (
        <ProjectSubmitted />
      )}
    </>
  );
};

export default Submission;




  