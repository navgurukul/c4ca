import React from "react";
import { Box, Typography, styled } from "@mui/material";

const Input = styled("input")({
  width: "100%",
  height: '48px',
  padding: "8px 16px",
  borderRadius: "100px",
  border: "1px solid #2E2E2E",
  fontFamily: 'Amazon Ember',
  fontSize: '18px',
  color:'#2E2E2E',
  outline: 'none'
});

const InputControl = (props) => {
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      {props.label && <Typography variant="body2">{props.label}</Typography>}
      <Input {...props} />
    </Box>
  );
};

export default InputControl;
