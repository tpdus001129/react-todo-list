import React, { useEffect } from "react";
import { CssBaseline, createTheme, ThemeProvider, Theme, Palette } from "@mui/material";
import { RecoilRoot } from "recoil";
import { HashRouter } from "react-router-dom";

import App from "./App";

const muiThemePaletteKeys: string[] = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
];

export default function Root() {
  const theme: Theme = createTheme({
    typography: {
      fontFamily: "GmarketSansMedium",
    },
    palette: {
      primary: {
        main: "#81DAF5",
        contrastText: "#ffffff",
      },
    },
  });

  useEffect(() => {
    const r: HTMLElement | null = document.querySelector(":root");

    if (r) {
      muiThemePaletteKeys.forEach((paletteKey) => {
        const themeColorVal = theme.palette[paletteKey as keyof Palette];
        if (typeof themeColorVal === "string" || typeof themeColorVal === "number") {
          r.style.setProperty(`--mui-color-${paletteKey}`, String(themeColorVal));
        }
      });
    }
  }, [theme.palette]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <HashRouter>
          <App />
        </HashRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
}
