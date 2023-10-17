import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { GoogleBtn } from "@/styles/style";
import axios from "axios";
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const LoginPage = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = () => {
    if (typeof gapi !== "undefined") {
      setLoading(true);
      gapi.load("auth2", () => {
        gapi.auth2
          .init({
            client_id: CLIENT_ID,
          })
          .then((authInstance) => {
            return authInstance.signIn();
          })
          .then((googleUser) => {
            const idToken = googleUser.getAuthResponse().id_token;
            sendGoogleUserData(idToken);
          })
          .catch((error) => {
            console.log("Login failed", error);
            setLoading(false)
          });
      });
    }
  };

  const sendGoogleUserData = (token) => {
    return axios({
      url: `${BASE_URL}/users/auth/google`,
      method: "post",
      headers: { accept: "application/json", Authorization: token },
      data: { idToken: token, mode: "web" },
    })
      .then((res) => {
        console.log(res.data, 'logindata....');
        res.data.role = "teacher"
        localStorage.setItem("AUTH", JSON.stringify(res.data));
        setCookie("user", JSON.stringify(res.data), {
          path: "/",
          maxAge: 604800, // Expires after 1hr
          sameSite: true,
        });
        axios({
          method: "get",
          url: `${BASE_URL}/users/me`,
          headers: {
            accept: "application/json",
            Authorization: res.data.token,
          },
        }).then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            // Only redirect if the request is successful
            router.push("/teacher/profile");
            setLoading(false)
          }
        });
      })
      .catch((err) => {
        console.log("error in google data", err);
      });
  };

  const loadGoogleSignInAPI = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id: CLIENT_ID,
        });
      });
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadGoogleSignInAPI();

    return () => {
      const script = document.querySelector(
        "script[src='https://apis.google.com/js/platform.js']"
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <main>
      <Container
        maxWidth="lg"
        sx={{ display: "grid", placeItems: "center", gap: 6 }}
      >
        <img src="/logo.svg" alt="logo" />

        <Box sx={{ display: "grid", gap: 4 }}>
          <img
            src="/app-development.svg"
            alt="app-development"
            style={{ width: "100%" }}
          />

          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="body1" align="center" color="text.primary">
              Continue to C4CA
            </Typography>
            <GoogleBtn disabled={loading} onClick={handleLoginSuccess}>
              <img src="/Google.svg" />
              <Typography variant="ButtonLarge" color="text.primary">
                {loading ? "Logging in..." : "Login with Google"}
              </Typography>
            </GoogleBtn>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default LoginPage;
