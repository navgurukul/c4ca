import Head from "next/head";
import * as React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import "@/styles/globals.css";
import Header from "@/components/header/Header";
import "../styles/app.css";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { redirect, useSearchParams } from "next/navigation";
import customAxios from "@/api";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showComponent, setShowComponent] = useState(true);
  const styles = {
    marginTop: "30vh",
  };

  const style = {
    textalign: "center",
    margin: "10vh 33vw",
  };

  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  // const [partner_id, setPartner_id] = useState("");
  let referrer = "";
  const [error, setError] = useState(
    "Apologies, the entered Gmail ID is not linked with a C4CA partner."
  );
  const [cookie, setCookie] = useCookies(["user"]);
  const { token } = router.query;
  let c4ca_partner_id, c4ca_facilitator_id, c4ca_roles, userRoleArray;
  function reverseJwtBody(jwt) {
    const [header, body, signature] = jwt.split(".");
    const reversedBody = body.split("").reverse().join("");
    return [header, reversedBody, signature].join(".");
  }
  let partner_id;
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

  const sendGoogleUserData = (token) => {
    setLoading(true);
    customAxios
      .post(
        "/users/auth/google",
        { idToken: token, mode: "web" },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        userRoleArray = res.data.user.c4ca_roles;
        const userToken = res.data.token;
        localStorage.setItem("token", userToken);

        customAxios
          .get("/users/me", {
            headers: {
              accept: "application/json",
              Authorization: res?.data?.token,
            },
          })
          .then((resp) => {
            localStorage.setItem("AUTH", JSON.stringify(res.data.user));
            c4ca_facilitator_id = resp.data.user.c4ca_facilitator_id;
            c4ca_partner_id = resp.data.user.c4ca_partner_id;
            c4ca_roles = resp.data.user.c4ca_roles;
           
            if (c4ca_roles.includes("superAdmin")) {
              resp.data.role = "superAdmin";
              setCookie("user", JSON.stringify(resp.data), {
                path: "/",
                maxAge: 604800, // Expires after 1hr
                sameSite: true,
              });
              return router.push(`/partner`);
            } else if (c4ca_roles.includes("facilitator")) {
              resp.data.role = "facilitator";
              setCookie("user", JSON.stringify(resp.data), {
                path: "/",
                maxAge: 604800, // Expires after 1hr
                sameSite: true,
              });
              return router.push(`/partner/teacherList/${c4ca_facilitator_id}`);
            } else if (c4ca_roles.includes("c4caPartner")) {
              resp.data.role = "c4caPartner";
              setCookie("user", JSON.stringify(resp.data), {
                path: "/",
                maxAge: 604800, // Expires after 1hr
                sameSite: true,
              });
              return router.push(`/partner/facilitator/${c4ca_partner_id}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        customAxios
          .get("/c4ca/teacher_Data", {
            headers: {
              accept: "application/json",
              Authorization: res?.data?.token,
            },
          })
          .then((resp) => {
            if (resp.data.data === null) {
              setLoading(false);
              if (referrer && referrer !== "null") {
                customAxios
                  .put(
                    "/users/me",
                    { referrer: referrer },
                    {
                      headers: {
                        accept: "application/json",
                        Authorization: userToken,
                      },
                    }
                  )

                  .then((res) => {
                    partner_id = res.data.user.c4ca_partner_id;

                    res.data.role = "teacher";
                    localStorage.setItem("AUTH", JSON.stringify(res.data));
                    setCookie("user", JSON.stringify(res.data), {
                      path: "/",
                      maxAge: 604800, // Expires after 1hr
                      sameSite: true,
                    });

                    // setOpen(false);
                    return router.push(
                      `/teacher/profile?partner_id=${partner_id}`
                    );
                  })
                  .catch((err) => {

                    console.log("error in users me put api", err);
                    return setError(
                      "Apologies, We are having some issues logging you in please contact the admin."
                    );
                  });
              } else if (!referrer) {
                setOpen(true);
                return setError(
                  "Apologies, the entered Gmail ID is not linked with a C4CA partner. Please use referral link to sign up."
                );
              } else {
                return userRoleArray?.length === 0 ? setOpen(true) : null;
              }
              return setError(resp.data.status);
            } else {
              res.data.role = "teacher";
              localStorage.setItem("AUTH", JSON.stringify(res.data));
              setCookie("user", JSON.stringify(res.data), {
                path: "/",
                maxAge: 604800, // Expires after 1hr
                sameSite: true,
              });

              if (resp.data.data.school) {
                localStorage.setItem(
                  "teacherData",
                  JSON.stringify(resp.data.data)
                );

                return router.push("/teacher/teams");
              }
              // Only redirect if the request is successful
              router.push("/teacher/profile");
            }
          })
          .catch((err) => {
            userRoleArray?.length === 0 ? setOpen(true) : null;
            console.log("error in google data", err);
            // setLoading(false);
          });
      })
      .catch((err) => {
        setError("Failed to log you in, Please Try Again");
        setOpen(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    referrer = localStorage.getItem("referrer");
    let tokenVal = urlParams?.get("token");
    if (tokenVal) {
      setLoading(true);
      localStorage.setItem("token", reverseJwtBody(tokenVal));
      sendGoogleUserData(reverseJwtBody(tokenVal));
    } else {
      setLoading(false);
    }

    !localStorage.getItem("token") && localStorage.setItem("token", null);
    !localStorage.getItem("loggedOut") &&
      localStorage.setItem("loggedOut", null);
    !localStorage.getItem("isFirstLogin") &&
      localStorage.setItem("isFirstLogin", true);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Coding for Climate Action</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/CCA_Logo.svg" />
      </Head>

      <ThemeProvider theme={theme}>
        {router.pathname.split("/").reverse()[0] === "login" ? null : (
          <Header />
        )}{" "}
        <>
          {loading ? (
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">Loading..</div>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
}
