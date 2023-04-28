import React from "react";
import {
  Avatar,
  Box,
  CardMedia,
  Container,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import SetupProfilePage from "../profile/setup-profile";

const GoogleBtn = styled("button")({
  minWidth: "200px",
  padding: "10px 16px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "15px",
  borderRadius: "100px",
  background: "#ffffff",
  boxShadow:
    "0 4px 5px rgba(46,46,46,0.06), 0 1px 10px rgba(46,46,46,0.04), 0 2px 4px rgba(46,46,46,0.08)",
  border: "none",
  cursor: "pointer",
});

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ display: "grid", gap: 4 }}>
      <CardMedia
        component="img"
        image={"/login-assets/logo.svg"}
        sx={{ width: 208, height: 48, margin: "0 auto" }}
      />

      <Box
        sx={{
          width: 240,
          display: "grid",
          justifyContent: "center",
          gap: 2,
          margin: "0 auto",
        }}
      >
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Continue to C4CA
        </Typography>
        <Link href='/profile/setup-profile'>
          <GoogleBtn>
            <Avatar
              src="/login-assets/Google-Logo.svg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography variant="body1">Login with Google</Typography>
          </GoogleBtn>
        </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
