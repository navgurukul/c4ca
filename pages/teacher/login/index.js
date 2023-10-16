import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { GoogleBtn } from "@/styles/style";
import customAxios from "../../../api"; // Import your custom Axios instance
import Link from "next/link";

const LoginPage = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = () => {
    if (typeof gapi !== "undefined") {
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
          });
      });
    }
  };

  const sendGoogleUserData = (token) => {
    customAxios
      .post("/users/auth/google", { idToken: token, mode: "web" }, {
        headers: { Authorization: token },
      })
      .then((res) => {
        localStorage.setItem("AUTH", JSON.stringify(res.data));
        customAxios
          .get("/users/me", {
            headers: {
              accept: "application/json",
              Authorization: res.data.token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // Only redirect if the request is successful
              window.location.href = "/teacher/profile";
            }
          })
          .catch((err) => {
            console.log("error in google data", err);
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
            <GoogleBtn onClick={handleLoginSuccess}>
              <img src="/Google.svg" />
              <Typography variant="ButtonLarge" color="text.primary">
                Login with Google
              </Typography>
            </GoogleBtn>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default LoginPage;
