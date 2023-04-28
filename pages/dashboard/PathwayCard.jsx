import React from "react";
import styles from "./style.module.css";
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { breakpoints } from "@/theme/constants";
import ProgressBar from "@/components/progressBar/ProgressBar";
import { ArrowRightAlt } from "@mui/icons-material";

const CardContent = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const PathwayCard = ({
  image,
  title,
  subtitle,
  bgcolor,
  bgcolor1,
  progressBarColor,
  progressBar,
  projectPath,
}) => {
  const isMobileActive = useMediaQuery(
    "(max-width:" + breakpoints.values.sm + ")"
  );
  return (
    <Card
      className={styles.Card}
      sx={{
        padding: isMobileActive ? 2 : 3,
        background: bgcolor,
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          image={image}
          sx={{ width: 64, height: 64 }}
        />
        {projectPath ? (
          <Box>
            <Typography variant="body1">{title}</Typography>
            <Typography
              variant="body2"
              sx={{ color: isMobileActive ? "#6d6d6d" : "#999191" }}
            >
              {subtitle}
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="body2">{subtitle}</Typography>
            <Typography variant="body1">{title}</Typography>
          </Box>
        )}
      </CardContent>

      {progressBar ? (
        <ProgressBar
          height={4}
          progress={54}
          bgcolor1={bgcolor1}
          progressBarColor={progressBarColor}
        />
      ) : (
        <div style={{ height: 4 }}></div>
      )}

      <IconButton className={styles.Icon}>
        <ArrowRightAlt sx={{ color: bgcolor1 }} />
      </IconButton>
    </Card>
  );
};

export default PathwayCard;
