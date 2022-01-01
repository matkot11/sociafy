import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ErrorProvider } from "../hooks/useError";
import { SessionProvider } from "next-auth/react";
import AppProviders from "../providers/AppProviders";

function MyApp({ Component, pageProps }) {
  return (
    <AppProviders>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AppProviders>
  );
}

export default MyApp;
