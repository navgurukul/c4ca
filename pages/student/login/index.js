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
} from "@mui/material";

const LoginForm = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userId: "",
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

    if (formData.userId.trim() === "") {
      setErrors({
        ...errors,
        userId: "User ID is required",
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
      // You can perform login logic here
      // For example, send the data to your authentication API
      // Redirect to the dashboard on successful login
      router.push("/dashboard"); // Replace '/dashboard' with the actual dashboard route
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
        marginTop: "5%",
      }}>
      <Card
        sx={{
          width: isMobile ? "100%" : "50%",
          minHeight: "100%",
          padding: isMobile ? "20px" : "40px",
        }}>
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
                name="userId"
                placeholder="User ID"
                variant="outlined"
                margin="normal"
                InputProps={{
                  style: {
                    height: "50px",
                    borderRadius: "50px",
                  },
                }}
                value={formData.userId}
                onChange={handleChange}
              />
              {errors.userId && (
                <Typography color="error">{errors.userId}</Typography>
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
              <Link href={"/student/team-profile"}>
                <Button type="submit" className="profileBtn">
                  Login
                </Button>
              </Link>
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
