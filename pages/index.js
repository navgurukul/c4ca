import { Button, Typography } from "@mui/material";
import Link from "next/link";


export default function Home() {
  // const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)")
  return (
    <>
    
    
    <center style={{ padding: 50 }}>
      <Typography variant="h4">CODE 4 CLIMATE ACTION</Typography>
      <br />
      <Link href={"/teacher/teams"}>
        {" "}
        <Button
          variant="contained"
          sx={{
            display: "block",
            width: 100,
            m: "auto",
            fontSize: "15px",
          }}
        >
          Go to teacher dashboard
        </Button>
      </Link>
      <br />
      <Link href={"/student"}>
        <Button
          variant="contained"
          sx={{
            display: "block",
            width: 100,
            marginTop: 10,
            m: "auto",
            fontSize: "15px",
          }}
        >
          Go to student dashboard{" "}
        </Button>
      </Link>
    </center>
    </>
  );
}
