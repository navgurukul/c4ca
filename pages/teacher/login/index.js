import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Typography,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import { GoogleBtn } from "@/styles/style";
import axios from "axios";
import { useCookies } from "react-cookie";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import customAxios from "../../../api"; // Import your custom Axios instance

const LoginPage = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const partner_id = searchParams.get("partner_id");

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
            setLoading(false);
          });
      });
    }
  };

  const sendGoogleUserData = (token) => {
    customAxios
      .post(
        "/users/auth/google",
        { idToken: token, mode: "web" },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        customAxios
          .get("/c4ca/teacher_Data", {
            headers: {
              accept: "application/json",
              Authorization: res.data.token,
            },
          })
          .then((resp) => {
            // console.log("res from google data", resp.data.data);
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
    <Container
      maxWidth="sm"
      sx={{ display: "grid", alignItems: "center", gap: 10, marginTop: "13%" }}
    >
      <Card sx={{ display: "grid", gap: 1 }}>
        <Stack alignItems={"center"}>
          {" "}
          <img src="/logo.svg" alt="logo" />
        </Stack>

        <CardContent>
          <Typography gutterBottom variant="h6" align="center" component="div">
            Embark On Your Learning Journey
          </Typography>
          <Typography
            sx={{ mt: 3 }}
            variant="body2"
            align="center"
            color="text.secondary"
          >
            Continue to C4CA
          </Typography>
          <GoogleBtn
            sx={{ mt: 1 }}
            disabled={loading}
            onClick={handleLoginSuccess}
          >
            <img src="/Google.svg" />
            <Typography variant="ButtonLarge" color="text.primary">
              {loading ? "Logging in..." : "Login with Google"}
            </Typography>
          </GoogleBtn>
          <Typography
            variant="body1"
            style={{ textAlign: "center", marginTop: 10 }}
            color="red"
          >
            {error && error}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
