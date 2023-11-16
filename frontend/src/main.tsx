import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "theme/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme()}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
