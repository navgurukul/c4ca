import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  // const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)")
  return (
    <center style={{ padding: 50 }}>
      <Typography variant="h4">CODE 4 CLIMATE ACTION</Typography>
      <br />
      <Typography color="red" variant="subtitle1">Opps! Site under maintanance</Typography>
      <Typography color="gray" variant="caption">We apologize for any inconveniences caused we've almost done. </Typography>
    </center>
  );
}
