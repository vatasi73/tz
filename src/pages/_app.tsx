import type { AppProps } from "next/app";
import "../styles/globals.css";
import ReduxProvider from "../store/ReduxProvider";
import { Box } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Box
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: 20,
        }}
      >
        <Component {...pageProps} />
      </Box>
    </ReduxProvider>
  );
}
