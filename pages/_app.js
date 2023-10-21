import Head from "next/head";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import "@/styles/globals.css";
import Header from "@/components/header/Header";

export default function App({ Component, pageProps }) {
  const router = useRouter();


  const [cookie, setCookie] = useCookies(["user"]);
  const { token } = router.query;

  function reverseLastFiveChars(inputString) {
    if (inputString?.length < 5) {
        return inputString;
    }

    const charArray = inputString?.split('');
    const reversedChars = charArray?.slice(-5).reverse();
    return charArray?.slice(0, -5).concat(reversedChars).join('');
}
  const sendGoogleUserData = (token) => {
    return axios({
      url: `https://merd-api.merakilearn.org/users/auth/GoogleIdentityServices`,
      method: "post",
      headers: { accept: "application/json", Authorization: token },
      data: { idToken: token, mode: "web" },
    })
      .then((res) => {
        res.data.role = "teacher"
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
            console.log(res.data);
            // Only redirect if the request is successful
            router.push("/teacher/profile");
          }
        });
      })
      .catch((err) => {
        console.log("error in google data", err);
      });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (token) {
      localStorage.setItem("token", reverseLastFiveChars(token));
      sendGoogleUserData(reverseLastFiveChars(token));
    }

    !localStorage.getItem("token") && localStorage.setItem("token", null);
    !localStorage.getItem("loggedOut") && localStorage.setItem("loggedOut", null);
    !localStorage.getItem("isFirstLogin") && localStorage.setItem("isFirstLogin", true);
  })


  return (
    <>
      <Head>
        <title>C4CA Board</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c4ca.svg" />
      </Head>

      <ThemeProvider theme={theme}>
        {router.pathname.split("/").reverse()[0] === "login" ? null : <Header />}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
