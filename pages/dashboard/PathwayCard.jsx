import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Launch } from "@mui/icons-material";
import { breakpoints } from "@/theme/constant";
import ProgressBar from "@/components/progressBar/ProgressBar";
import Link from "next/link";

// Learning Cards
export const LearnCards = ({
  image,
  title,
  subtitle,
  progress,
  btnText1,
  btnText2,
  color,
  textColor,
  bgImage_web,
  bgImage_mobile,
}) => {
  const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <>
      {/* <Box>
        <img src={image} alt="image" style={{width:'100%'}}/>

        <Box sx={{display: "grid", gap: isMobile ? 3 : 10}}>
          <Box sx={{display:'grid', gap:2}}>
            <Typography variant="h6" sx={{ textAlign: "start" }}>{title}</Typography>
            <Typography variant="body1" sx={{ color: textColor }}>{subtitle}</Typography>
            <Box>
              <Typography variant="body2" sx={{ color: textColor }}>
                 Progress: {progress}
              </Typography>
            <ProgressBar progress={progress}/>
            </Box>
          </Box>

          <Box sx={{display:'flex', gap:2}}>
            <Button className="button" sx={{ border: `1px solid ${color}` }}>
              <Typography variant="ButtonLarge" sx={{color:color}}>{btnText1}</Typography>
            </Button>
            <Button className="button" sx={{ border: `1px solid ${color}` }}>
              <Typography variant="ButtonLarge" sx={{color:color}}>{btnText2}</Typography>
              <Launch sx={{color:color}}/>
            </Button>
          </Box>
        </Box>
      </Box> */}
    </>
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
        <Button className="button" sx={{ border: `1px solid ${color}` }}>
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
        <Typography variant="ButtonLarge" sx={{ color: color }}>
          {title}
        </Typography>
        <Button sx={{ border: `1px solid ${color}` }}>
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
