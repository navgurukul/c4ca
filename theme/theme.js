const { createTheme } = require("@mui/material");
import { breakpoints } from "./constants";

let theme = createTheme()

theme = createTheme(theme, {
  breakpoints,
  typography: {
    fontFamily: "Amazon Ember",
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
      letterSpacing: -0.5,
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
})

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        minWidth: 240,
        height: "48px",
        padding: "8px 16px",
        "&:hover": {
          backgroundColor: "#29458c",
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
      select: {padding: '8px 16px', border: '1px solid #2E2E2E'}
    }
  },
};

export default theme
