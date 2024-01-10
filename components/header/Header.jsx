import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  useMediaQuery,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import Link from "next/link";
import customAxios from "@/api";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { breakpoints } from "@/theme/constant";
import { reactLocalStorage } from "reactjs-localstorage";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [loggedOut, setLoggedOut] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState("");
  const [authData, setAuthData] = useState({});
  const [role, setRole] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.values.sm}px)`);

  useEffect(() => {
    setIsFirstLogin(localStorage.getItem("isFirstLogin"));
    setLoggedOut(localStorage.getItem("loggedOut"));
  }, [loggedOut, isFirstLogin]);

  useEffect(() => {
    const authData = reactLocalStorage.getObject("AUTH");
    if (authData && authData.rolesList) {
      const rolesList = authData.c4ca_roles;
      const hasRoles =
        rolesList?.includes("admin") ||
        rolesList?.includes("superAdmin") ||
        rolesList?.includes("c4caPartner") ||
        rolesList?.includes("facilitator");

      if (hasRoles) {
        setRole(hasRoles);
      }
    } else {
      console.error("Roles List not found in AUTH data.");
    }
  }, [router.pathname]);

  useEffect(() => {
    const partnerId = new URLSearchParams(window.location.search)?.get(
      "referrer"
    );
    partnerId && localStorage.setItem("referrer", `referrer=${partnerId}`);

    const authToken = JSON.parse(localStorage.getItem("teacherData"));
    setUser(authToken);
    const data = JSON.parse(localStorage.getItem("AUTH"));
    setAuthData(data);
  }, [router.pathname]);

  useEffect(() => {
    const handleRouteChange = () => {
      const authToken = JSON.parse(localStorage.getItem("teacherData"));
      if (authToken) {
        setUser(authToken);
        const data = JSON.parse(localStorage.getItem("AUTH"));
        setAuthData(data);
      }
    };

    setInterval(() => {
      const token = JSON.parse(localStorage?.getItem("loggedOutToken")) ?? null;

      if (token) {
        customAxios
          .get(`/users/checkSessionToken?token=${token}`)
          .then((res) => {
            console.log(res.data, "response from checking api");
            if (res.data === false) {
              console.log("session expired");
              localStorage.clear();
              localStorage.setItem("loggedOut", false);
              removeCookie("user", { path: "/" });
              setUser(null);
              setTimeout(() => window.location.replace("/"), 200);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }, 1000); // Call the API every 60 seconds

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("loggedOut", true);
    removeCookie("user", { path: "/" });
    setUser(null);

    let url = window.location.href;
    !url.includes("student")
      ? (window.location.href =
          "https://dev.dcckrjm3h0sxm.amplifyapp.com/?loggedOut=true")
      : console.log("URL contains 'student'");

    setTimeout(() => {
      window.location.replace("/");
    }, 200);
  };

  return (
    <>
      <header className="header">
        {!isMobile && (
          <a href={"/"}>
            <img src="/c4ca.svg" alt="c4ca_logo" />
          </a>
        )}

        {(router.pathname === "/" && user == null) || isMobile ? (
          <>
            {isMobile && (
              <Link href={"/"}>
                <img src="/c4ca.svg" alt="c4ca_logo" />
              </Link>
            )}
            <Stack spacing={2} direction="row">
              {!isMobile && (
                <a
                  href={`https://dev.dcckrjm3h0sxm.amplifyapp.com/?loggedOut=${loggedOut}`}
                >
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
                  </Button>
                </a>
              )}
              {!isMobile && (
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
              )}
            </Stack>
          </>
        ) : (
          <>
            {isMobile && (
              <Link href={"/"}>
                <img src="/CCA_Logo.svg" alt="CCA_Logo" />
              </Link>
            )}

            {role ? (
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar
                    style={{ textTransform: "capitalize" }}
                    src={user?.profile_url || user?.profile_link}
                  >
                    {authData?.data?.team_name?.split(" ")[0]?.charAt(0)}
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
                        authData?.c4ca_roles &&
                          authData.c4ca_roles.indexOf("c4caTeacher") !== -1
                          ? "/teacher/profile"
                          : "/student/team-profile"
                      );
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </>
        )}
      </header>
      {isMobile && <Divider />}
    </>
  );
};

export default Header;
