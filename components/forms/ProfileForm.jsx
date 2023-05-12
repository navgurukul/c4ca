import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { breakpoints } from "@/theme/constant";
import ProfilePicture from "./ProfilePicture";
import { classesData, statesData } from "@/constant";
import InputControl, { SelectBox } from "./InputControl";
import Team from "./Team";

const initialFormValues = {
  Class: "",
  state: "",
};

const ProfileForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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
          {router.asPath === "/profile-update"
            ? "Personal Details"
            : "Set Up Your Profile"}
        </Typography>

        <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
          <ProfilePicture />

          <InputControl
            label="Full Name"
            type="text"
            placeholder="Enter Your Name"
            // value='Abhishek'
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
            className={router.asPath === "/profile-update" ? "show" : "hide"}
          >
            <Grid container spacing={isMobile ? 2 : 4}>
              <Grid item md={6} sm={6} xs={12}>
                <InputControl label="School" type="text" />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <SelectBox
                  label="Class"
                  data={classesData}
                  name="Class"
                  value={formValues.Class}
                  onChange={handleValueChange}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <SelectBox
                  label="State"
                  data={statesData}
                  name="state"
                  value={formValues.state}
                  onChange={handleValueChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>

        {router.asPath === "/profile-update" ? <Team /> : null}

        <Button className="profileBtn">
          {router.asPath === "/profile-update" ? (
            <Link href="/profile-update">
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
