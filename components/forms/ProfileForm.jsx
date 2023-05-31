import { breakpoints } from "@/theme/constant";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import ProfilePicture from "./ProfilePicture";
import InputControl from "./InputControl";
import Link from "next/link";
import Team from "./Team";
import {
  DOB_Validation,
  Email_Validation,
  Full_Name_Validation,
  Phone_Number_Validation,
  School_Validation,
} from "../validation";
import { useState } from "react";

const ProfileForm = () => {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = methods.handleSubmit((data) => {
    setSuccess(true);
    console.log(success);
    console.log(data);
  });

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const handlePath = () => router.push('/dashboard')

  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: "grid", placeItems: "center", gap: 4 }}
      >
        <Typography variant="h5" color="text.primary">
          {router.asPath === "/profile-update"
            ? "Personal Details"
            : "Set Up Your Profile"}
        </Typography>

        <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
          <ProfilePicture />

          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off">
              <InputControl {...Full_Name_Validation} />

              <InputControl {...Email_Validation} />

              <Box>
                <Grid container spacing={isMobile ? 2 : 4}>
                  <Grid item md={6} sm={6} xs={12}>
                    <InputControl {...Phone_Number_Validation} />
                    <Typography variant="body2" color="Grey.main">
                      As a student, you can enter your parent's phone number
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <InputControl {...DOB_Validation} />
                    <Typography variant="body2" color="Grey.main">
                      On or after 1 April 1995
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box
                className={
                  router.asPath === "/profile-update" ? "show" : "hide"
                }
              >
                <Grid container spacing={isMobile ? 2 : 4}>
                  <Grid item md={6} sm={6} xs={12}>
                    <InputControl {...School_Validation} />
                  </Grid>
                </Grid>
              </Box>

              {router.asPath === "/profile-update" ? <Team /> : null}

              <Button className="profileBtn" onClick={onSubmit}>
                {router.asPath === "/profile-update" ? (
                  <Typography variant="ButtonLarge">Save Profile</Typography>
                ) : (
                  <Typography
                    variant="ButtonLarge"
                    onClick={handlePath}
                  >
                    Save & Proceed
                  </Typography>
                )}
              </Button>
            </form>
          </FormProvider>
        </Container>
      </Container>
    </>
  );
};

export default ProfileForm;
