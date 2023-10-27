import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  TextField,
  Card,
  InputLabel,
  Icon,
} from "@mui/material";
import { useCookies } from "react-cookie";
import customAxios from "@/api";

const LoginForm = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [cookie, setCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    login_id: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login_id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (formData.login_id.trim() === "") {
      setErrors({
        ...errors,
        login_id: "User ID is required",
      });
      isValid = false;
    }

    if (formData.password.trim() === "") {
      setErrors({
        ...errors,
        password: "Password is required",
      });
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      customAxios
        .post("/c4ca/team/login", formData)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            if (res.data.data === null) {
              return setErrors({
                ...errors,
                password: res.data.status,
              });
            }
            console.log(res);
            // Only redirect if the request is successful
            setLoading(false);
            res.data.role = "student";
            localStorage.setItem("AUTH", JSON.stringify(res.data));
            setCookie("user", JSON.stringify(res.data), {
              path: "/",
              maxAge: 604800, // Expires after 7 days
              sameSite: true,
            });
            if (res.data.data.last_login == null) {
              router.push("/student/profile?first_login=true");
            } else {
              router.push("/student/dashboard");
            }
          }
        })
        .catch((err) => {
          console.log("error in google data", err);
          setLoading(false);
        });
    }
  };

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        display: "grid",
        placeItems: "center",
        gap: "20px",
        marginTop: "7%",
      }}
    >
      <Card
        sx={{
          width: isMobile ? "100%" : "50%",
          minHeight: "100%",
          backgroundColor: "#FFFFFF",
          padding: isMobile ? "20px" : "40px",
        }}
      >
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <form onSubmit={handleSubmit}>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <img src="/c4ca.svg" alt="c4ca_logo" />
            </Grid>

            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel htmlFor="name" variant="Body2">
                User ID
              </InputLabel>
              <TextField
                fullWidth
                id="name"
                name="login_id"
                placeholder="User ID"
                variant="outlined"
                margin="normal"
                InputProps={{
                  style: {
                    height: "50px",
                    borderRadius: "50px",
                  },
                }}
                value={formData.login_id}
                onChange={handleChange}
              />
              {errors.login_id && (
                <Typography color="error">{errors.login_id}</Typography>
              )}
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel htmlFor="password" variant="Body2">
                Password
              </InputLabel>
              <TextField
                fullWidth
                id="email"
                name="password"
                placeholder="Password"
                variant="outlined"
                margin="normal"
                InputProps={{
                  style: {
                    height: "50px",
                    borderRadius: "50px",
                  },
                }}
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <Typography color="error">{errors.password}</Typography>
              )}
            </Box>
            <Grid container justifyContent="center" sx={{ mb: 3 }}>
              <Button
                disabled={loading}
                onClick={handleSubmit}
                type="submit"
                className="profileBtn"
              >
                Login
              </Button>
            </Grid>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Typography variant="subtitle1">
                Forgot password / Don’t have login details?
              </Typography>
              <Typography variant="body1">
                Please ask your teacher to provide you the team login
              </Typography>
              <Typography variant="body1">user id and password</Typography>
            </Grid>
          </form>
        </Container>
      </Card>
    </Container>
  );
};

export default LoginForm;
