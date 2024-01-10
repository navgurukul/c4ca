import Head from "next/head";
import * as React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import "@/styles/globals.css";
import Header from "@/components/header/Header";
import "../styles/app.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import customAxios from "@/api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
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

  const sendGoogleUserData = (token) => {
    setLoading(true);
    customAxios
      .get("/users/me", {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      })
      .then((resp) => {
        localStorage.setItem("AUTH", JSON.stringify(resp.data.user));
        userRoleArray = resp.data.user.c4ca_roles;
        const userToken = resp.data.token;
        localStorage.setItem("token", userToken);
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
          Authorization: token,
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
                return router.push(`/teacher/profile?partner_id=${partner_id}`);
              })
              .catch((err) => {
                console.log("error in users me put api", err);
                localStorage.setItem("loggedOut", "true");
                return setError(
                  "Apologies, We are having some issues logging you in please contact the admin."
                );
              });
          } else if (!referrer) {
            setOpen(true);
            localStorage.setItem("loggedOut", "true");
            return setError(
              "Apologies, the entered Gmail ID is not linked with a C4CA partner. Please use referral link to sign up."
            );
          } else {
            return userRoleArray?.length === 0 ? setOpen(true) : null;
          }
          return setError(resp.data.status);
        } else {
          resp.data.role = "teacher";
          localStorage.setItem("AUTH", JSON.stringify(resp.data));
          setCookie("user", JSON.stringify(resp.data), {
            path: "/",
            maxAge: 604800, // Expires after 1hr
            sameSite: true,
          });
          if (resp.data.data.school) {
            localStorage.setItem("teacherData", JSON.stringify(resp.data.data));
            return router.push("/teacher/teams");
          }
          router.push("/teacher/profile");
        }
      })
      .catch((err) => {
        userRoleArray?.length === 0 ? setOpen(true) : null;
        console.log("error in google data", err);
      });
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
        )}
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