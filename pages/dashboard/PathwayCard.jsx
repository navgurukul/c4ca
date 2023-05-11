import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { Launch } from "@mui/icons-material";
import { breakpoints } from "@/theme/constant";
import ProgressBar from "@/components/progressBar/ProgressBar";

// Learning Cards
export const LearnCards = ({
  webImage,
  mobileImage,
  title,
  subtitle,
  bgImage_web,
  bgImage_mobile,
  className_web,
  className_mobile,
}) => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <Box sx={{ width: "fit-content", position: "relative" }} className="m-Auto">
      <img
        src={isMobile ? bgImage_mobile : bgImage_web}
        alt="bg_image"
        style={{ width: "100%" }}
      />

      <Box
        className={`contentBox ${isMobile ? className_mobile : className_web}`}
        sx={{ flexDirection: isMobile ? "column" : "row" }}
      >
        <Box className="imgBox p-4">
          <img
            src={isMobile ? mobileImage : webImage}
            alt="image"
            style={{ height: "100%", borderRadius: "14px" }}
          />
        </Box>

        <Box
          sx={{ width:'100%', display: "grid", gap: isMobile ? 4 : 10 }}
          className={isMobile ? "p-16" : "p-32"}
        >
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="h6" align="left" color="primary">
              {title}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {subtitle}
            </Typography>
            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant="body2" color="text.primary">
                Progress: 10%
              </Typography>
              <ProgressBar progress="10%" />
            </Box>
          </Box>

          <Box
            className="btnGrp"
          >
            <Button variant="outlined" sx={{ border: "1px solid" }}>
              <Typography variant="ButtonLarge">View Classes</Typography>
            </Button>
            <Button variant="outlined" sx={{ border: "1px solid" }}>
              <Typography variant="ButtonLarge">Learn Now</Typography>
              <Launch />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Practice Scratch Cards
export const ScratchPracticeCards = ({
  title,
  image,
  btnText,
  bgColor,
  color,
}) => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: bgColor,
        padding: isMobile ? "48px 0" : "64px 0",
      }}
    >
      <Box sx={{ display: "grid", placeItems: "center", gap: 4 }}>
        <Typography variant="h6" sx={{ color: color }}>
          {title}
        </Typography>
        <img src={image} alt="" />
        <Button
          variant="outlined"
          sx={{ borderColor: color, "&:hover": { borderColor: color } }}
        >
          <Typography variant="ButtonLarge" sx={{ color: color }}>
            {btnText}
          </Typography>
          <Launch sx={{ color: color }} />
        </Button>
      </Box>
    </Box>
  );
};

// Project & Award Cards
export const ProjectAwardCards = ({
  title,
  image,
  btnText,
  bgColor,
  color,
  border,
  path,
}) => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 351,
        background: bgColor,
        border: `2px solid ${border}`,
      }}
      className="projectCard"
    >
      <img src={image} alt="image" />

      <Box sx={{ display: "grid", placeItems: "center", gap: 2 }}>
        <Typography variant="subtitle1" sx={{ color: color }}>
          {title}
        </Typography>
        <Button
          variant="outlined"
          sx={{ borderColor: color, "&:hover": { borderColor: color } }}
        >
          <Link href={path}>
            <Typography variant="ButtonLarge" sx={{ color: color }}>
              {btnText}
            </Typography>
          </Link>
        </Button>
      </Box>
    </Box>
  );
};
