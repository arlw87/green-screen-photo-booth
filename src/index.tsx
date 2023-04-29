import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import "./fonts/BickleyScript.woff";
import "./fonts/Classic-Roman-Std-Regular.woff";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#6b7a40",
      light: "#788651",
      dark: "#93a366",
    },
    secondary: {
      main: "#f56722",
      light: "#fb762a",
    },
    background: {
      default: "#f3ede0",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "classic-roman",
    h3: {
      fontSize: "4rem",
      lineHeight: "3rem",
    },
  },
});

theme.typography.h1 = {
  fontSize: "6.5rem",
  fontFamily: "bickley-script",
  lineHeight: "6rem",
  fontWeight: "600",
  [theme.breakpoints.up("sm")]: {
    fontSize: "11rem",
    lineHeight: "9rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "11rem",
    lineHeight: "10rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "13rem",
    lineHeight: "13rem",
  },
};

theme.typography.h2 = {
  fontSize: "4rem",
  fontFamily: "bickley-script",
  lineHeight: "5rem",
  fontWeight: "600",
  [theme.breakpoints.up("sm")]: {
    fontSize: "6rem",
    lineHeight: "6rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "7rem",
    lineHeight: "7rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "10rem",
    lineHeight: "13rem",
  },
};

theme.typography.h3 = {
  fontSize: "4rem",
  lineHeight: "3rem",
  fontFamily: "classic-roman",
  fontWeight: "500",

  [theme.breakpoints.up("sm")]: {
    fontSize: "5rem",
    lineHeight: "5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "5.5rem",
    lineHeight: "5.5rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "6rem",
    lineHeight: "6rem",
  },
};

theme.typography.h4 = {
  fontSize: "3rem",
  lineHeight: "2rem",
  fontFamily: "bickley-script",
  fontWeight: "300",

  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
    lineHeight: "3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.5rem",
    lineHeight: "3rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "5rem",
    lineHeight: "5rem",
  },
};

theme.typography.h5 = {
  fontSize: "2rem",
  lineHeight: "2rem",
  fontFamily: "classic-roman",
  fontWeight: "300",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
    lineHeight: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
    lineHeight: "2rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2rem",
    lineHeight: "2rem",
  },
};

theme.typography.h6 = {
  fontSize: "1.5rem",
  lineHeight: "1.5rem",
  fontFamily: "classic-roman",
  fontWeight: "300",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.5rem",
    lineHeight: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
    lineHeight: "1.5rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2rem",
    lineHeight: "2rem",
  },
};

theme.typography.subtitle1 = {
  fontSize: "2rem",
  lineHeight: "2rem",
  fontFamily: "classic-roman",
  fontWeight: "600",

  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
    lineHeight: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
    lineHeight: "2.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3rem",
    lineHeight: "3rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "4rem",
    lineHeight: "4rem",
  },
};

theme.typography.body1 = {
  fontSize: "1.2rem",
  lineHeight: "1.2rem",
  fontFamily: "classic-roman",
  fontWeight: "300",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
    lineHeight: "1.5rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2rem",
    lineHeight: "2rem",
  },
};

theme.typography.body2 = {
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  fontFamily: "classic-roman",
  fontWeight: "300",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </ThemeProvider>
);
