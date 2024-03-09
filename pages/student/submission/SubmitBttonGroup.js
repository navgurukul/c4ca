import React from "react";
import { Button, Typography, Grid, useMediaQuery } from "@mui/material";
import { breakpoints } from "@/theme/constant";


const SubmitButtonGroup = ({ onSave, onSaveText, onSubmit, onSubmitText, isSubmitDisabled }) => {
    const isMobile = useMediaQuery(`(max-width: ${breakpoints.values.sm}px)`);
    return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6}>
        <Button variant="outlined" sx={{ width: isMobile && "100%", }} onClick={onSave}  disabled={isSubmitDisabled}>
          <Typography variant="ButtonLarge" pl="35px" pr="35px" pt="8px" pb="8px">
            {onSaveText}
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Button
          style={{
            backgroundImage: !isSubmitDisabled
              ? "linear-gradient(to right, rgba(135 162 231 / 72%)  , #192954)"
              : "",
          }}
          className={!isSubmitDisabled && "profileBtn"}
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          sx={{
            pl: isSubmitDisabled && "35px",
            pr: isSubmitDisabled && "35px",
            pt: isSubmitDisabled && "8px",
            pb: isSubmitDisabled && "8px",
            width: isMobile ? "100%" : "250px",
          }}
        >
          <Typography variant="ButtonLarge">{onSubmitText}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default SubmitButtonGroup;
