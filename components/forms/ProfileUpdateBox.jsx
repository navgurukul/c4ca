import React from "react";
import { Button, Typography, styled, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { breakpoints } from "@/theme/constants";
import Link from "next/link";


const Box = styled('div')({
  width: "fit-content",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  background: "#D4DAE8",
})

const ProfileUpdateBox = () => {
  const router = useRouter();

  const isMobileActive = useMediaQuery(
    "(max-width:" + breakpoints.values.sm + "px)"
  );

  return (
    <Box
      sx={{
        flexDirection: isMobileActive ? "column" : "row",
        padding: isMobileActive ? 2 : "8px 8px 8px 32px",
        borderRadius: isMobileActive ? "8px" : "100px",
      }}
    >
      {router.asPath == "/profile-update" ? (
        <>
          <Typography variant="subtitle1">
            Are you a teacher helping students in the hackathon?
          </Typography>
          <Button
            sx={{
              minWidth: isMobileActive ? "100%" : 240,
              background: "#29458c",
              color: "#ffffff",
              borderRadius: "100px",
            }}
          >
            <Link href="/">Convert to Teacher Profile</Link>
          </Button>
        </>
      ) : (
        <>
          <Typography variant="subtitle1">
            Please add your personal and team details to complete registration
          </Typography>
          <Button
            sx={{
              width: isMobileActive ? "100%" : 240,
              background: "#29458c",
              color: "#ffffff",
              borderRadius: "100px",
            }}
          >
            <Link href="/profile-update">Go to Profile</Link>
          </Button>
        </>
      )}
    </Box>
  );
};

export default ProfileUpdateBox;
