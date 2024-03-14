import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import * as React from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState, useContext } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";
import {
  LoggedOutState,
  loggedOutContext,
} from "../components/context/LoggedOutContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import customAxios from "@/api";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Home() {
  const isActive = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const [loggedOut, setLoggedOut] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState("");

  const { shouldLogOut, setShouldLogOut } = useContext(loggedOutContext);
  const [loading, setLoading] = useState(true);
  const [showComponent, setShowComponent] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(
    "Apologies, the entered Gmail ID is not linked with a C4CA partner."
  );
  const [cookie, setCookie] = useCookies(["user"]);
  let c4ca_partner_id, c4ca_facilitator_id, c4ca_roles, userRoleArray;
  let partner_id = "";
  let referrer = "";

  function reverseJwtBody(jwt) {
    const [header, body, signature] = jwt.split(".");
    const reversedBody = body.split("").reverse().join("");
    return [header, reversedBody, signature].join(".");
  }
  const handleRouteChange = () => {
    setLoading(false);
  };

  const handleClose = (event) => {
    const { reason } = event ?? {};
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const sendGoogleUserData = async (token) => {
    setLoading(true);

    const res = await customAxios.get("/users/me", {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    });
    const userToken = res.data.token;
    localStorage.setItem("token", userToken);
    localStorage.setItem("AUTH", JSON.stringify(res.data.user));
    c4ca_facilitator_id = res.data.user.c4ca_facilitator_id;
    c4ca_partner_id = res.data.user.c4ca_partner_id;
    c4ca_roles = res.data.user.c4ca_roles;
    userRoleArray = res.data.user.c4ca_roles;

    localStorage.setItem("token", userToken);
    if (c4ca_roles.length === 0 || c4ca_roles.includes("c4caTeacher")) {
      const resp = await customAxios.get("/c4ca/teacher_Data", {
        headers: {
          accept: "application/json",
          Authorization: res?.data?.token,
        },
      });

      if (resp.data.data === null) {
        setLoading(false);
        if (referrer && referrer !== "null") {
          const res = await customAxios.put(
            "/users/me",
            { referrer: referrer },
            {
              headers: {
                accept: "application/json",
                Authorization: userToken,
              },
            }
          );

          partner_id = res.data.user.c4ca_partner_id;

          res.data.role = "teacher";
          localStorage.setItem("AUTH", JSON.stringify(res.data));
          setCookie("user", JSON.stringify(res.data), {
            path: "/",
            maxAge: 604800, // Expires after 1hr
            sameSite: true,
          });

          return router.push(`/teacher/profile?partner_id=${partner_id}`);
        } else if (!referrer) {
          setOpen(true);

          setShouldLogOut("true");
          return setError(
            "Apologies, the entered Gmail ID is not linked with a C4CA partner. Please use referral link to sign up."
          );
        } else {
          return userRoleArray?.length === 0 ? setOpen(true) : null;
        }
      } else if (
        typeof resp.data.data === "string" &&
        !c4ca_roles.includes("superAdmin") &&
        !c4ca_roles.includes("facilitator") &&
        !c4ca_roles.includes("c4caPartner")
      ) {
        setShouldLogOut("true");
        setError(
          "It seems you have not used the referral link to sign up. Please use referral link to sign up."
        );
        setOpen(true);
        setLoading(false);
      } else {
        res.data.role = "teacher";
        localStorage.setItem("AUTH", JSON.stringify(res.data));
        setCookie("user", JSON.stringify(res.data), {
          path: "/",
          maxAge: 604800, // Expires after 1hr
          sameSite: true,
        });

        if (resp.data.data.school) {
          localStorage.setItem("teacherData", JSON.stringify(resp.data.data));
          return router.push("/teacher/teams");
        }
      }
    }
    if (c4ca_roles.includes("superAdmin")) {
      res.data.role = "superAdmin";

      setCookie("user", JSON.stringify(res.data), {
        path: "/",
        maxAge: 604800, // Expires after 1hr
        sameSite: true,
      });

      return router.push(`/partner`);
    } else if (c4ca_roles.includes("facilitator")) {
      res.data.role = "facilitator";
      setCookie("user", JSON.stringify(res.data), {
        path: "/",
        maxAge: 604800, // Expires after 1hr
        sameSite: true,
      });

      return router.push(`/partner/teacherList/${c4ca_facilitator_id}`);
    } else if (c4ca_roles.includes("c4caPartner")) {
      res.data.role = "c4caPartner";
      setCookie("user", JSON.stringify(res.data), {
        path: "/",
        maxAge: 604800, // Expires after 1hr
        sameSite: true,
      });
      return router.push(`/partner/facilitator/${c4ca_partner_id}`);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    referrer = localStorage.getItem("referrer");
    let tokenVal = urlParams?.get("token");
    let loggedOutToken = urlParams?.get("loggedOutToken");
    if (tokenVal) {
      setLoading(true);
      localStorage.setItem("loggedOutToken", JSON.stringify(loggedOutToken));
      localStorage.setItem("token", reverseJwtBody(tokenVal));
      sendGoogleUserData(reverseJwtBody(tokenVal));
    } else {
      setLoading(false);
    }
    !localStorage.getItem("token") && localStorage.setItem("token", null);
    !localStorage.getItem("loggedOut") &&
      localStorage.setItem("loggedOut", null);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    setIsFirstLogin(localStorage.getItem("isFirstLogin"));
    setLoggedOut(localStorage.getItem("loggeOut"));
  }, [loggedOut, isFirstLogin]);

  useEffect(() => {
    const user = reactLocalStorage.getObject("user");
    if (Object.keys(user) == 0) return;
    let req = { nextUrl: { pathname: "" } };
    const role = user.role;
    const c4ca_facilitator_id = user.user?.c4ca_facilitator_id;
    const c4ca_partner_id = user.user?.c4ca_partner_id;
    switch (role) {
      case "teacher":
        req.nextUrl.pathname = "/teacher/teams";
        break;
      case "student":
        req.nextUrl.pathname = "/student/dashboard";
        break;
      case "superAdmin":
        req.nextUrl.pathname = "/partner";
        break;
      case "facilitator":
        req.nextUrl.pathname = `/partner/teacherList/${c4ca_facilitator_id}`;
        break;
      case "c4caPartner":
        req.nextUrl.pathname = `/partner/facilitator/${c4ca_partner_id}`;
        break;
      default:
        req.nextUrl.pathname = "/";
        break;
    }
    router.push(req.nextUrl.pathname);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-text">Loading..</div>
        </div>
      ) : (
        <Box maxWidth="false">
          <Container maxWidth="md" sx={{ marginTop: 10, marginBottom: 10 }}>
            <Stack alignItems={"center"}>
              {" "}
              <img
                src="/home.svg"
                alt="logo"
                width={isActive ? "330px" : "790px"}
              />
              <Box sx={{ mt: 4 }}>
                <img
                  src="/Frame.svg"
                  alt="logo"
                  width={isActive ? "245px" : "470px"}
                />
              </Box>
            </Stack>
            <Typography
              variant="body1"
              align="center"
              color="text.primary"
              sx={{ marginTop: 4 }}
            >
              Discover Code for Climate Action (C4CA), your gateway to a world
              where learning and environmental innovation converge. Join us on a
              journey that combines coding, climate awareness, and
              problem-solving, all while making a positive impact on the planet.
            </Typography>
            {isActive ? (
              <>
                <Box sx={{ marginTop: 4 }} alignItems="center">
                  <Link href="/student/login">
                    <Button sx={{ width: "100%" }} className="profileBtn">
                      <Typography variant="ButtonLarge">
                        Student Login
                      </Typography>
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ marginTop: 4 }} alignItems="center">
                  <a
                    href={`https://accounts.navgurukul.org/?loggeOut=${loggedOut}&isFirstLogin=${isFirstLogin}`}
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      sx={{
                        display: "block",
                        width: "92vw",
                        m: "auto",
                        fontSize: "15px",
                      }}
                    >
                      Teacher and Partners
                    </Button>{" "}
                  </a>
                </Box>
                <Box sx={{ marginTop: 4 }} alignItems="center">
                  <Divider />
                </Box>
              </>
            ) : (
              <Stack sx={{ marginTop: 5 }} alignItems={"center"}>
                <Link href="/student/login">
                  <Button
                    style={{
                      // width: "100%",
                      backgroundImage:
                        "linear-gradient(to right, rgba(135 162 231 / 72%)  , #192954)",
                    }}
                    alignItems={"center"}
                    sx={{ pl: 6, pr: 6 }}
                    variant="contained"
                  >
                    <Typography variant="ButtonLarge">Get Started</Typography>
                  </Button>
                </Link>
              </Stack>
            )}

            <Container maxWidth="md" sx={{ marginTop: 10, marginBottom: 10 }}>
              <Typography variant="h5" align="center">
                {" "}
                How it Works?{" "}
              </Typography>

              <Grid container spacing={2} sx={{ marginTop: 5 }}>
                <Grid
                  sx={{ display: "flex", marginTop: 1 }}
                  item
                  xs={12}
                  sm={12}
                >
                  <Box>
                    <img src="/Gather.svg" alt="logo" />
                  </Box>
                  <Box sx={{ paddingLeft: "5%" }}>
                    <Typography variant="subtitle1">
                      Gather your friends and form a team
                    </Typography>
                    <Typography variant="body1">
                      Your teacher will create the team on the platform and
                      provide a link for login{" "}
                    </Typography>
                  </Box>
                </Grid>
                {/* 2 */}

                <Grid
                  sx={{ display: "flex", marginTop: 1 }}
                  item
                  xs={12}
                  sm={12}
                >
                  <Box>
                    <img src="/Learn.svg" alt="logo" />
                  </Box>
                  <Box sx={{ paddingLeft: "5%" }}>
                    <Typography variant="subtitle1">
                      Learn and practice
                    </Typography>
                    <Typography variant="body1">
                      Learn via interactive curriculum and projects on the
                      Meraki platform through your dashboard
                    </Typography>
                  </Box>
                </Grid>
                {/* 3 */}
                <Grid
                  sx={{ display: "flex", marginTop: 1 }}
                  item
                  xs={12}
                  sm={12}
                >
                  <Box>
                    <img src="/Define.svg" alt="logo" />
                  </Box>
                  <Box sx={{ paddingLeft: "5%" }}>
                    <Typography variant="subtitle1">
                      Define your topic
                    </Typography>
                    <Typography variant="body1">
                      Think of a pressing problem you want to solve for and
                      submit it to the platform
                    </Typography>
                  </Box>
                </Grid>
                {/* 4 */}
                <Grid
                  sx={{ display: "flex", marginTop: 1 }}
                  item
                  xs={12}
                  sm={12}
                >
                  <Box>
                    <img src="/Build.svg" alt="logo" />
                  </Box>
                  <Box sx={{ paddingLeft: "5%" }}>
                    <Typography variant="subtitle1">
                      Build and submit your cool project
                    </Typography>
                    <Typography variant="body1">
                      Now, it’s time to build your solution and showcase it
                    </Typography>
                  </Box>
                </Grid>
                {/* 5 */}
                <Grid
                  sx={{ display: "flex", marginTop: 1 }}
                  item
                  xs={12}
                  sm={12}
                >
                  <Box>
                    <img src="/rewards.svg" alt="logo" />
                  </Box>
                  <Box sx={{ paddingLeft: "5%" }}>
                    <Typography variant="subtitle1">
                      Evaluation and rewards
                    </Typography>
                    <Typography variant="body1">
                      The best of the solutions with actionable steps will be
                      eligible to exciting rewards
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            <Container sx={{ marginTop: 5 }}>
              <Stack alignItems={"center"}>
                {" "}
                <img
                  src="/c4ca.svg"
                  alt="logo"
                  // heigh={isActive ? "228px" : "513px"}
                  width={isActive ? "220px" : "350px"}
                />
              </Stack>
              <Typography variant="body1" align="center" sx={{ mt: 3, mb: 3 }}>
                Brought by Amazon in partnership with NavGurukul and Quest
                alliance
              </Typography>
              <Stack alignItems={"center"}>
                <img
                  src="/AFE-logo.svg"
                  alt="logo"
                  // style={{ isActive ? "100px" : "150px"}}
                  width={isActive ? "60%" : "46%"}
                />
              </Stack>
            </Container>
          </Container>

          <Box className="footer">
            <img
              style={{ width: "100%", marginBottom: "-1.23rem" }}
              src="/footer.svg"
              alt="logo"
            />
          </Box>
        </Box>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
