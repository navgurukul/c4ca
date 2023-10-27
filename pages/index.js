import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home() {
  const isActive = useMediaQuery("(max-width:600px)");

  
  return (
    <>
    <Box maxWidth="false">
      <Container maxWidth="md" sx={{ marginTop: 10, marginBottom: 10 }}>
        <Stack alignItems={"center"}>
          {" "}
          <img
            src="/home.svg"
            alt="logo"
            // heigh={isActive ? "228px" : "413px"}
            width={isActive ? "330px" : "790px"}
          />
          <Box sx={{ mt: 4 }}>
            <img
              src="/Frame.svg"
              alt="logo"
              width={isActive ? "245px" : "470px"}
            />
          </Box>
        </Stack>
        <Typography
          variant="body1"
          align="center"
          color="text.primary"
          sx={{ marginTop: 4 }}
          // sx={{ backgroundColor: isActive ? "pink" : "red"}}
        >
          Come together with fellow students to co-create cutting-edge tech
          solutions that help reduce carbon footprint, increase renewable energy
          adoption and promote sustainable living
        </Typography>
        <Stack sx={{ marginTop: 5 }} alignItems={"center"}>
          <Link href="/student/login">
          <Button alignItems={"center"} className="profileBtn">
            <Typography variant="ButtonLarge">Get Started</Typography>
          </Button>
          </Link>
        </Stack>
        <Container maxWidth="md" sx={{ marginTop: 10, marginBottom: 10 }}>
          <Typography variant="h5" align="center">
            {" "}
            How it Works?{" "}
          </Typography>

          <Grid container spacing={2} sx={{ marginTop: 5 }}>
            <Grid sx={{ display: "flex", marginTop: 1 }} item xs={12} sm={12}>
              <Box>
                <img src="/Gather.svg" alt="logo" />
              </Box>
              <Box sx={{ paddingLeft: "5%" }}>
                <Typography variant="body1">
                  Gather your friends and form a team
                </Typography>
                <Typography variant="body1">
                  Your teacher will create the team on the platform and provide
                  a link for login{" "}
                </Typography>
              </Box>
            </Grid>
            {/* 2 */}

            <Grid sx={{ display: "flex", marginTop: 1 }} item xs={12} sm={12}>
              <Box>
                <img src="/Learn.svg" alt="logo" />
              </Box>
              <Box sx={{ paddingLeft: "5%" }}>
                <Typography variant="body1">Learn and practice</Typography>
                <Typography variant="body1">
                  Learn via interactive curriculum and projects on the Meraki
                  platform through your dashboard
                </Typography>
              </Box>
            </Grid>
            {/* 3 */}
            <Grid sx={{ display: "flex", marginTop: 1 }} item xs={12} sm={12}>
              <Box>
                <img src="/Define.svg" alt="logo" />
              </Box>
              <Box sx={{ paddingLeft: "5%" }}>
                <Typography variant="body1">Define your topic</Typography>
                <Typography variant="body1">
                  Think of a pressing problem you want to solve for and submit
                  it to the platform
                </Typography>
              </Box>
            </Grid>
            {/* 4 */}
            <Grid sx={{ display: "flex", marginTop: 1 }} item xs={12} sm={12}>
              <Box>
                <img src="/Build.svg" alt="logo" />
              </Box>
              <Box sx={{ paddingLeft: "5%" }}>
                <Typography variant="body1">
                  Build and submit your cool project
                </Typography>
                <Typography variant="body1">
                  Now, it’s time to build your solution and showcase it
                </Typography>
              </Box>
            </Grid>
            {/* 5 */}
            <Grid sx={{ display: "flex", marginTop: 1 }} item xs={12} sm={12}>
              <Box>
                <img src="/rewards.svg" alt="logo" />
              </Box>
              <Box sx={{ paddingLeft: "5%" }}>
                <Typography variant="body1">Evaluation and rewards</Typography>
                <Typography variant="body1">
                  The best of the solutions with actionable steps will be
                  eligible to exciting rewards
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Container sx={{ marginTop: 5 }}>
          <Stack alignItems={"center"}>
            {" "}
            <img
              src="/c4ca.svg"
              alt="logo"
              // heigh={isActive ? "228px" : "513px"}
              width={isActive ? "220px" : "350px"}
            />
          </Stack>
          <Typography variant="body1" align="center" sx={{ mt: 3 }}>
            Brought Together by Amazon, Quest Alliance and NavGurukul
          </Typography>
        </Container>
      </Container>

      <Box className="footer">
        <img style={{ width: "100%" }} src="/footer.svg" alt="logo" />
      </Box>
    </Box>
    
    </>
  );
}

