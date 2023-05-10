import { Box, Container, Typography } from "@mui/material";
import { GoogleBtn } from "@/styles/style";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
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
            <Link href="/profile">
              <GoogleBtn>
                <img src="/Google.svg" />
                <Typography variant="ButtonLarge" color="text.primary">
                  Login with Google
                </Typography>
              </GoogleBtn>
            </Link>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default LoginPage;
