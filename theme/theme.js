const { createTheme } = require("@mui/material");
import { breakpoints } from "./constant";

let theme = createTheme();

theme = createTheme(theme, {
  breakpoints,
  palette: {
    mode: "light",
    default: {
      main: "#FFFFFF",
      light: "#0066FF",
      contrastText: "#ffffff",
    },
    primary: {
      main: "#29458C",
      light: "#D4DAE8",
      dark: "#192954",
      contrastText: '#FFFFFF'
    },

    secondary: {
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
      contrastText: "#2E2E2E",
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
      main: "#219464",
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
    h5: {
      fontFamily: "Amazon Ember Display",
      fontSize: "2rem",
      fontWeight: 800,
      lineHeight: "130%",
      letterSpacing: 0,
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
    h6: {
      fontFamily: "Amazon Ember Display",
      fontSize: "1.5rem",
      fontWeight: 800,
      lineHeight: "150%",
      letterSpacing: 0,
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
    },
    subtitle1: {
      fontFamily: "Amazon Ember",
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: "170%",
      letterSpacing: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    body1: {
      fontFamily: "Amazon Ember",
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: "170%",
      letterSpacing: 0,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    body2: {
      fontFamily: "Amazon Ember",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "170%",
      letterSpacing: 0,
    },
    caption: {
      fontFamily: "Amazon Ember",
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: "150%",
      letterSpacing: 0,
    },
    button: {
      fontFamily: "Noto Sans",
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: "170%",
      letterSpacing: 0,
      textTransform: "unset",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    ButtonLarge: {
      fontFamily: "Amazon Ember",
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: "170%",
      letterSpacing: 1,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
  },
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        minWidth: "max-content",
        height: "48px",
        borderRadius: "100px",
        padding: "8px 16px",
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      },
    },
  },
};

export default theme;
