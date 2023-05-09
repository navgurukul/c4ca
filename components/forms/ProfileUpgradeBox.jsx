import { breakpoints } from "@/theme/constant";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfileUpgradeBox = () => {
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Box
        className="upgradeBox"
        sx={{ flexDirection: isMobile ? "column" : "row" }}
      >
        <Typography variant="subtitle1">
          {router.asPath === "/profile/profile-update"
            ? `Are you a teacher helping students in the hackathon?`
            : `Please add your personal and team details`}
        </Typography>

        {router.asPath === "/profile/profile-update" ? (
          <Button
            className="profileBtn"
            sx={{ width: isMobile ? "100%" : "max-content" }}
          >
            <Link href="">
              <Typography variant="ButtonLarge">
                Convert to Teacher Profile
              </Typography>
            </Link>
          </Button>
        ) : (
          <Button
            className="profileBtn"
            sx={{ width: isMobile ? "100%" : "max-content" }}
          >
            <Link href="/profile/profile-update">
              <Typography variant="ButtonLarge">Go to Profile</Typography>
            </Link>
          </Button>
        )}
      </Box>
    </>
  );
};

export default ProfileUpgradeBox;
