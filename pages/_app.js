import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Header from "@/components/header/Header";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>C4CA Board</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        {router.asPath === '/login' ? null : <Header />}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
