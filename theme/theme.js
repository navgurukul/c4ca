const { createTheme } = require("@mui/material");
import { breakpoints } from "./constants";

let theme = createTheme();

theme = createTheme(theme, {
  breakpoints,
  typography: {
    fontFamily: ["Amazon Ember", "Amazon Ember Display"].join(","),
    fontSize: 18,
    h6: {
      fontFamily: "Amazon Ember Display",
      fontSize: "24px",
      fontWeight: 800,
      lineHeight: "28px",
      letterSpacing: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    subtitle1: {
      fontFamily: "Amazon Ember",
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "170%",
      letterSpacing: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    body1: {
      fontFamily: "Amazon Ember",
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "170%",
      letterSpacing: -0.3,
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    body2: {
      fontFamily: "Amazon Ember",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "170%",
      letterSpacing: 0,
    },
    button: {
      fontFamily: "Amazon Ember",
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "170%",
      textTransform: "unset",
    },
  },
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        height: "48px",
        "&:hover": {
          backgroundColor: "#29458c",
          color: "#ffffff",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: { boxShadow: "none" },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: { height: "70px", boxShadow: "none", position: "static" },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: { padding: "8px 16px", border: "1px solid #2E2E2E" },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        "&.MuiContainer-maxWidthSm": { padding: "0 15px" },
      },
    },
  },
};

export default theme;
