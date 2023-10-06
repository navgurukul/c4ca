import { Avatar, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <header>
        <Box className="box">
          <img src="/c4ca.svg" alt="c4ca_logo" />
        </Box>

        {router.asPath === "/" ? (
          <Link href="/teacher/login">
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
