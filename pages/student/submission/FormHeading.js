import React from 'react'
import { Typography, Box} from "@mui/material";
import Link from "next/link";

function FormHeading({name}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: "16px", gap:1}}>
    <Link href="/student/dashboard" underline="none">
      <Typography variant="body1" color="#29458C">Dashboard / </Typography>
    </Link>
      <Typography variant="body1" component="span" >
        {name}
      </Typography>
    </Box>
  )
}

export default FormHeading;