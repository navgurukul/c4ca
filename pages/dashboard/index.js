import React from "react";
import ProfileUpdateBox from "@/components/forms/ProfileUpdateBox";
import { Container, Grid, Typography } from "@mui/material";
import PathwayCard from "./PathwayCard";
import { LearnAndPracticePathways, ProjectPathways } from "@/constants";

const Dashboard = () => {
  return (
    <main>
      <Container maxWidth="lg">
        <ProfileUpdateBox />
      </Container>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h6">Learn & Practice</Typography>

        <Grid container spacing={4} sx={{ mt: -2 }}>
          {LearnAndPracticePathways.map(
            (
              {
                image,
                title,
                subtitle,
                bgcolor,
                bgcolor1,
                progressBarColor,
                progressBar,
              },
              index
            ) => {
              return (
                <Grid item key={index} lg={4} md={6} sm={6} xs={12}>
                  <PathwayCard
                    image={image}
                    title={title}
                    subtitle={subtitle}
                    bgcolor={bgcolor}
                    bgcolor1={bgcolor1}
                    progressBarColor={progressBarColor}
                    progressBar={progressBar}
                  />
                </Grid>
              );
            }
          )}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h6">Project</Typography>

        <Grid container spacing={4} sx={{ mt: "-16px" }}>
          {ProjectPathways.map(
            (
              { image, title, subtitle, bgcolor, bgcolor1, projectPath },
              index
            ) => {
              return (
                <Grid item key={index} lg={4} md={6} sm={6} xs={12}>
                  <PathwayCard
                    image={image}
                    title={title}
                    subtitle={subtitle}
                    bgcolor={bgcolor}
                    bgcolor1={bgcolor1}
                    projectPath={projectPath}
                  />
                </Grid>
              );
            }
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default Dashboard;
