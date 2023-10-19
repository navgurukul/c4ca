import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import { useCookies } from "react-cookie";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("AUTH"));
    setUser(authToken);
    console.log(authToken, 'token...');
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    removeCookie("user");
    setUser(null)
    router.push("/")
  };
  return (
    <>
      <header>
        <Link href={"/"}>
          <img src="/c4ca.svg" alt="c4ca_logo" />
        </Link>

        {router.pathname === "/" && user == null ? (
          <Stack spacing={2} direction="row">
            {" "}
            <Link href="/teacher/login">
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  display: "block",
                  width: 100,
                  m: "auto",
                  fontSize: "15px",
                }}
              >
                Teacher and Partners
              </Button>{" "}
            </Link>
            <Link href="/student/login">
              <Button
                variant="contained"
                sx={{
                  display: "block",
                  width: 100,
                  m: "auto",
                  fontSize: "15px",
                }}
              >
                Student Login
              </Button>
            </Link>
          </Stack>
        ) : (
          <Box>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar src={user?.user?.profile_picture} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Link href={"/teacher/profile"}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Box>
        )}
      </header>
    </>
  );
};

export default Header;
