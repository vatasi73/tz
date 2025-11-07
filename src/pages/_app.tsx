import type { AppProps } from "next/app";
import "../styles/globals.css";
import ReduxProvider from "../store/ReduxProvider";
import { Box } from "@mui/material";
import * as theme from "./_appTheme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Box style={theme.container}>
        <Component {...pageProps} />
      </Box>
    </ReduxProvider>
  );
}
