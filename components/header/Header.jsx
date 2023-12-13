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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import { useCookies } from "react-cookie";
import { breakpoints } from "@/theme/constant";
import { reactLocalStorage } from "reactjs-localstorage";

import customAxios from "@/api";
const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [loggedOut, setLoggedOut] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState("");
  const [authData, setAuthData] = useState({});

  const [role, setRole] = useState(false);

  const [reloadCount, setReloadCount] = useState(0);
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    setLoggedOut(localStorage.getItem("loggedOut"));
  });

  useEffect(() => {
    setInterval(() => {
      const token = JSON.parse(localStorage.getItem("loggedOutToken"));
        if (token) {
          customAxios
          .get(
                `users/checkSessionToken?token=${token}`
                )
                .then((res) => {
                    if (res.data ===false){
                        console.log("session expired");
                        // handleLogout()
                    }
                    console.log(res.data, "response from checking api");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    
    }, 1000);
    },[]);

  let hasRoles;
  useEffect(() => {
    const authData = reactLocalStorage.getObject("AUTH");
    if (authData && authData.rolesList) {
      const rolesList = authData.c4ca_roles;
      const isAdmin = rolesList?.includes("admin");
      const isSuperAdmin = rolesList?.includes("superAdmin");
      const isPartner = rolesList?.includes("c4caPartner");
      const isFacilitator = rolesList?.includes("facilitator");

       hasRoles = isAdmin || isSuperAdmin || isPartner || isFacilitator;
      
      if(hasRoles){
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

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
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

    const token = localStorage.getItem("loggedOut");
    // if (token) {
    //   customAxios
    //   .get(
    //     `/users/removeSessionToken?token=${token}`
    //         )
    //         .then((res) => {
              localStorage.clear();
              localStorage.setItem("loggedOut", true);
              removeCookie("user", { path: "/" });
              setUser(null);
              setTimeout(() => {
                // router.push("/");
                window.location.replace("/");
              }, 200);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }


    localStorage.clear();
    localStorage.setItem("loggedOut", true);
    removeCookie("user", { path: "/" });
    setUser(null);
    setTimeout(() => {
      // router.push("/");
      window.location.replace("/");
    }, 200);
  };

  return (
    <>
      <header className="header">
        {!isMobile && (
          <Link href={"/"}>
            <img src="/c4ca.svg" alt="c4ca_logo" />
          </Link>
        )}

        {router.pathname === "/" && user == null ? (
          <>
            {isMobile && (
              <Link href={"/"}>
                <img src="/c4ca.svg" alt="c4ca_logo" />
              </Link>
            )}
            <Stack spacing={2} direction="row">
              {" "}
              {!isMobile && (
                <a
                  href={`https://dev.dcckrjm3h0sxm.amplifyapp.com/?loggedOut=${loggedOut}`}
                >
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
              <Box >
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
                      // router.push(
                      //   authData?.c4ca_roles?.includes("c4caTeacher")
                      //     ? "/teacher/profile"
                      //     : "/student/team-profile"
                      // );
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
