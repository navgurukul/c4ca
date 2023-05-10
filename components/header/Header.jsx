import { Avatar, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <header>
        <Box className="box">
          <img src="/C4CA_logo.svg" alt="c4ca_logo" />
          <Link href='/dashboard'>
            <Typography
              variant="subtitle1"
              color='primary'
              sx={{ padding: "8px 16px", cursor: "pointer" }}
            >
              Dashboard
            </Typography>
          </Link>
        </Box>

        {router.asPath === "/" ? (
          <Link href="/login">
            <Button sx={{ display: "block", width: 100, m: "auto" }}>
              Login
            </Button>
          </Link>
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
