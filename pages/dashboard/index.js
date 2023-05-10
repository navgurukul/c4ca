import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
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

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <ProfileUpgradeBox />

      <main>
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            display: "grid",
            placeContent: "center",
            gap: isMobile ? 4 : 6,
          }}
        >
          <Typography variant="h5" color="primary">
            Learn With Meraki
          </Typography>

          <Grid container spacing={isMobile?4:6}>
            {LearnPathways.map(
              (
                {
                  webImage,
                  mobileImage,
                  title,
                  subtitle,
                  progress,
                  bgImage_web,
                  bgImage_mobile,
                  className_web,
                  className_mobile,
                },
                index
              ) => {
                return (
                  <Grid item key={index} md={12} sm={12} xs={12}>
                    <LearnCards
                      webImage={webImage}
                      mobileImage={mobileImage}
                      title={title}
                      subtitle={subtitle}
                      progress={progress}
                      bgImage_web={bgImage_web}
                      bgImage_mobile={bgImage_mobile}
                      className_web={className_web}
                      className_mobile={className_mobile}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </Container>

        {/* Practice Scratch Cards */}
        <Container maxWidth="xl" disableGutters className="practiceCardBlock">
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
        </Container>

        {/* Project & Award Cards */}
        <Container maxWidth="lg" sx={{ display: "grid", gap: 6 }}>
          <Typography variant="h5" color="secondary">
            Project & Awards
          </Typography>

          <Box sx={{ width: "fit-content" }} className="m-Auto">
            <Grid container spacing={4}>
              {ProjectAwardsPathways.map(
                (
                  { title, image, btnText, bgColor, color, border, path },
                  index
                ) => {
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
