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
  const [open, setOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [error, setError] = useState(
    "Apologies, the entered Gmail ID is not linked with a C4CA partner."
  );
  const [cookie, setCookie] = useCookies(["user"]);
  const [flag, setFlag] = useState(false);
  const { token } = router.query;
  let c4ca_partner_id, c4ca_facilitator_id, c4ca_roles, userRoleArray;
  let partner_id;
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

          setLoggedOut(true);
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
        setLoggedOut(true);
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
          <Header props = {loggedOut ? { loggedOut } : {}} />
        )}{" "}
        <>
          {loading ? (
            <div className="loading-container">
              <div className="loading"></div>
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
