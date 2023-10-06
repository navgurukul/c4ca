import { breakpoints } from "@/theme/constant";
import {
  CopyAll,
  EditOutlined,
  OpenInNewOutlined,
} from "@mui/icons-material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

const TeacherDashboard = () => {
  const router = useRouter();

  const handleAddTeam = () => {
    setOpenDialog(true); // Open the dialog
  };
  
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const teams = [
    {
      id: 23,
      name: "Flying Colors",
      course_progress: 28,
      user_id: "pratikdeshmukh2004",
      password: "Hello@1234",
    },
    {
      id: 24,
      name: "Rising Tides",
      course_progress: 78,
      user_id: "unknown234",
      password: "Me@1234",
    },
    {
      id: 25,
      name: "Embracing Winds",
      course_progress: 50,
      user_id: "unknown234",
      password: "Me@1234",
    },
    {
      id: 26,
      name: "Sunshine Moon",
      course_progress: 22,
      user_id: "unknown234",
      password: "Me@1234",
    },
    {
      id: 27,
      name: "Brave Cats",
      course_progress: 66,
      user_id: "unknown234",
      password: "Me@1234",
    }
  ];
  const [showLoginDetails, setShowLoginDetails] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <>
      <Container
        style={{ borderBottom: "0.25px solid lightgray" }}
        maxWidth="lg"
        disableGutters
      >
        <Typography variant="h5" color="primary">
          My Teams
        </Typography>
        <Grid
          container
          sx={{ paddingY: 8, padding: 4 }}
          spacing={isMobile ? 4 : 6}
        >
          {teams.map((team) => (
            <Grid item md={4} sm={6} xs={12} key={team.id}>
              <Box
                sx={{
                  width: "100%",
                  border: "2px solid",
                  borderColor: "lightgray",
                  padding: 4,
                  borderRadius: 3,
                  borderSpacing: "5px",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1" color="dark">
                    {team.name}
                  </Typography>
                  <EditOutlined style={{ color: "gray" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginTop: 2,
                  }}
                >
                  <Typography variant="body1" color="dark">
                    Course Progress:
                  </Typography>
                  <CircularProgress
                    variant="determinate"
                    value={team.course_progress}
                    size={20}
                    thickness={6}
                    color="typhoon"
                  />{" "}
                  <Typography>{team.course_progress}%</Typography>
                </Box>
                {showLoginDetails[team.id] && (
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      <Typography variant="subtitle1" color="dark">
                        Team Login Details
                      </Typography>
                      <Button
                        sx={{ fontSize: 15 }}
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `User ID: ${team.user_id}\nPassword: ${team.password}}`
                          )
                        }
                        variant="text"
                      >
                        <CopyAll style={{ color: "gray" }} /> Copy
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginTop: 1,
                      }}
                    >
                      <img src="/assets/icon-id.svg" alt="" />
                      <Typography variant="body2" color="dark">
                        User ID: {team.user_id}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginTop: 1,
                      }}
                    >
                      <img src="/assets/security-password.svg" alt="" />
                      <Typography variant="body2" color="dark">
                        Password: {team.password}
                      </Typography>
                    </Box>
                  </div>
                )}

                <Button
                  onClick={() =>
                    setShowLoginDetails({
                      ...showLoginDetails,
                      [team.id]: !showLoginDetails[team.id],
                    })
                  }
                  size="small"
                  style={{
                    height: 35,
                    borderWidth: 2,
                    marginLeft: "auto",
                    marginTop: 20,
                    fontWeight: 900,
                  }}
                  variant="outlined"
                >
                  {showLoginDetails[team.id] ? "Hide" : "Show"} Login ID &
                  Password
                </Button>
              </Box>
            </Grid>
          ))}
          <Grid item md={4} sm={6} xs={12}>
            <Box
              sx={{
                width: "100%",
                placeContent: "center",
                border: "2px dashed",
                borderBlockEndWidth: "2px 10px",
                borderColor: "gray",
                padding: 8.5,
                borderRadius: 3,
                textAlign: "center",
                borderSpacing: "5px",
                cursor: "pointer",
              }}
              onClick={handleAddTeam}
            >
              <AddCircleOutlinedIcon color="primary" />
              <Typography variant="body1" color="primary">
                Add a Team
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        >
        <DialogContent>
        
          <iframe
            title="Add Team"
            src="/teacher/add-team"
            width= "100%"
            height="820px"
            frameBorder="0"
      
          />
        </DialogContent>
      </Dialog>

      {/* Rest of your code... */}
      <Container maxWidth="lg" sx={{ padding: 5 }} disableGutters>
        <Typography variant="h5" color="primary">
          Awards & Certification
        </Typography>
        <Grid
          container
          sm={12}
          xs={12}
          sx={{
            width: isMobile ? "98%" : "60%",
            border: "2px solid",
            borderColor: "lightgray",
            padding: 4,
            borderRadius: 3,
            borderSpacing: "5px",
            cursor: "pointer",
            marginTop: 5,
            marginX: "auto",
            display: "flex",
            gap: 4,
            justifyContent: "center",
          }}
        >
          <Grid sx={{ marginLeft: isMobile ? 0 : -10 }} item>
            <img src="/assets/teamwork-award.svg" alt="" />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="dark">
              Check out your team's ranking and certifications
            </Typography>
            <Button
              size="large"
              sx={{ marginTop: 2 }}
              variant="outlined"
              disabled
            >
              To Be Announced
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ padding: 5 }} disableGutters>
        <Typography variant="h5" color="secondary">
          Explore Curriculum
        </Typography>
        <Grid
          container
          sx={{
            width: isMobile ? "100%" : "60%",
            border: "2px solid",
            borderColor: "lightgray",
            padding: 4,
            borderRadius: 3,
            borderSpacing: "5px",
            cursor: "pointer",
            marginTop: 5,
            marginX: "auto",
            display: "flex",
            gap: 4,
            justifyContent: "center",
          }}
        >
          <Grid sx={{ marginLeft: isMobile ? 0 : -10 }} item>
            <img src="/assets/climate-change.svg" alt="" />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="dark">
              Code for Climate Action Lessons with Scratch
            </Typography>
            <Button size="large" sx={{ marginTop: 2 }} variant="outlined">
              Go To Meraki <OpenInNewOutlined />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TeacherDashboard;
