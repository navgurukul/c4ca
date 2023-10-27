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
  const [loggedOut, setLoggedOut] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState("");
  const [authData, setAuthData] = useState({});
  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("teacherData"));
    setUser(authToken);
    setIsFirstLogin(localStorage.getItem("isFirstLogin"));
    setLoggedOut(localStorage.getItem("loggeOut"));

    const data = JSON.parse(localStorage.getItem("AUTH"));
    setAuthData(data);
  }, [loggedOut, isFirstLogin]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // localStorage.clear();
    localStorage.removeItem("AUTH");
    localStorage.removeItem("user");
    
    localStorage.removeItem("teacherData")
    localStorage.removeItem("ally-supports-cache")
    localStorage.removeItem("token")
    localStorage.setItem("loggedOut", true);
    localStorage.setItem("isFirstLogin", false);
    removeCookie("user");
    setUser(null)
    router.push("/")
  };

  return (
    <>
      <header className="header">
        <Link href={"/"}>
          <img src="/c4ca.svg" alt="c4ca_logo" />
        </Link>

        {router.pathname === "/" && user == null ? (
          <Stack spacing={2} direction="row">
            {" "}
            <a href={`https://accounts.navgurukul.org/?loggeOut=${loggedOut}&isFirstLogin=${isFirstLogin}`}>
              {/* <Link href="/teacher/login"> */}
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
              {/* </Link> */}
            </a>
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
                <Avatar src={user?.profile_url}>
                  {authData?.data?.team_name?.split(" ")[0]?.charAt(0)}
                  {authData?.data?.team_name?.split(" ")[1]?.charAt(0)}
                </Avatar>
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
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push(
                      authData.role == "teacher"
                        ? "/teacher/profile"
                        : "/student/team-profile"
                    );
                  }}
                >
                  Profile
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
