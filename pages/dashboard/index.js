import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProfileUpgradeBox from "@/components/forms/ProfileUpgradeBox";
import { breakpoints } from "@/theme/constant";
import {
  LearnCards,
  ProjectAwardCards,
  ScratchPracticeCards,
} from "./PathwayCard";
import {
  LearnPathways,
  ProjectAwardsPathways,
  ScratchPracticePathways,
} from "./data";
import ProgressBar from "@/components/progressBar/ProgressBar";
import { Launch } from "@mui/icons-material";

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <ProfileUpgradeBox />

      <main>
        <Container maxWidth="lg" sx={{ display: "grid", gap: 6 }}>
          <Typography variant="h5" sx={{ color: "#29458C" }}>
            Learn With Meraki
          </Typography>

          <Box sx={{ width: "fit-content", position:"relative" }} className="m-Auto">
            <img
              src={
                isMobile
                  ? "/assets/climate_mobile_bg.svg"
                  : "/assets/climate_web_bg.svg"
              }
              alt=""
              style={{width:'100%'}}
            />

            <Box sx={{width:'100%', height:'fit-content', display:'flex', gap:4, flexDirection: isMobile?'column':'row',padding:2}} className={isMobile?'climateBlock_Mobile':'climateBlock_Web'}>
              <Box sx={{width:'100%', alignSelf:'center'}}>
                <img src='/assets/climate_action.svg' alt="image" style={{width:'100%'}}/>
              </Box>

              <Box
                sx={{ width: "100%", display: "grid", gap: isMobile ? 4 : 10 }}
              >
                <Box sx={{display:'grid', gap: 2}}>
                  <Typography variant="h6" sx={{ textAlign: "start" }}>
                    Climate Action
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2E2E2E" }}>
                    Learn about climate change and steps to counter them
                  </Typography>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#2E2E2E" }}>
                      Progress: 10%
                    </Typography>
                    <ProgressBar progress="10%" />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, justifyContent:isMobile?'space-between':'flex-start' }}>
                  <Button
                    className="button"
                    sx={{ border: `1px solid #29458C` }}
                  >
                    <Typography variant="ButtonLarge" sx={{ color: "#29458C" }}>
                      View Classes
                    </Typography>
                  </Button>
                  <Button
                    className="button"
                    sx={{ border: `1px solid #29458C` }}
                  >
                    <Typography variant="ButtonLarge" sx={{ color: "#29458C" }}>
                      Learn Now
                    </Typography>
                    <Launch sx={{ color: "#29458C" }} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: "fit-content", position:"relative" }} className="m-Auto">
            <img
              src={
                isMobile
                  ? "/assets/scratch_mobile_bg.svg"
                  : "/assets/scratch_web_bg.svg"
              }
              alt=""
              style={{width:'100%'}}
            />

            <Box sx={{width:'100%', height:'fit-content', display:'flex', gap:4, flexDirection: isMobile?'column':'row'}} className={isMobile?'scratchBlock_Mobile':'scratchBlock_Web'}>
              <Box sx={{width:'100%', padding:0.5}}>
                <img src='/assets/scratch.svg' alt="image" style={{width:'100%', borderRadius:'14px', objectFit:'contain'}}/>
              </Box>

              <Box
                sx={{ width: "100%", display: "grid", gap: isMobile ? 4 : 10, padding:isMobile?'0 16px':'16px' }}
              >
                <Box sx={{display:'grid', gap: 2}}>
                  <Typography variant="h6" sx={{ textAlign: "start" }}>
                  Scratch - Block Based Programming
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2E2E2E" }}>
                  Drag and drop gamified learning
                  </Typography>
                  <Box sx={{display:'grid', gap: 1}}>
                    <Typography variant="body2" sx={{ color: "#2E2E2E" }}>
                      Progress: 10%
                    </Typography>
                    <ProgressBar progress="10%" />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, justifyContent:isMobile?'space-between':'flex-start' }}>
                  <Button
                    className="button"
                    sx={{ border: `1px solid #29458C` }}
                  >
                    <Typography variant="ButtonLarge" sx={{ color: "#29458C" }}>
                      View Classes
                    </Typography>
                  </Button>
                  <Button
                    className="button"
                    sx={{ border: `1px solid #29458C` }}
                  >
                    <Typography variant="ButtonLarge" sx={{ color: "#29458C" }}>
                      Learn Now
                    </Typography>
                    <Launch sx={{ color: "#29458C" }} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Practice Scratch Cards */}
        <Box className='practiceCardBlock'>
          <Grid container>
            {ScratchPracticePathways.map(
              ({ title, image, btnText, bgColor, color }, index) => {
                return (
                  <Grid item key={index} md={6} sm={6} xs={12}>
                    <ScratchPracticeCards
                      title={title}
                      image={image}
                      btnText={btnText}
                      bgColor={bgColor}
                      color={color}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </Box>

        {/* Project & Award Cards */}
        <Container maxWidth="lg" sx={{ display: "grid", gap: 6 }}>
          <Typography variant="h5" sx={{ color: "#F55C38" }}>
            Project & Awards
          </Typography>

          <Box sx={{ width: "fit-content" }} className="m-Auto">
            <Grid container spacing={4}>
              {ProjectAwardsPathways.map(
                ({ title, image, btnText, bgColor, color, border, path }, index) => {
                  return (
                    <Grid item key={index} md={6} sm={6} xs={12}>
                      <ProjectAwardCards
                        title={title}
                        image={image}
                        btnText={btnText}
                        bgColor={bgColor}
                        color={color}
                        border={border}
                        path={path}
                      />
                    </Grid>
                  );
                }
              )}
            </Grid>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
