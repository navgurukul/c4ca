import Head from "next/head";
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

import { redirect, useSearchParams } from "next/navigation";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const styles = {
    marginTop: "30vh",
  };

  const style = {
    textalign: "center",
    margin: "10vh 33vw",
  };

  const searchParams = useSearchParams();
  const partner_id = searchParams.get("partner_id");
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const { token } = router.query;

  function reverseLastFiveChars(str) {
    if (str?.length < 5) {
      return inputString;
    } else {
      const charArray = str?.slice(-5);
      return str
        ?.slice(0, str?.length - 5)
        .concat(charArray?.split("").reverse().join(""));
    }
  }

  const sendGoogleUserData = (token) => {
    setLoading(true);
    return axios({
      url: `https://merd-api.merakilearn.org/users/auth/google`,
      method: "post",
      headers: { accept: "application/json", Authorization: token },
      data: { idToken: token, mode: "web" },
    })
      .then((res) => {
        axios
          .get("https://merd-api.merakilearn.org/c4ca/teacher_Data", {
            headers: {
              accept: "application/json",
              Authorization: res.data.token,
            },
          })
          .then((resp) => {
            if (resp.data.data === null) {
              setLoading(false);
              if (partner_id) {
                res.data.role = "teacher";
                localStorage.setItem("AUTH", JSON.stringify(res.data));
                setCookie("user", JSON.stringify(res.data), {
                  path: "/",
                  maxAge: 604800, // Expires after 1hr
                  sameSite: true,
                });
                return router.push(`/teacher/profile?partner_id=${partner_id}`);
              } else {
                return setError(
                  "Apologies, the entered Gmail ID is not linked with a C4CA partner."
                );
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

                setLoading(false);
                return router.push("/teacher/teams");
              }
              // Only redirect if the request is successful
              router.push("/teacher/profile");
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log("error in google data", err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log("error in google data", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    let tokenVal = urlParams?.get("token");
    if (tokenVal) {
      localStorage.setItem("token", reverseLastFiveChars(tokenVal));
      sendGoogleUserData(reverseLastFiveChars(tokenVal));
    }

    !localStorage.getItem("token") && localStorage.setItem("token", null);
    !localStorage.getItem("loggedOut") &&
      localStorage.setItem("loggedOut", null);
    !localStorage.getItem("isFirstLogin") &&
      localStorage.setItem("isFirstLogin", true);
  }, []);


  return (
    <>
      <Head>
        <title>C4CA Board</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c4ca.svg" />
      </Head>

      <ThemeProvider theme={theme}>
        {router.pathname.split("/").reverse()[0] === "login" ? null : (
          <Header />
        )}{" "}
        <>
          {error && router.pathname.split("/").reverse()[0] !== "login" &&  (
            <Typography variant="h6" color="error" style={style}>
              {error}
            </Typography>
          )}

          {loading ? (
            <div class="loading-container">
              <div class="loading"></div>
              <div id="loading-text">Logging In</div>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </>
      </ThemeProvider>
    </>
  );
}
