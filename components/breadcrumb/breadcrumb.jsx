import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function MyBreadcrumbs({partnerName}) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        href="/"
        style={{
          color: "#29458C",
          fontSize: "16px",
          fontWeight: "500px",
          lineHeight: "10px",
        }}
      >
        Home
      </Link>
      <Typography
        color="textPrimary"
        style={{
          color: "#BDBDBD",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "5px",
        }}
      >
        {partnerName}
      </Typography>
    </Breadcrumbs>
  );
}

export default MyBreadcrumbs;
