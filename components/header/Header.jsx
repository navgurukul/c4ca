import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <header>
        <Link href={"/"}>
          <img src="/c4ca.svg" alt="c4ca_logo" />
        </Link>

        {router.asPath === "/" ? (
          <Stack spacing={2} direction="row">
            {" "}
            <Link href="/teacher/login">
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  display: "block",
                  width: 100,
                  m: "auto",
                  fontSize: "15px",
                }}
              >
                Teacher and Partners
              </Button>{" "}
            </Link>
            <Link href="/student/login">
              <Button
                variant="contained"
                sx={{
                  display: "block",
                  width: 100,
                  m: "auto",
                  fontSize: "15px",
                }}
              >
                Student Login
              </Button>
            </Link>
          </Stack>
        ) : (
          <Box>
            <Avatar src="/avatar.svg" />
          </Box>
        )}
      </header>
    </>
  );
};

export default Header;
