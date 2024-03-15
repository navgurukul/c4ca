import Head from "next/head";
import * as React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Header from "@/components/header/Header";
import "../styles/app.css";
import MuiAlert from "@mui/material/Alert";
import {
  LoggedOutState,
} from "../components/context/LoggedOutContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Coding for Climate Action</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/CCA_Logo.svg" />
      </Head>

      <ThemeProvider theme={theme}>
        <LoggedOutState>
          {router.pathname.split("/").reverse()[0] === "login" ? null : (
            <Header />
          )}
          <>
            <Component {...pageProps} />
          </>
        </LoggedOutState>
      </ThemeProvider>
    </>
  );
}

function withLoggedOutState(Component) {
  return function WrappedComponent(props) {
    return (
      <LoggedOutState>
        <Component {...props} />
      </LoggedOutState>
    );
  };
}

export default withLoggedOutState(App);
