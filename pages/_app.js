import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Header from "@/components/header/Header";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [authData, setAuthData] = useState({});
  useEffect(() => {
    const authData = reactLocalStorage.getObject("AUTH");
    setAuthData(authData);
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>C4CA Board</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c4ca.svg" />
      </Head>

      <ThemeProvider theme={theme}>
        {router.pathname.split("/").reverse()[0] === "login" ||
        (Object.keys(authData).length > 0 && router.pathname == "/") ? null : (
          <Header />
        )}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
