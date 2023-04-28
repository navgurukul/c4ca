import React from "react";
import { AppBar, Avatar, Box, Typography, styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Toolbar = styled("div")({
  width: "100%",
  height: "100%",
  padding: "8px 32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Logo = styled("h1")({
  fontFamily: "Rubik Bubbles, cursive",
  background: "linear-gradient(90deg, #29458c 72%, #192542 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const Header = () => {
  const router = useRouter();
  return (
    <AppBar
      sx={{ minWidth: "100%", height: 70, background: "#FCE9F0" }}
      className={router.asPath == "/" ? "hide" : "show"}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/dashboard">
            <Logo>C4CA</Logo>
          </Link>
          <Typography
            variant="subtitle1"
            sx={{ color: "#29458C", padding: "8px 16px" }}
          >
            <Link href="/dashboard">Dashboard</Link>
          </Typography>
        </Box>
        <Avatar src="/avatar.svg" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
