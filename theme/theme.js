const { createTheme } = require("@mui/material");
import { breakpoints } from "./constants";

let theme = createTheme();

theme = createTheme(theme, {
  breakpoints,
  palette: {
    mode: "light",
    default: {
      main: "#FFFFFF",
      light: "#0066FF",
      // main: "#fff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffffff",
    },
    primary: {
      //Midnight Blue
      main: "#29458C",
      light: "#D4DAE8",
      dark: "#192954",
    },

    secondary: {
      // Incandescent
      main: "#F55C38",
      light: "#FDDED7",
      dark: "#933722",
      contrastText: "#ffffff",
    },

    pink: {
      main: "#F091B2",
      light: "#FCE9F0",
      dark: "#90576B",
      contrastText: "#ffffff",
    },

    typhoon: {
      main: "#049796",
      light: "#CDEAEA",
      dark: "#025B5A",
      contrastText: "#ffffff",
    },

    orange: {
      main: "#FFAD33",
      light: "#FFEFD6",
      dark: "#99681F",
      contrastText: "#ffffff",
    },

    twilight: {
      main: "#FFF2F2",
      light: "#FFF7F7",
      dark: "#999191",
      contrastText: "#ffffff",
    },

    error: {
      main: "#F44336",
      light: "#FFE5E3",
      dark: "#C3362B",
      contrastText: "#ffffff",
    },

    success: {
      main: "#48A145",
      light: "#E9F5E9",
      dark: "#3A8137",
      contrastText: "#ffffff",
    },

    Grey: {
      main: "#949494",
      light: "#DEDEDE",
      // dark: "#3A8137",
      contrastText: "#ffffff",
    },

    text: {
      primary: "#2E2E2E",
      secondary: "#6D6D6D",
      disabled: "#BDBDBD",
      hint: "#BDBDBD",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    black: {
      main: "#2E2E2E",
      contrastText: "#FFFFFF",
    },
    divider: "#949494",
  },

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
          backgroundColor: " #29458C",
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
