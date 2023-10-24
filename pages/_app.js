import Head from "next/head";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import "@/styles/globals.css";
import Header from "@/components/header/Header";
import "../styles/app.css"
import { Typography } from "@mui/material";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const styles = {
    marginTop: "30vh",
  };

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
    console.log("token", token)
    return axios({
      url: `https://merd-api.merakilearn.org/users/auth/google`,
      method: "post",
      headers: { accept: "application/json", Authorization: token },
      data: { idToken: token, mode: "web" },
    })
      .then((res) => {
        res.data.role = "teacher";
        localStorage.setItem("AUTH", JSON.stringify(res.data));
        setCookie("user", JSON.stringify(res.data), {
          path: "/",
          maxAge: 604800, // Expires after 1hr
          sameSite: true,
        });

        axios({
          method: "get",
          url: `https://merd-api.merakilearn.org/users/me`,
          headers: {
            accept: "application/json",
            Authorization: res.data.token,
          },
        }).then((res) => {
          if (res.status === 200) {
            // Only redirect if the request is successful
            router.push("/teacher/profile");
          }

          setLoading(false);
        });
      })
      .catch((err) => {
        console.log("error in google data", err);
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
  },[]);

  return (
    <>
      <Head>
        <title>C4CA Board</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c4ca.svg" />
      </Head>
      {/* <h1 style={{color:"red", zIndex:"1"}}>Helllllllllllllllllllllllo</h1> */}

      <ThemeProvider theme={theme}>
        {router.pathname.split("/").reverse()[0] === "login" ? null : (
          <Header />
        )}
        {loading ? (
          <div class="loading-container">
            <div class="loading"></div>
            <div id="loading-text">Logging In</div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </>
  );
}
