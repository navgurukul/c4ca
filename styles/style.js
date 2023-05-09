const { styled } = require("@mui/material");

export const GoogleBtn = styled("Button")({
  width: "240px",
  height: "48px",
  margin: "auto",
  padding: "10px 16px",
  background: "#FFFFFF",
  boxShadow: `0 4px 5px rgba(46, 46, 46, 0.06), 
    0 1px 10px rgba(46, 46, 46, 0.04), 
    0 2px 4px rgba(46, 46, 46, 0.08)`,
  borderRadius: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  border: "none",
  cursor: "pointer",
});


export const TextField = styled("input")({
  width: "100%",
  height: "48px",
  padding: "8px 16px",
  border: "1px solid #2E2E2E",
  borderRadius: "100px",
  fontFamily: "Amazon Ember",
  fontSize: "18px",
  color: "#2E2E2E",
  cursor: "text",
  outline: "none",
});