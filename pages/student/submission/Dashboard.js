import React from "react";
import { Button, Link, Typography ,useMediaQuery,} from "@mui/material";
import { breakpoints } from "@/theme/constant";

const DashboardButton = ({ onClick }) => {
    const isMobile = useMediaQuery(`(max-width: ${breakpoints.values.sm}px)`);
  return (
    <Button
      style={{
        backgroundImage: "linear-gradient(to right, rgba(135 162 231 / 72%)  , #192954)",
      }}
      sx={{ width: !isMobile ? "50%" : "100%", mt: "16px" }}
      className="profileBtn"
      onClick={onClick}
    >
      <Link href="/student/dashboard" underline="none" color="white" pl="16px" pr="16px">
        <Typography variant="ButtonLarge">Return to Dashboard</Typography>
      </Link>
    </Button>
  );
};
export default DashboardButton;