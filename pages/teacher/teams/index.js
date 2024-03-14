import { breakpoints } from "@/theme/constant";
import { EditOutlined, OpenInNewOutlined } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CopyAll from "@mui/icons-material/CopyAll";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Team from "../add-team";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import customAxios from "@/api";
import Link from "next/link";

const TeacherDashboard = ({ authToken }) => {
  const [BASE_URL, setBASE_URL] = useState(
    "https://www.merd-bhanwaridevi.merakilearn.org"
  );

  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [teams, setTeams] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [showLoginDetails, setShowLoginDetails] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const refreshTeams = () => {
    const authToken = localStorage.getItem("token");
    if (
      window.location.origin === "https://dev-c4ca.c4ca.in"
    ) {
      setBASE_URL("https://www.merd-bhanwaridevi.merakilearn.org");
    } else {
      setBASE_URL("https://www.merakilearn.org");
    }
    const teacherData = JSON.parse(localStorage.getItem("teacherData"));
    const teacherId = teacherData?.id;

    if (teacherId && authToken) {
      customAxios
        .get(`/c4ca/teams/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setTeams(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log(BASE_URL, "BASE_URL")
    refreshTeams();
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    refreshTeams();
  };
  const handleOpenEditDialog = (team) => {
    setSelectedTeam(team);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedTeam(null);
    setEditDialogOpen(false);
    refreshTeams();
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          {loading &&
            [1, 2, 3, 4, 5, 6].map((team) => (
              <Grid item md={4} sm={6} xs={12} key={team.id}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                  style={{ borderRadius: 10 }}
                />
              </Grid>
            ))}
          {!loading &&
            teams.map((team) => (
              <Grid item md={4} sm={6} xs={12} key={team.id}>
                <Box
                  sx={{
                    width: "100%",
                    border: "2px solid",
                    borderColor: "lightgray",
                    padding: 4,
                    borderRadius: 3,
                    borderSpacing: "5px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link href={`/teacher/teams/${team.id}`}>
                      <Typography variant="subtitle1" color="dark">
                        {team.team_name}
                      </Typography>
                    </Link>
                    <EditOutlined
                      style={{ color: "gray", cursor: "pointer" }}
                      onClick={() => handleOpenEditDialog(team)}
                    />
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
                      value={team.completed_portion}
                      size={20}
                      thickness={6}
                      color="typhoon"
                    />{" "}
                    <Typography>{team.completed_portion}%</Typography>
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
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `User ID: ${team.login_id}\nPassword: ${team.password}`
                            );
                            handleSnackbarOpen("Text Copied to Clipboard");
                          }}
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
                          User ID: {team.login_id}
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
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLoginDetails({
                        ...showLoginDetails,
                        [team.id]: !showLoginDetails[team.id],
                      });
                    }}
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
          {!loading && (
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
                onClick={handleOpenDialog}
              >
                <AddCircleOutlinedIcon color="primary" />
                <Typography variant="body1" color="primary">
                  Add a Team
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Team
            handleCloseDialog={handleCloseDialog}
            onClose={handleCloseDialog}
            handleSnackbarOpen={handleSnackbarOpen}
          />
        </DialogContent>
      </Dialog>

      {selectedTeam && (
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <Team
              handleSnackbarOpen={handleSnackbarOpen}
              handleCloseEditDialog={handleCloseEditDialog}
              onClose={handleCloseEditDialog}
              team={selectedTeam}
            />
          </DialogContent>
        </Dialog>
      )}

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
              Check out your teams ranking and certifications
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
            <Link style={{display: 'flex', alignItems: 'center', gap: '8px'}}
              href={`${BASE_URL}`}
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
            <Button size="large" sx={{ marginTop: 2 }} variant="outlined">
             Go To Meraki <OpenInNewOutlined />
            </Button>
            </Link>
          </Grid>
        </Grid>
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

export default TeacherDashboard;
