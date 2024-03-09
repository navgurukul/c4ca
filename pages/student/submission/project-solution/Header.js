import React from 'react'
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    Card,
    CardContent,
    useMediaQuery,
    Snackbar,
  } from "@mui/material";
  import Link from "next/link";
function Header({name}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: "16px", gap:1}}>
    <Link href="/student/dashboard" underline="none">
      <Typography variant="body1" color="#29458C">Dashboard / </Typography>
    </Link>
      <Typography variant="body1" component="span" >
        {/* Submit Project Solution */}
        {name}
      </Typography>
    </Box>
  )
}

export default Header