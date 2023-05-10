import {
  Avatar,
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Camera } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constant";
import InputControl from "./InputControl";
import Team from "./Team";

const ProfileForm = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: "grid", placeItems: "center", gap: 4 }}
      >
        <Typography variant="h5" color="text.primary">
          {router.asPath === "/profile/profile-update"
            ? "Personal Details"
            : "Set Up Your Profile"}
        </Typography>

        <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
          <Box className="AvatarBox">
            <Avatar src="/avatar.svg" sx={{ width: "100%", height: "100%" }} />
            <Camera className="Camera" />
          </Box>

          <InputControl
            label="Full Name"
            type="text"
            placeholder="Enter Your Name"
          />

          <InputControl
            label="Email Address"
            type="Email"
            placeholder="Enter Email Address"
          />

          <Box>
            <Grid container spacing={isMobile ? 2 : 4}>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl label="Phone Number" type="tel" maxLength={10} />
                <Typography variant="body2" color="Grey.main">
                  As a student, you can enter your parent's phone number
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl label="Date of Birth" type="date" />
                <Typography variant="body2" color="Grey.main">
                  On or after 1 April 1995
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box
            className={
              router.asPath === "/profile/profile-update" ? "show" : "hide"
            }
          >
            <Grid container spacing={isMobile ? 2 : 4}>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl label="School" type="text" />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl label="Class" type="text" />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <InputControl label="State" type="text" />
              </Grid>
            </Grid>
          </Box>
        </Container>

        {router.asPath === "/profile/profile-update" ? <Team /> : null}

        <Button className="profileBtn">
          {router.asPath === "/profile/profile-update" ? (
            <Link href="/profile/profile-update">
              <Typography variant="ButtonLarge">Save Profile</Typography>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Typography variant="ButtonLarge">Save & Proceed</Typography>
            </Link>
          )}
        </Button>
      </Container>
    </>
  );
};

export default ProfileForm;
