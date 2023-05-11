import React from "react";

import { Box, Typography, styled } from "@mui/material";

const Dropzone = styled("dropzone")({
  textAlign: "center",
  border: "1px solid black",
  padding: "40px",
  border: "1px dashed #29458C",
  color: "#bdbdbd",
  cursor: "pointer",
  borderRadius: "8px",
});

const DropZone = () => {
  return (
    <Box sx={{ display: "grid" }}>
      <Typography variant="body2">Or, Upload project file</Typography>
      <Dropzone>Upload or Drag File</Dropzone>{" "}
    </Box>
  );
};

export default DropZone;
