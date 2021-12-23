import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ErrorProvider } from "../hooks/useError";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorProvider>
        <SessionProvider session={pageProps.session}>
          <GlobalStyle />
          <Component {...pageProps} />
        </SessionProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default MyApp;
